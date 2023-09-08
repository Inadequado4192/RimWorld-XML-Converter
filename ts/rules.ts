/* eslint-disable */

namespace Recursion {
  export const Parts: IRule = {
    "[i]": {
      customLabel: null
    }
  };
  Parts["[i]"]!.parts = Parts;
}

// const templates = {
//   label: null,
//   description: null
// };

// function create(keys: (keyof typeof templates)[], rul: IRule = {}) {
//   for (let key of keys) rul[key] = templates[key];
//   return rul;
// }

// const _: { [def: string]: IRule } = {
//   AbilityDef: create(["label", "description"], {
//     verbProperties: { label: null },
//     confirmationDialogText: null
//   }),
//   ApparelLayerDef: create(["label"]),
//   BackstoryDef: create([], {
//     title: null,
//     titleShort: null,
//     baseDesc: null
//   })
// };

export const RULES: IRule = (<R extends IRule>(r: R) => r)({
  // General
  label: null,
  description: null,

  // AbilityDef (label & desc)
  verbProperties: { label: null },
  confirmationDialogText: null,

  // ApparelLayerDef (label)

  // BackstoryDef
  title: null,
  titleShort: null,
  baseDesc: null,

  // HediffDef | ThoughtDef
  stages: {
    "[i]": {
      label: null,
      description: null
    }
  },

  // ThoughtDef

  // HediffDef
  labelNoun: null,
  comps: {
    "[i]": {
      labelTendedWell: null,
      labelTendedWellInner: null
    }
  },
  injuryProps: {
    "[i]": {
      destroyedLabel: null,
      destroyedOutLabel: null
    }
  },

  // ThingDef
  tools: {
    "[i]": {
      label: null,
      useLabel: null
    }
  },
  ingestible: {
    ingestCommandString: null,
    ingestReportString: null
  },
  verbs: {
    "[i]": {
      label: null
    }
  },

  // AlienRace
  alienRace: {
    generalSettings: {
      alienPartGenerator: {
        bodyAddons: {
          "[i]": { bodyPartLabel: null }
        }
      }
    }
  },

  // TraitDef
  degreeDatas: {
    "[i]": {
      label: null,
      description: null
    }
  },

  // JobDef
  reportString: null,

  // RecipeDef
  jobString: null,
  successfullyRemovedHediffMessage: null,

  // RulePackDef
  rulePack: {
    rulesStrings: null
  },

  // WorkTypeDef | WorkGiverDef
  verb: null,

  // WorkGiverDef
  gerund: null,

  // MemeDef
  generalRules: {
    rulesStrings: null
  },
  descriptionMaker: {
    rules: {
      rulesStrings: null
    }
  },
  symbolPacks: {
    "[i]": {
      adjective: null,
      ideoName: null,
      member: null,
      theme: null
    }
  },

  // FactionDef
  leaderTitle: null,
  pawnSingular: null,
  pawnsPlural: null,

  // DamageDef
  deathMessage: null,

  // Scenario
  scenario: {
    name: null,
    summary: null,
    parts: {
      "[i]": {
        customSummary: null,
        text: null
      }
    }
  },

  // Vehicles
  properties: {
    riles: {
      "[i]": {
        label: null
      }
    }
  },
  components: {
    "[i]": {
      label: null
    }
  },

  // BodyDef
  corePart: {
    parts: Recursion.Parts
  },

  // WorkTypeDef
  labelShort: null,
  pawnLabel: null,
  gerundLabel: null,

  // GeneDef
  symbolPack: {
    wholeNameSymbols: { "[i]": { symbol: null } },
    prefixSymbols: { "[i]": { symbol: null } },
    suffixSymbols: { "[i]": { symbol: null } }
  },

  // MentalStateDef
  recoveryMessage: null,
  beginLetter: null,
  baseInspectLine: null,

  // OTHER
  resourceLabel: null,
  beginLetterLabel: null,
  theme: null,
  themeDesc: null,
  resourceDescription: null,
  descriptionShort: null,
  helpText: null,
  questNameRules: { rulesStrings: null },
  questDescriptionRules: { rulesStrings: null },
  logRulesInitiator: { rulesStrings: null },
  letterText: null,
  letterLabel: null,
  approachOrderString: null,
  approachingReportString: null,
  arrivedLetter: null,
  comps: {
    "[i]": {
      tools: {
        "[i]": {
          label: null
        }
      }
    }
  },
  outComeFirstPlace: null,
  outcomeFirstLoser: null,
  outComeFirstOther: null,
  labelShortAdj: null,
  customEffectDescriptions: {
    "[i]": null
  },
  root: {
    nodes: {
      "[i]": {
        node: {
          nodes: {
            "[i]": {
              label: null,
              text: null
            }
          }
        }
      }
    }
  }
});

export type IRule = {
  [K in string]: null | IRule;
};
export type ICompsRules<S = any> = {
  [K in string]: {
    label?: string | null;
  } & (
    | {
        fields: { [k: string]: string | null };
      }
    | {
        extendFields: keyof S & string;
      }
  );
};

export const CompsRules: ICompsRules = (<C extends ICompsRules<C>>(d: C) => d)({
  CompProperties_AbilityConvert: {
    label: "CompAbilityEffect_Convert",
    fields: {
      successMessage: null,
      failMessage: null
    }
  },
  CompProperties_AbilityCounsel: {
    label: "CompAbilityEffect_Counsel",
    fields: {
      successMessage: null,
      successMessageNoNegativeThought: null,
      failMessage: null
    }
  },
  CompProperties_AbilityReassure: {
    label: "CompAbilityEffect_Reassure",
    fields: {
      successMessage: null
    }
  },
  CompProperties_AbilityStartRitualOnPawn: {
    label: "CompAbilityEffect_StartRitualOnPawn",
    fields: {
      targetRoleId: null
    }
  },
  CompProperties_Activable: {
    label: "CompActivable",
    fields: {
      jobString: null,
      onCooldownString: null,
      activateTexPath: null
    }
  },
  CompProperties_AssignableToPawn: {
    label: "CompAssignableToPawn",
    fields: {
      noAssignablePawnsDesc: null
    }
  },
  CompProperties_BiosculpterPod_AgeReversalCycle: {
    label: "CompBiosculpterPod_AgeReversalCycle",
    extendFields: "CompProperties_BiosculpterPod_BaseCycle"
  },
  CompProperties_BiosculpterPod_BaseCycle: {
    fields: {
      label: null,
      description: null
    }
  },
  CompProperties_BiosculpterPod_HealingCycle: {
    label: null, // get from "compClass"
    extendFields: "CompProperties_BiosculpterPod_BaseCycle"
  },
  CompProperties_BiosculpterPod_PleasureCycle: {
    label: "CompBiosculpterPod_PleasureCycle",
    extendFields: "CompProperties_BiosculpterPod_BaseCycle"
  },
  CompProperties_Reloadable: {
    label: "CompReloadable",
    fields: {
      chargeNoun: "charge",
      cooldownGerund: "on cooldown"
    }
  }
});
