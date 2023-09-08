/* eslint-disable */

import { xml2js, Element } from "xml-js";
import convert from "./XMLConvert";
import JSZip from "jszip";
import FileSaver from "file-saver";

type Defs = { [dir: string]: { [file: string]: Element } };
let Defs: Defs = {};
let total = 0,
  finished = 0,
  errors = 0;

interface NewFileSystemEntry extends FileSystemEntry {
  createReader: () => {
    readEntries: (a: (entries: NewFileSystemEntry[]) => void) => void;
  };
  file: (a: (fileObject: File) => void) => void;
}

export default function readDir(dirs: DataTransferItemList) {
  // const result: { [modName: string]: any } = {};

  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i]!.webkitGetAsEntry();
    if (!dir) continue;
    if (!dir.isDirectory) return alert("File must be a directory");
    if (dir.name !== "Defs") return alert('Send "Defs" folder');
    processDirectory(dir as NewFileSystemEntry);
  }
}

function processFD(file: NewFileSystemEntry, parent: null = null) {
  if (file.isFile) processFile(file);
  else if (file.isDirectory) processDirectory(file);
}

function processDirectory(directory: NewFileSystemEntry) {
  const reader = directory.createReader();
  reader.readEntries((entries) => {
    for (const entry of entries) processFD(entry);
  });
}

function processFile(file: NewFileSystemEntry) {
  total++;
  file.file((fileObject: File) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const fileText = event.target?.result as string | undefined; // Отриманий текст з файлу
        if (!fileText) throw Error("Target or result is null");
        let TagDefs = (xml2js(fileText, {
          compact: false,
          ignoreComment: true
        }) as Element).elements?.[0];
        if (!TagDefs || TagDefs.name !== "Defs")
          throw Error(`File ${file.fullPath} does not contain "Defs"`);

        for (let elem of TagDefs.elements ?? []) {
          if (!elem.name) throw Error(`The problems in ${file.fullPath}`);

          // console.log(`<${elem.name}>${js2xml(elem, { compact: false })}</${elem.name}>`);

          function saveTo(def: string, fileName: string) {
            if (!Defs[def]) Defs[def] = {};
            if (!Defs[def]![fileName]) {
              Defs[def]![fileName] = {
                type: "element",
                name: "Defs",
                elements: []
              };
            }
            Defs[def]![fileName]!.elements!.push(elem);
          }
          saveTo(elem.name, file.name);
        }
      } catch (error) {
        console.error(error);
        errors++;
      } finally {
        if (++finished === total) end();
      }
    };
    reader.readAsText(fileObject);
  });
}

function end() {
  try {
    const zip = new JSZip();
    const DefInjected = zip.folder("DefInjected")!;

    for (let Dir in Defs) {
      let DirName = `${Dir}s`;
      let dir = DefInjected.folder(DirName)!;
      for (let File in Defs[Dir]) {
        let res = convert(Defs[Dir]![File]!, { nullIfEmpty: true });

        if (res === null) dir.remove(File);
        else if (typeof res !== "string") throw Error("Something wrong");
        else dir.file(File, res);
      }

      if (
        Object.keys(dir.files).filter((p) =>
          p.startsWith(`DefInjected/${DirName}/`)
        ).length <= 1
      )
        DefInjected.remove(DirName);
      //   let res = convert(Defs[Def]);
      //   if (typeof res !== "string") throw Error("Something wrong");
      //   DefInjected.folder(`${Def}s`)!.file(`${Def}.xml`, res);
    }

    zip.generateAsync({ type: "blob" }).then(function (content) {
      FileSaver.saveAs(content, "download.zip");
    });
  } catch (e) {
    console.error(e);
  }

  {
    // Clear
    total = finished = errors = 0;
    Defs = {};
  }
}

// function getLastVersion(entries: any[]) {

// }
