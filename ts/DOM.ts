/* eslint-disable */
import ace from "ace-builds";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-monokai";
import convert from "./XMLConvert";
import readDir from "./readDir";

let container = document.getElementById("container")!;

const editor = ace.edit(container);
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/xml");

let programmaticChange = false;
function set(value: string) {
  programmaticChange = true;
  editor.setValue(convert(value) ?? value);
  programmaticChange = false;
}

export default function initDOM() {
  editor.on("change", function () {
    if (programmaticChange) return;
    set(editor.getValue());
    editor.renderer.updateFull();
  });
  window.addEventListener("dragover", (e) => {
    if (!e.dataTransfer?.items[0]?.webkitGetAsEntry()) return;
    e.preventDefault();
    container.classList.add("drag");
  });
  window.addEventListener("dragleave", (e) => {
    e.preventDefault();
    container.classList.remove("drag");
  });
  window.addEventListener("drop", async (e) => {
    e.preventDefault();
    container.classList.remove("drag");
    readDir(e.dataTransfer!.items);
  });
}

let txt1 = `
  <HediffDef ParentName="AddedBodyPartBase">
    <defName>ArchotechArm</defName>
    <label>archotech arm</label>
    <labelNoun>an archotech arm</labelNoun>
    <description>An installed archotech arm.</description>
    <descriptionHyperlinks><ThingDef>ArchotechArm</ThingDef></descriptionHyperlinks>
    <comps>
      <li Class="HediffCompProperties_VerbGiver">
        <tools>
          <li>
            <label>fist</label>
            <capacities>
              <li>Blunt</li>
            </capacities>
            <power>14</power>
            <cooldownTime>2</cooldownTime>
            <soundMeleeHit>MeleeHit_BionicPunch</soundMeleeHit>
            <soundMeleeMiss>MeleeMiss_BionicPunch</soundMeleeMiss>
          </li>
          <li>
            <label>fist</label>
            <capacities>
              <li>Blunt</li>
            </capacities>
            <power>14</power>
            <cooldownTime>2</cooldownTime>
            <soundMeleeHit>MeleeHit_BionicPunch</soundMeleeHit>
            <soundMeleeMiss>MeleeMiss_BionicPunch</soundMeleeMiss>
          </li>
        </tools>
      </li>
      <li Class="HediffCompProperties_VerbGiver">
        <tools>
          <li>
            <label>bbbb</label>
            <capacities>
              <li>Blunt</li>
            </capacities>
            <power>14</power>
            <cooldownTime>2</cooldownTime>
            <soundMeleeHit>MeleeHit_BionicPunch</soundMeleeHit>
            <soundMeleeMiss>MeleeMiss_BionicPunch</soundMeleeMiss>
          </li>
        </tools>
      </li>
    </comps>
    <spawnThingOnRemoved>ArchotechArm</spawnThingOnRemoved>
    <addedPartProps>
      <solid>true</solid>
      <partEfficiency>1.50</partEfficiency>
      <betterThanNatural>true</betterThanNatural>
    </addedPartProps>
  </HediffDef>
`,
  txt2 = `
  <?xml version="1.0" encoding="utf-8" ?>
  <Defs>
    <ThingDef>
      <defName>First</defName>
      <label>First Label</label>
    </ThingDef>
    <ThingDef>
      <defName>Seccond</defName>
      <label>Seccond Label</label>
      <comps>
        <li Class="HediffCompProperties_VerbGiver">
          <tools>
            <li>
              <label>fist</label>
              <capacities>
                <li>Blunt</li>
              </capacities>
              <power>14</power>
              <cooldownTime>2</cooldownTime>
              <soundMeleeHit>MeleeHit_BionicPunch</soundMeleeHit>
              <soundMeleeMiss>MeleeMiss_BionicPunch</soundMeleeMiss>
            </li>
            <li>
              <label>fist</label>
              <capacities>
                <li>Blunt</li>
              </capacities>
              <power>14</power>
              <cooldownTime>2</cooldownTime>
              <soundMeleeHit>MeleeHit_BionicPunch</soundMeleeHit>
              <soundMeleeMiss>MeleeMiss_BionicPunch</soundMeleeMiss>
            </li>
          </tools>
        </li>
        <li Class="HediffCompProperties_VerbGiver">
          <tools>
            <li>
              <label>bbbb</label>
              <capacities>
                <li>Blunt</li>
              </capacities>
              <power>14</power>
              <cooldownTime>2</cooldownTime>
              <soundMeleeHit>MeleeHit_BionicPunch</soundMeleeHit>
              <soundMeleeMiss>MeleeMiss_BionicPunch</soundMeleeMiss>
            </li>
          </tools>
        </li>
      </comps>
    </ThingDef>
    <ThingDef>
      <defName>DEF_NAME</defName>
      <label>Label</label>
      <corePart>
        <parts>
          <li>
            <customLabel>Test 1</customLabel>
            <parts>
              <li>
                <customLabel>Test 2</customLabel>
                <parts>
                  <li>
                    <customLabel>Test 3</customLabel>
                    <parts>
                      <li>
                        <customLabel>Test 4</customLabel>
                        <parts>
                          <li>
                            <customLabel>Test 5</customLabel>
                            <parts>
                              <li>
                                <customLabel>End</customLabel>
                              </li>
                            </parts>
                          </li>
                        </parts>
                      </li>
                    </parts>
                  </li>
                </parts>
              </li>
            </parts>
          </li>
        </parts>
      </corePart>
      <stages>
        <li>
          <label>L 1</label>
          <description>D 1</description>
        </li>
        <li>
          <label>L 2</label>
          <description>D 2</description>
        </li>
      </stages>
      <generalRules>
        <rulesStrings>
          <li>Text1</li>
          <li>Text2</li>
          <li>Hello\nWorld</li>
        </rulesStrings>
      </generalRules>
    </ThingDef>
  </Defs>
  `,
  txt3 = `
    <AbilityDef>
      <defName>Counsel</defName>
      <label>Counsel</label>
      <description>Offer counsel to a person to cancel the effect of a sad memory. The chance of success depends on the speaker's social skills and their relationship with the listener.</description>
      <groupDef>Moralist</groupDef>
      <iconPath>UI/Abilities/Counsel</iconPath>
      <warmupMoteSocialSymbol>UI/Abilities/Counsel</warmupMoteSocialSymbol>
      <warmupSound>MoralistAbility_Warmup</warmupSound>
      <hotKey>Misc12</hotKey>
      <jobDef>CastAbilityOnThingMelee</jobDef>
      <stunTargetWhileCasting>True</stunTargetWhileCasting>
      <showPsycastEffects>False</showPsycastEffects>
      <displayGizmoWhileUndrafted>True</displayGizmoWhileUndrafted>
      <disableGizmoWhileUndrafted>False</disableGizmoWhileUndrafted>
      <uiOrder>3</uiOrder>
      <showWhenDrafted>false</showWhenDrafted>
      <hostile>false</hostile>
      <comps>
        <li Class="CompProperties_AbilityCounsel">
          <successMessage>{INITIATOR_labelShort} successfully counselled {RECIPIENT_labelShort}, canceling the mood impact of {2}.</successMessage>
          <successMessageNoNegativeThought>{INITIATOR_labelShort} successfully counselled {RECIPIENT_labelShort}, increasing {RECIPIENT_possessive} mood by {MOODBONUS}.</successMessageNoNegativeThought>
          <failMessage>{INITIATOR_labelShort} botched the attempt to counsel {RECIPIENT_labelShort}. {RECIPIENT_labelShort} has become upset.</failMessage>
          <failedThoughtRecipient>CounselFailed</failedThoughtRecipient>
          <sound>MoralistAbility_Resolve</sound>
        </li>
        <li Class="CompProperties_AbilityMustBeCapableOf">
          <workTags>
            <li>Social</li>
          </workTags>
        </li>
      </comps>
      <verbProperties>
        <verbClass>Verb_CastAbilityTouch</verbClass>
        <drawAimPie>False</drawAimPie>
        <range>-1</range>
        <warmupTime>3.0</warmupTime>
        <targetParams>
          <canTargetBuildings>False</canTargetBuildings>
          <neverTargetHostileFaction>True</neverTargetHostileFaction>
        </targetParams>
      </verbProperties>
    </AbilityDef>
  `,
  txt4 = `
    <ThingDef ParentName="BuildingBase">
      <defName>BiosculpterPod</defName>
      <label>biosculpter pod</label>
      <description>An immersion pod full of bioactive gel. It can perform a variety of biological alterations including age reversal and pleasure-giving.\n\nThe pod biotunes to its user at the end of a cycle. While biotuned, it cannot be used by anyone else, but cycles will complete 25% more quickly. Biotuning resets if the pod is unused for 80 days.\n\nThe pod consumess 200W of power while working, but only 50W on standby.</description>
      <containedPawnsSelectable>true</containedPawnsSelectable>
      <graphicData>
        <texPath>Things/Building/Misc/BiosculpterPod/BiosculpterPod</texPath>
        <graphicClass>Graphic_Multi</graphicClass>
        <shadowData>
          <volume>(2.9,0.6,1.9)</volume>
        </shadowData>
        <drawSize>(3, 2)</drawSize>
      </graphicData>
      <drawerType>MapMeshAndRealTime</drawerType>
      <drawGUIOverlay>true</drawGUIOverlay>
      <defaultPlacingRot>South</defaultPlacingRot>
      <researchPrerequisites><li>Biosculpting</li></researchPrerequisites>
      <altitudeLayer>Building</altitudeLayer>
      <passability>PassThroughOnly</passability>
      <pathCost>42</pathCost>
      <blockWind>true</blockWind>
      <fillPercent>0.5</fillPercent>
      <canOverlapZones>false</canOverlapZones>
      <statBases>
        <MaxHitPoints>250</MaxHitPoints>
        <WorkToBuild>28000</WorkToBuild>
        <Mass>50</Mass>
        <Flammability>0.5</Flammability>
        <BiosculpterPodSpeedFactor>1</BiosculpterPodSpeedFactor>
        <Beauty>-5</Beauty>
      </statBases>
      <size>(3,2)</size>
      <interactionCellOffset>(0,0,2)</interactionCellOffset>
      <hasInteractionCell>true</hasInteractionCell>
      <costList>
        <Steel>120</Steel>
        <ComponentIndustrial>4</ComponentIndustrial>
      </costList>
      <constructionSkillPrerequisite>8</constructionSkillPrerequisite>
      <building>
        <destroySound>BuildingDestroyed_Metal_Big</destroySound>
        <haulToContainerDuration>120</haulToContainerDuration>
        <uninstallWork>1800</uninstallWork>
        <fixedStorageSettings>
          <filter>
            <categories>
              <li>Foods</li>
            </categories>
            <specialFiltersToDisallow>
              <li>AllowPlantFood</li>
            </specialFiltersToDisallow>
            <disallowedThingDefs>
              <li>Hay</li>
            </disallowedThingDefs>
          </filter>
        </fixedStorageSettings>
        <defaultStorageSettings>
          <filter>
            <categories>
              <li>Foods</li>
            </categories>
            <disallowedCategories>
              <li>EggsFertilized</li>
            </disallowedCategories>
            <disallowedThingDefs>
              <li>InsectJelly</li>
              <li>MealLavish</li>
              <li>MealLavish_Veg</li>
              <li>MealLavish_Meat</li>
              <li>Chocolate</li>
              <li MayRequire="Ludeon.Rimworld.Biotech">HemogenPack</li>
            </disallowedThingDefs>
          </filter>
        </defaultStorageSettings>
      </building>
      <resourcesFractionWhenDeconstructed>0.25</resourcesFractionWhenDeconstructed>
      <designationCategory>Ideology</designationCategory>
      <uiOrder>2500</uiOrder>
      <minifiedDef>MinifiedThing</minifiedDef>
      <thingCategories>
        <li>BuildingsMisc</li>
      </thingCategories>
      <tickerType>Normal</tickerType>
      <inspectorTabs>
        <li>ITab_BiosculpterNutritionStorage</li>
      </inspectorTabs>
      <comps>
        <li Class="CompProperties_Power">
          <compClass>CompPowerTrader</compClass>
          <basePowerConsumption>200</basePowerConsumption>
          <idlePowerDraw>50</idlePowerDraw>
        </li>
        <li Class="CompProperties_Flickable"/>
        <li Class="CompProperties_BiosculpterPod">
          <enterSound>BiosculpterPod_Enter</enterSound>
          <exitSound>BiosculpterPod_Exit</exitSound>
          <operatingEffecter>BiosculpterPod_Operating</operatingEffecter>
          <readyEffecter>BiosculpterPod_Ready</readyEffecter>
          <selectCycleColor>(0.321, 1, 0.349)</selectCycleColor>
          <biotunedCycleSpeedFactor>1.25</biotunedCycleSpeedFactor>
        </li>
        <li Class="CompProperties_BiosculpterPod_HealingCycle">
          <compClass>CompBiosculpterPod_MedicCycle</compClass>
          <key>medic</key>
          <label>medic</label>
          <description>Heal all fresh wounds, blood loss, and one random infectious disease.</description>
          <iconPath>UI/Gizmos/BiosculpterCycleHealing</iconPath>
          <durationDays>6</durationDays>
          <operatingColor>(0.554,0.887,1.000)</operatingColor>
          <conditionsToPossiblyCure>
            <li>Malaria</li>
            <li>SleepingSickness</li>
            <li>Flu</li>
            <li>Plague</li>
            <li>GutWorms</li>
            <li>MuscleParasites</li>
            <li>WoundInfection</li>
          </conditionsToPossiblyCure>
        </li>
        <li Class="CompProperties_BiosculpterPod_HealingCycle">
          <compClass>CompBiosculpterPod_RegenerationCycle</compClass>
          <key>bioregeneration</key>
          <label>bioregeneration</label>
          <description>Heal all fresh wounds, heal one random permanent injury, and restore small missing body parts like fingers and toes.</description>
          <iconPath>UI/Gizmos/BiosculpterCycleBioregeneration</iconPath>
          <durationDays>25</durationDays>
          <operatingColor>(0.554,0.887,1.000)</operatingColor>
          <extraRequiredIngredients>
            <MedicineUltratech>2</MedicineUltratech>
          </extraRequiredIngredients>
          <requiredResearch>
            <li>Bioregeneration</li>
          </requiredResearch>
          <bodyPartsToRestore>
            <li>Eye</li>
            <li>Ear</li>
            <li>Nose</li>
            <li>Finger</li>
            <li>Toe</li>
            <li>Tongue</li>
          </bodyPartsToRestore>
          <conditionsToPossiblyCure>
            <li>Asthma</li>
            <li>BadBack</li>
            <li>Cataract</li>
            <li>Blindness</li>
            <li>Frail</li>
            <li>HearingLoss</li>
            <li>HeartArteryBlockage</li>
          </conditionsToPossiblyCure>
        </li>
        <li Class="CompProperties_BiosculpterPod_AgeReversalCycle">
          <key>ageReversal</key>
          <label>age reversal</label>
          <description>Reverse {DURATION} of aging.</description>
          <iconPath>UI/Gizmos/BiosculpterCycleAgeReversal</iconPath>
          <durationDays>8</durationDays>
          <gainThoughtOnCompletion>AgeReversalReceived</gainThoughtOnCompletion>
          <operatingColor>(1.000,0.585,0.158)</operatingColor>
        </li>
        <li Class="CompProperties_BiosculpterPod_PleasureCycle">
          <key>pleasure</key>
          <label>pleasure</label>
          <description>Temporarily reshape the nervous system to deliver elevated levels of happiness for a time.</description>
          <iconPath>UI/Gizmos/BiosculpterCyclePleasure</iconPath>
          <durationDays>4</durationDays>
          <operatingColor>(1.000,0.918,0.000)</operatingColor>
        </li>
      </comps>
      <placeWorkers>
        <li>PlaceWorker_PreventInteractionSpotOverlap</li>
      </placeWorkers>
    </ThingDef>
  `;

set(txt2);

/*
txt3

<?xml version="1.0" encoding="UTF-8"?>
<LanguageData>
  
  <!-- EN: noble and despised -->
  <NobleDespisedWeapons.label>благородне та зневажене</NobleDespisedWeapons.label>
  <!-- EN: We have preferences on which weapons should or should not be used in combat. -->
  <NobleDespisedWeapons.description>У нас є вподобання щодо того, яку зброю слід, а яку не слід використовувати в бою.</NobleDespisedWeapons.description>
  <!-- EN: Victory by noble weapon -->
  <NobleDespisedWeapons.comps.0.description>Перемога благородною зброєю</NobleDespisedWeapons.comps.0.description>
  <!-- EN: Used despised weapon -->
  <NobleDespisedWeapons.comps.1.description>Застосовано зневажену зброю</NobleDespisedWeapons.comps.1.description>
  <!-- EN: Wielding noble weapon -->
  <NobleDespisedWeapons.comps.2.thoughtStageDescriptions.0>Володіння благородною зброєю</NobleDespisedWeapons.comps.2.thoughtStageDescriptions.0>
  <!-- EN: Wielding despised weapon -->
  <NobleDespisedWeapons.comps.2.thoughtStageDescriptions.1>Володіння зневаженою зброєю</NobleDespisedWeapons.comps.2.thoughtStageDescriptions.1>
  
</LanguageData>
*/
