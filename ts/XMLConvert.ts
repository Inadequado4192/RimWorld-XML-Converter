/* eslint-disable */
import { xml2js, js2xml, Element } from "xml-js";
import { RULES, IRule, CompsRules, ICompsRules } from "./rules";

type Param = {
  /** Default: `false` */
  nullIfEmpty: boolean;
};

console.clear();

export default function convert<T extends string | Element>(
  arg1: T,
  param?: Param
) {
  let source: Element | undefined;
  if (typeof arg1 === "string")
    try {
      source = (xml2js(arg1, { sanitize: !!0 }) as Element).elements?.[0];
    } catch {
      return arg1;
    }
  else source = arg1;

  if (!source || source.name === "LanguageData") return arg1;

  const defs = source.elements?.some((e) => e.name === "defName")
    ? [source]
    : source.elements;
  if (!defs) return null;

  const res = new ResultManager();

  forEach(defs, res);

  // console.log("scenario.parts.[i].(label|desc|data.[i].(l|d))".split(/(?<!\((?:.+?))\./));
  // console.log("label|desc|data.[i].(l|d)".split(/(?<!\((?:.+?))\|/));

  if ((param?.nullIfEmpty ?? false) && !res.list.length) return null;
  return js2xml(
    {
      declaration: { attributes: { version: "1.0", encoding: "utf-8" } },
      elements: [
        {
          type: "element",
          name: "LanguageData",
          elements: res.list
        }
      ]
    },
    { spaces: 4 }
  )
    .replace(/&lt;/g, "<")
    .replace(/-&gt;/g, "->")
    .replace(/^\s{4}<!---->/gm, "");
  // .replace(/\n/g, "\\n")
}

class ResultManager {
  public list: Element[] = [];
  public add(name: string, e: Element | Element[] | string = "") {
    function replaceN(elems: Element[]) {
      for (let e of elems) {
        if (e.type == "text" && typeof e.text === "string")
          e.text = e.text.replace(/\n/g, "\\n");
        if (e.type == "element" && e.elements)
          e.elements = replaceN(e.elements);
      }
      return elems;
    }

    let elements = replaceN(
      Array.isArray(e)
        ? e
        : typeof e === "string"
        ? [{ type: "text", text: e }]
        : e.elements ?? []
    );

    let text = elements?.[0]?.text;
    let comment =
      (text !== undefined && text + " ") ??
      elements.reduce(
        (a, e) => `${a}\n\t\t<li>${js2xml(elements[elements.indexOf(e)])}</li>`,
        ""
      ) + "\n\t";

    if (comment) this.addComment(`EN: ${comment}`);
    this.list.push({ type: "element", name, elements });
  }
  public addComment(comment = "") {
    this.list.push({ type: "comment", comment });
  }
}

function forEach(defs: Element[], manager: ResultManager) {
  for (let def of defs) {
    const defName = def.elements?.find((e: Element) => e.name == "defName")
      ?.elements?.[0].text as string | undefined;
    if (!defName || !def.elements) continue;
    !findInRule(RULES, def, defName) && manager.addComment();
  }

  function findInRule(rule: IRule, elem: Element, path: string) {
    let isEmpty = true;
    for (let child of elem.elements ?? []) {
      let step = child.name!;
      if (step == "comps") Comps(child, path);

      let res = rule[step];
      if (res === undefined) continue;
      isEmpty = false;

      if (res === null) manager.add(`${path}.${step}`, child);
      else {
        if ("[i]" in res) {
          if (!child.elements) continue;
          function getLabel(elem: Element) {
            let names = ["label", "customLabel", "def"];
            return (
              //.slice().sort((a, b) => names.indexOf(a.name!) - names.indexOf(b.name!))
              elem.elements
                ?.find((o) => names.includes(o.name!))
                ?.elements![0].text!.toString()
                .replace(/\s/g, "_")
                .replace(/\W/g, "")
            );
          }
          let repeated = child.elements
            .map((e) => getLabel(e))
            .some((val, i, arr) => arr.indexOf(val, i + 1) > -1);
          for (let i = 0; i < child.elements.length; i++) {
            let c = child.elements[i]!;
            if (!res["[i]"]) {
              manager.add(`${path}.${step}.${i}`, c);
            } else {
              findInRule(
                res["[i]"],
                c,
                `${path}.${step}.${repeated ? i : getLabel(c)}`
              );
            }
          }
        } else findInRule(res, child, `${path}.${step}`);
      }
    }
    return isEmpty;
  }

  function Comps(elem: Element, path: string) {
    for (let child of elem.elements ?? []) {
      let _class = child.attributes?.Class;
      if (typeof _class !== "string" || !CompsRules[_class]) continue;

      let c = CompsRules[_class];
      if (c.label === undefined) continue;

      let label = String(
        c.label ??
          child.elements?.find((e) => e.name === "compClass")?.elements?.[0]
            .text
      );
      if (label === "undefined") console.warn(`Problem with -> ${path}`);

      function getFields(
        res: ICompsRules[string]
      ): { [k: string]: string | null } {
        if ("fields" in res) return res.fields;
        else return getFields(CompsRules[res.extendFields]);
      }
      let fields = getFields(c);
      for (let field in fields) {
        let fData = fields[field];
        if (fData !== null) {
          manager.add(`${path}.${label}.${field}`, fData);
        } else {
          findInRule({ [field]: null }, child, `${path}.${label}`);
        }
      }
    }
  }

  manager.list.splice(manager.list.length - 1, 1); // Remove Last Comment
}
