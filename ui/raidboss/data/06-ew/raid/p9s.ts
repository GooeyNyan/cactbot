import Outputs from '../../../../../resources/outputs';
import { Responses } from '../../../../../resources/responses';
import ZoneId from '../../../../../resources/zone_id';
import { RaidbossData } from '../../../../../types/data';
import { NetMatches } from '../../../../../types/net_matches';
import { TriggerSet } from '../../../../../types/trigger';

// TODO: handle Two Minds

export interface Data extends RaidbossData {
  decOffset?: number;
  lastDualspellId?: string;
  limitCutNumber?: number;
  combination?: 'front' | 'rear';
  seenChimericSuccession?: boolean;
}

const dualspells = {
  fireIce: '8154',
  thunderIce: '8155',
};

const headmarkers = {
  // vfx/lockon/eff/tank_lockonae_0m_5s_01t.avfx
  dualityOfDeath: '01D4',
  // vfx/lockon/eff/m0361trg_a1t.avfx (through m0361trg_a8t)
  limitCut1: '004F',
  limitCut2: '0050',
  limitCut3: '0051',
  limitCut4: '0052',
  limitCut5: '0053',
  limitCut6: '0054',
  limitCut7: '0055',
  limitCut8: '0056',
  // vfx/lockon/eff/r1fz_skywl_s9x.avfx
  defamation: '014A',
  // vfx/lockon/eff/n5r9_lockon_bht_c0g.avfx
  cometMarker: '01B3',
} as const;

const limitCutMarkers: readonly string[] = [
  headmarkers.limitCut1,
  headmarkers.limitCut2,
  headmarkers.limitCut3,
  headmarkers.limitCut4,
  headmarkers.limitCut5,
  headmarkers.limitCut6,
  headmarkers.limitCut7,
  headmarkers.limitCut8,
] as const;

const firstHeadmarker = parseInt(headmarkers.dualityOfDeath, 16);

const getHeadmarkerId = (data: Data, matches: NetMatches['HeadMarker']) => {
  // If we naively just check !data.decOffset and leave it, it breaks if the first marker is 00DA.
  // (This makes the offset 0, and !0 is true.)
  if (data.decOffset === undefined)
    data.decOffset = parseInt(matches.id, 16) - firstHeadmarker;
  // The leading zeroes are stripped when converting back to string, so we re-add them here.
  // Fortunately, we don't have to worry about whether or not this is robust,
  // since we know all the IDs that will be present in the encounter.
  return (parseInt(matches.id, 16) - data.decOffset).toString(16).toUpperCase().padStart(4, '0');
};

const triggerSet: TriggerSet<Data> = {
  id: 'AnabaseiosTheNinthCircleSavage',
  zoneId: ZoneId.AnabaseiosTheNinthCircleSavage,
  timelineFile: 'p9s.txt',
  triggers: [
    {
      id: 'P9S Headmarker Tracker',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data) => data.decOffset === undefined,
      // Unconditionally set the first headmarker here so that future triggers are conditional.
      run: (data, matches) => getHeadmarkerId(data, matches),
    },
    {
      id: 'P9S Gluttony\'s Augur',
      type: 'StartsUsing',
      netRegex: { id: '814C', source: 'Kokytos', capture: false },
      response: Responses.aoe(),
    },
    {
      id: 'P9S Soul Surge',
      type: 'Ability',
      // Soul Surge happens ~6s after any Ravening with no cast bar.
      netRegex: { id: ['8118', '8119', '817B', '811A'], source: 'Kokytos', capture: false },
      response: Responses.aoe(),
    },
    {
      id: 'P9S Duality of Death',
      type: 'StartsUsing',
      netRegex: { id: '8151', source: 'Kokytos', capture: false },
      response: (data, _matches, output) => {
        // cactbot-builtin-response
        output.responseOutputStrings = {
          tankSwap: Outputs.tankSwap,
          tankBusters: Outputs.tankBusters,
        };

        // TODO: track headmarkers?
        if (data.role === 'tank')
          return { alertText: output.tankSwap!() };
        return { infoText: output.tankBusters!() };
      },
    },
    {
      id: 'P9S Dualspell Fire/Ice',
      type: 'StartsUsing',
      netRegex: { id: dualspells.fireIce, source: 'Kokytos' },
      durationSeconds: 5,
      infoText: (_data, _matches, output) => output.text!(),
      run: (data, matches) => data.lastDualspellId = matches.id,
      outputStrings: {
        text: {
          en: 'Partners + Donut',
          de: 'Partner + Donut',
          fr: 'Partenaires + Donut',
          cn: '双人分摊 + 月环',
        },
      },
    },
    {
      id: 'P9S Dualspell Thunder/Ice',
      type: 'StartsUsing',
      netRegex: { id: dualspells.thunderIce, source: 'Kokytos' },
      durationSeconds: 5,
      infoText: (_data, _matches, output) => output.text!(),
      run: (data, matches) => data.lastDualspellId = matches.id,
      outputStrings: {
        text: {
          en: 'Protean + Donut',
          de: 'Himmelsrichtungen + Donut',
          fr: 'Positions + Donut',
          cn: '八方分散 + 月环',
        },
      },
    },
    {
      id: 'P9S Fire Symbol',
      type: 'Ability',
      netRegex: { id: '8122', source: 'Kokytos', capture: false },
      alertText: (data, _matches, output) => {
        if (data.lastDualspellId === dualspells.fireIce)
          return output.fireIceOut!();
        return output.out!();
      },
      run: (data) => delete data.lastDualspellId,
      outputStrings: {
        fireIceOut: {
          en: 'Out + Partners',
          de: 'Raus + Partner',
          fr: 'Extérieur + Partenaires',
          cn: '远离 + 双人分摊',
        },
        out: Outputs.out,
      },
    },
    {
      id: 'P9S Ice Symbol',
      type: 'Ability',
      netRegex: { id: '8123', source: 'Kokytos', capture: false },
      alertText: (data, _matches, output) => {
        if (data.lastDualspellId === dualspells.fireIce)
          return output.fireIceIn!();
        if (data.lastDualspellId === dualspells.thunderIce)
          return output.thunderIceIn!();
        return output.in!();
      },
      run: (data) => delete data.lastDualspellId,
      outputStrings: {
        fireIceIn: {
          en: 'In + Partners',
          de: 'Rein + Partner',
          fr: 'Intérieur + Partenaires',
          cn: '靠近 + 双人分摊',
        },
        thunderIceIn: {
          en: 'In + Protean',
          de: 'Rein + Himmelsrichtungen',
          fr: 'Intérieur + Positions',
          cn: '靠近 + 八方分散',
        },
        in: Outputs.in,
      },
    },
    {
      id: 'P9S Thunder Symbol',
      type: 'Ability',
      netRegex: { id: '815C', source: 'Kokytos', capture: false },
      alertText: (data, _matches, output) => {
        if (data.lastDualspellId === dualspells.thunderIce)
          return output.thunderIceOut!();
        return output.out!();
      },
      run: (data) => delete data.lastDualspellId,
      outputStrings: {
        thunderIceOut: {
          en: 'Out + Protean',
          de: 'Raus + Himmelsrichtungen',
          fr: 'Extérieur + Positions',
          cn: '远离 + 八方分散',
        },
        out: Outputs.out,
      },
    },
    {
      id: 'P9S Ascendant Fist',
      type: 'StartsUsing',
      netRegex: { id: '816F', source: 'Kokytos' },
      response: Responses.tankBusterSwap(),
    },
    {
      id: 'P9S Archaic Rockbreaker',
      type: 'StartsUsing',
      netRegex: { id: '815F', source: 'Kokytos', capture: false },
      infoText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Knockback into Wall',
          de: 'Rückstoß in die Wand',
          fr: 'Poussée sur un mur',
          cn: '向墙边击退',
        },
      },
    },
    {
      id: 'P9S Archaic Demolish',
      type: 'StartsUsing',
      netRegex: { id: '816D', source: 'Kokytos', capture: false },
      alertText: (_data, _matches, output) => output.healerGroups!(),
      outputStrings: {
        healerGroups: Outputs.healerGroups,
      },
    },
    {
      id: 'P9S Limit Cut',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data, matches) => {
        return data.me === matches.target &&
          limitCutMarkers.includes(getHeadmarkerId(data, matches));
      },
      preRun: (data, matches) => {
        const correctedMatch = getHeadmarkerId(data, matches);
        const limitCutNumberMap: { [id: string]: number } = {
          '004F': 1,
          '0050': 2,
          '0051': 3,
          '0052': 4,
          '0053': 5,
          '0054': 6,
          '0055': 7,
          '0056': 8,
        };
        data.limitCutNumber = limitCutNumberMap[correctedMatch];
      },
      durationSeconds: (data) => data.seenChimericSuccession ? 20 : 30,
      infoText: (data, _matches, output) => {
        return output.text!({ num: data.limitCutNumber ?? output.unknown!() });
      },
      outputStrings: {
        text: {
          en: '${num}',
          de: '${num}',
          fr: '${num}',
          ja: '${num}',
          cn: '${num}',
          ko: '${num}',
        },
        unknown: Outputs.unknown,
      },
    },
    {
      id: 'P9S Defamation',
      type: 'HeadMarker',
      netRegex: {},
      condition: (data, matches) => {
        return data.me === matches.target &&
          getHeadmarkerId(data, matches) === headmarkers.defamation;
      },
      alarmText: (_data, _matches, output) => output.defamation!(),
      outputStrings: {
        defamation: {
          en: 'Defamation on YOU',
          de: 'Ehrenstrafe aud DIR',
          fr: 'Diffamation sur VOUS',
          ja: '名誉罰',
          cn: '大圈点名',
          ko: '명예형: 보스 밑에서 나 홀로!!!',
        },
      },
    },
    {
      id: 'P9S Charybdis',
      type: 'StartsUsing',
      netRegex: { id: '8170', source: 'Kokytos', capture: false },
      response: Responses.goMiddle(),
    },
    {
      id: 'P9S Front Inside Combination',
      type: 'StartsUsing',
      netRegex: { id: '8167', source: 'Kokytos', capture: false },
      alertText: (_data, _matches, output) => output.text!(),
      run: (data) => data.combination = 'front',
      outputStrings: {
        text: {
          en: 'Out => Back',
          de: 'Raus => Hinten',
          fr: 'Extérieur => Derrière',
          cn: '远离 => 去背后',
        },
      },
    },
    {
      id: 'P9S Front Outside Combination',
      type: 'StartsUsing',
      netRegex: { id: '8168', source: 'Kokytos', capture: false },
      alertText: (_data, _matches, output) => output.text!(),
      run: (data) => data.combination = 'front',
      outputStrings: {
        text: {
          en: 'In => Back',
          de: 'Rein => Hinten',
          fr: 'Intérieur => Derrière',
          cn: '靠近 => 去背后',
        },
      },
    },
    {
      id: 'P9S Rear Inside Roundhouse',
      type: 'StartsUsing',
      netRegex: { id: '8169', source: 'Kokytos', capture: false },
      alertText: (_data, _matches, output) => output.text!(),
      run: (data) => data.combination = 'rear',
      outputStrings: {
        text: {
          en: 'Out => Front',
          de: 'Raus => Vorne',
          fr: 'Extérieur => Devant',
          cn: '远离 => 去面前',
        },
      },
    },
    {
      id: 'P9S Rear Outside Roundhouse',
      type: 'StartsUsing',
      netRegex: { id: '816A', source: 'Kokytos', capture: false },
      alertText: (_data, _matches, output) => output.text!(),
      run: (data) => data.combination = 'rear',
      outputStrings: {
        text: {
          en: 'In => Front',
          de: 'Rein => Vorne',
          fr: 'Intérieur => Devant',
          cn: '靠近 => 去面前',
        },
      },
    },
    {
      id: 'P9S Roundhouse Followup',
      type: 'Ability',
      netRegex: { id: ['8238', '8239'], source: 'Kokytos' },
      suppressSeconds: 15,
      alertText: (data, matches, output) => {
        const isInsideRoundhouse = matches.id === '8238';
        const isOutsideRoundhouse = matches.id === '8239';

        if (data.combination === 'front') {
          if (isOutsideRoundhouse)
            return output.outAndBack!();
          if (isInsideRoundhouse)
            return output.inAndBack!();
        }
        if (data.combination === 'rear') {
          if (isOutsideRoundhouse)
            return output.outAndFront!();
          if (isInsideRoundhouse)
            return output.inAndFront!();
        }

        if (isOutsideRoundhouse)
          return output.out!();
        if (isInsideRoundhouse)
          return output.in!();
      },
      outputStrings: {
        out: Outputs.out,
        in: Outputs.in,
        outAndFront: {
          en: 'Out + Front',
          de: 'Raus + Vorne',
          fr: 'Extérieur + Devant',
          cn: '远离 => 去面前',
        },
        outAndBack: {
          en: 'Out + Back',
          de: 'Raus + Hinten',
          fr: 'Extérieur + Derrière',
          cn: '远离 => 去背后',
        },
        inAndFront: {
          en: 'In + Front',
          de: 'Rein + Vorne',
          fr: 'Intérieur + Devant',
          cn: '靠近 => 去面前',
        },
        inAndBack: {
          en: 'In + Back',
          de: 'Rein + Hinten',
          fr: 'Intérieur + Derrière',
          cn: '靠近 => 去背后',
        },
      },
    },
    {
      id: 'P9S Chimeric Succession',
      type: 'StartsUsing',
      netRegex: { id: '81BB', source: 'Kokytos', capture: false },
      run: (data) => data.seenChimericSuccession = true,
    },
  ],
  timelineReplace: [
    {
      'locale': 'en',
      'replaceText': {
        'Aero IV/Fire IV': 'Aero/Fire IV',
        'Front Combination/Rear Combination': 'Front/Rear Combination',
        'Inside Roundhouse/Outside Roundhouse': 'Inside/Outside Roundhouse',
        'Outside Roundhouse/Inside Roundhouse': 'Outside/Inside Roundhouse',
        'Front Firestrikes/Rear Firestrikes': 'Front/Rear Firestrikes',
      },
    },
    {
      'locale': 'de',
      'missingTranslations': true,
      'replaceSync': {
        'Kokytos': 'Kokytos',
      },
      'replaceText': {
        '\\(Fighter': '(Kämpfer',
        '\\(Mage': '(Magier',
        'Aero IV': 'Windka',
        'Blizzard III': 'Eisga',
        'Disgorge': 'Seelenwende',
        'Duality of Death': 'Dualer Tod',
        'Dualspell': 'Doppelspruch',
        'Fire(?! )': 'Feuer',
        'Fire IV': 'Feuka',
        'Front Combination': 'Trittfolge vor',
        'Gluttony\'s Augur': 'Omen der Fresssucht',
        'Ice': 'Eis',
        'Inside Roundhouse': 'Rundumtritt innen',
        'Outside Roundhouse': 'Rundumtritt außen',
        'Pile Pyre': 'Flammenhaufen',
        'Ravening': 'Seelenfresser',
        'Rear Combination': 'Trittfolge zurück',
        'Soul Surge': 'Seelenschub',
        'Thunder III': 'Blitzga',
        'Thunder(?! )': 'Blitz',
      },
    },
    {
      'locale': 'fr',
      'missingTranslations': true,
      'replaceSync': {
        'Kokytos': 'Kokytos',
      },
      'replaceText': {
        'Aero IV': 'Giga Vent',
        'Blizzard III': 'Méga Glace',
        'Disgorge': 'Renvoi d\'âme',
        'Duality of Death': 'Mort double',
        'Dualspell': 'Double sort',
        'Fire(?! )': 'Feu',
        'Fire IV': 'Giga Feu',
        'Front Combination': 'Coups de pied pivotants avant en série',
        'Gluttony\'s Augur': 'Augure de gloutonnerie',
        'Inside Roundhouse': 'Coup de pied pivotant intérieur',
        'Outside Roundhouse': 'Coup de pied pivotant extérieur',
        'Pile Pyre': 'Flammes empilées',
        'Ravening': 'Dévoration d\'âme',
        'Rear Combination': 'Coups de pied pivotants arrière en série',
        'Soul Surge': 'Déferlante d\'âme',
        'Thunder III': 'Méga Foudre',
        'Thunder(?! )': 'Foudre',
      },
    },
    {
      'locale': 'ja',
      'missingTranslations': true,
      'replaceSync': {
        'Kokytos': 'コキュートス',
      },
      'replaceText': {
        'Aero IV': 'エアロジャ',
        'Blizzard III': 'ブリザガ',
        'Disgorge': 'ソウルリバース',
        'Duality of Death': 'デストゥワイス',
        'Dualspell': 'ダブルスペル',
        'Fire(?! )': 'ファイア',
        'Fire IV': 'ファイジャ',
        'Front Combination': '前方連転脚',
        'Gluttony\'s Augur': 'グラトニーズアーガー',
        'Inside Roundhouse': '内転脚',
        'Outside Roundhouse': '外転脚',
        'Pile Pyre': 'パイリングフレイム',
        'Ravening': '魂喰らい',
        'Rear Combination': '後方連転脚',
        'Soul Surge': 'ソウルサージ',
        'Thunder III': 'サンダガ',
        'Thunder(?! )': 'サンダー',
      },
    },
  ],
};

export default triggerSet;