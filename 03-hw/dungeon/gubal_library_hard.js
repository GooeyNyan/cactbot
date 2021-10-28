// The Great Gubal Library--Hard
Options.Triggers.push({
    zoneId: ZoneId.TheGreatGubalLibraryHard,
    timelineFile: 'gubal_library_hard.txt',
    timelineTriggers: [
        {
            id: 'Gubal Hard Triclip',
            regex: /Triclip/,
            beforeSeconds: 5,
            response: Responses.tankBuster(),
        },
        {
            id: 'Gubal Hard Searing Wind',
            regex: /Searing Wind/,
            beforeSeconds: 5,
            response: Responses.tankCleave(),
        },
        {
            id: 'Gubal Hard Properties of Darkness',
            regex: /Darkness \(buster\)/,
            beforeSeconds: 5,
            response: Responses.tankBuster(),
        },
    ],
    triggers: [
        {
            id: 'Gubal Hard Bibliocide',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '1945', source: 'Liquid Flame', capture: false }),
            netRegexDe: NetRegexes.startsUsing({ id: '1945', source: 'flüssig(?:e|er|es|en) Flamme', capture: false }),
            netRegexFr: NetRegexes.startsUsing({ id: '1945', source: 'Flamme Liquide', capture: false }),
            netRegexJa: NetRegexes.startsUsing({ id: '1945', source: 'リクイドフレイム', capture: false }),
            netRegexCn: NetRegexes.startsUsing({ id: '1945', source: '液态火焰', capture: false }),
            netRegexKo: NetRegexes.startsUsing({ id: '1945', source: '액체 불꽃', capture: false }),
            response: Responses.aoe(),
        },
        {
            id: 'Gubal Hard Ferrofluid',
            type: 'HeadMarker',
            netRegex: NetRegexes.headMarker({ id: ['0030', '0031'] }),
            condition: (data, matches) => data.me === matches.target || matches.targetId.slice(0, 1) === '4',
            preRun: (data, matches) => {
                let _a;
                (_a = data.markers) !== null && _a !== void 0 ? _a : (data.markers = []);
                data.markers.push(matches.id);
            },
            infoText: (data, _matches, output) => {
                let _a;
                if (((_a = data.markers) === null || _a === void 0 ? void 0 : _a.length) === 2) {
                    const sameMarkers = data.markers[0] === data.markers[1];
                    delete data.markers;
                    if (sameMarkers)
                        return output.closeToBoss();
                    return output.awayFromBoss();
                }
            },
            outputStrings: {
                closeToBoss: {
                    en: 'Close to boss',
                    de: 'Nahe zum Boss',
                    fr: 'Rapprochez-vous du boss',
                    ja: 'ボスに近づく',
                    cn: '靠近boss',
                    ko: '보스와 가까이 서기',
                },
                awayFromBoss: {
                    en: 'Away from boss',
                    de: 'Weg vom Boss',
                    fr: 'Éloignez-vous du boss',
                    ja: 'ボスから離れる',
                    cn: '远离boss',
                    ko: '보스와 떨어지기',
                },
            },
        },
        {
            id: 'Gubal Hard Slosh',
            type: 'Tether',
            netRegex: NetRegexes.tether({ id: '0039', source: 'Liquid Flame' }),
            netRegexDe: NetRegexes.tether({ id: '0039', source: 'Flüssig(?:e|er|es|en) Flamme' }),
            netRegexFr: NetRegexes.tether({ id: '0039', source: 'Flamme Liquide' }),
            netRegexJa: NetRegexes.tether({ id: '0039', source: 'リクイドフレイム' }),
            netRegexCn: NetRegexes.tether({ id: '0039', source: '液态火焰' }),
            netRegexKo: NetRegexes.tether({ id: '0039', source: '액체 불꽃' }),
            condition: Conditions.targetIsYou(),
            infoText: (_data, _matches, output) => output.text(),
            outputStrings: {
                text: {
                    en: 'Away from boss',
                    de: 'Weg vom Boss',
                    fr: 'Éloignez-vous du boss',
                    ja: 'ボスから離れる',
                    cn: '远离boss',
                    ko: '멀어지기',
                },
            },
        },
        {
            id: 'Gubal Hard Sunseal',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({ effectId: '46F' }),
            condition: Conditions.targetIsYou(),
            infoText: (_data, _matches, output) => output.text(),
            outputStrings: {
                text: {
                    en: 'Stand in red',
                    de: 'Im Roten stehen',
                    fr: 'Placez-vous dans le rouge',
                    ja: '赤色に入る',
                    cn: '站在红色',
                    ko: '빨강장판에 서기',
                },
            },
        },
        {
            id: 'Gubal Hard Moonseal',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({ effectId: '470' }),
            condition: Conditions.targetIsYou(),
            infoText: (_data, _matches, output) => output.text(),
            outputStrings: {
                text: {
                    en: 'Stand in blue',
                    de: 'Im Blauen stehen',
                    fr: 'Placez-vous dans le bleu',
                    ja: '青色に入る',
                    cn: '站在蓝色',
                    ko: '파랑장판에 서기',
                },
            },
        },
        {
            // This inflicts a vulnerability stack on the tank if not interrupted
            id: 'Gubal Hard Condensed Libra',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '198D', source: 'Mechanoscribe', capture: false }),
            netRegexDe: NetRegexes.startsUsing({ id: '198D', source: 'Mechanoscholar', capture: false }),
            netRegexFr: NetRegexes.startsUsing({ id: '198D', source: 'Mécano-Scribe', capture: false }),
            netRegexJa: NetRegexes.startsUsing({ id: '198D', source: 'メカノスクライブ', capture: false }),
            netRegexCn: NetRegexes.startsUsing({ id: '198D', source: '自走人偶抄写员', capture: false }),
            netRegexKo: NetRegexes.startsUsing({ id: '198D', source: '기계 서기', capture: false }),
            infoText: (data, _matches, output) => {
                if (data.CanSilence())
                    return output.interruptMechanoscribe();
                if (data.CanStun())
                    return output.stunMechanoscribe();
            },
            outputStrings: {
                interruptMechanoscribe: {
                    en: 'Interrupt Mechanoscribe',
                    de: 'unterbreche Mechanoscholar',
                    fr: 'Interrompez le Mécano-scribe',
                    ja: '沈黙：メカノスクライブ',
                    cn: '打断人偶',
                    ko: '기계 서기 차단',
                },
                stunMechanoscribe: {
                    en: 'Stun Mechanoscribe',
                    de: 'betäube Mechanoscholar',
                    fr: 'Étourdissez le Mécano-scribe',
                    ja: 'スタン：メカノスクライブ',
                    cn: '眩晕人偶',
                    ko: '기계 서기 기절',
                },
            },
        },
        {
            id: 'Gubal Hard Properties of Quakes',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '1956', source: 'Strix', capture: false }),
            netRegexDe: NetRegexes.startsUsing({ id: '1956', source: 'Strix', capture: false }),
            netRegexFr: NetRegexes.startsUsing({ id: '1956', source: 'Strix', capture: false }),
            netRegexJa: NetRegexes.startsUsing({ id: '1956', source: 'ストリックス', capture: false }),
            netRegexCn: NetRegexes.startsUsing({ id: '1956', source: '博学林鸮', capture: false }),
            netRegexKo: NetRegexes.startsUsing({ id: '1956', source: '스트릭스', capture: false }),
            infoText: (_data, _matches, output) => output.text(),
            outputStrings: {
                text: {
                    en: 'Stand in light circle',
                    de: 'Im hellen Kreis stehen',
                    fr: 'Placez-vous dans le cercle blanc',
                    ja: '白い輪に入る',
                    cn: '去白色区域',
                    ko: '빛 장판으로',
                },
            },
        },
        {
            id: 'Gubal Hard Properties of Tornadoes',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '1957', source: 'Strix', capture: false }),
            netRegexDe: NetRegexes.startsUsing({ id: '1957', source: 'Strix', capture: false }),
            netRegexFr: NetRegexes.startsUsing({ id: '1957', source: 'Strix', capture: false }),
            netRegexJa: NetRegexes.startsUsing({ id: '1957', source: 'ストリックス', capture: false }),
            netRegexCn: NetRegexes.startsUsing({ id: '1957', source: '博学林鸮', capture: false }),
            netRegexKo: NetRegexes.startsUsing({ id: '1957', source: '스트릭스', capture: false }),
            infoText: (_data, _matches, output) => output.text(),
            outputStrings: {
                text: {
                    en: 'Stand in dark circle',
                    de: 'Im dunklen Kreis stehen',
                    fr: 'Placez-vous dans le cercle noir',
                    ja: '黒い輪に入る',
                    cn: '去黑色区域',
                    ko: '어둠 장판으로',
                },
            },
        },
        {
            id: 'Gubal Hard Properties of Imps',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '1959', source: 'Strix', capture: false }),
            netRegexDe: NetRegexes.startsUsing({ id: '1959', source: 'Strix', capture: false }),
            netRegexFr: NetRegexes.startsUsing({ id: '1959', source: 'Strix', capture: false }),
            netRegexJa: NetRegexes.startsUsing({ id: '1959', source: 'ストリックス', capture: false }),
            netRegexCn: NetRegexes.startsUsing({ id: '1959', source: '博学林鸮', capture: false }),
            netRegexKo: NetRegexes.startsUsing({ id: '1959', source: '스트릭스', capture: false }),
            infoText: (_data, _matches, output) => output.text(),
            outputStrings: {
                text: {
                    en: 'Cleanse in green circle',
                    de: 'Im grünen Kreis reinigen',
                    fr: 'Purifiez-vous dans le cercle vert',
                    ja: '緑の輪に入る',
                    cn: '去绿色区域',
                    ko: '초록 장판으로',
                },
            },
        },
        {
            id: 'Gubal Hard Properties of Thunder',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '195A', source: 'Strix', capture: false }),
            netRegexDe: NetRegexes.startsUsing({ id: '195A', source: 'Strix', capture: false }),
            netRegexFr: NetRegexes.startsUsing({ id: '195A', source: 'Strix', capture: false }),
            netRegexJa: NetRegexes.startsUsing({ id: '195A', source: 'ストリックス', capture: false }),
            netRegexCn: NetRegexes.startsUsing({ id: '195A', source: '博学林鸮', capture: false }),
            netRegexKo: NetRegexes.startsUsing({ id: '195A', source: '스트릭스', capture: false }),
            response: Responses.spread(),
        },
        {
            id: 'Gubal Hard Properties of Darkness II',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '1955', source: 'Strix', capture: false }),
            netRegexDe: NetRegexes.startsUsing({ id: '1955', source: 'Strix', capture: false }),
            netRegexFr: NetRegexes.startsUsing({ id: '1955', source: 'Strix', capture: false }),
            netRegexJa: NetRegexes.startsUsing({ id: '1955', source: 'ストリックス', capture: false }),
            netRegexCn: NetRegexes.startsUsing({ id: '1955', source: '博学林鸮', capture: false }),
            netRegexKo: NetRegexes.startsUsing({ id: '1955', source: '스트릭스', capture: false }),
            response: Responses.aoe(),
        },
        {
            id: 'Gubal Hard Ecliptic Meteor',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '195D', source: 'Behemoth Ward', capture: false }),
            netRegexDe: NetRegexes.startsUsing({ id: '195D', source: 'Buch-Behemoth', capture: false }),
            netRegexFr: NetRegexes.startsUsing({ id: '195D', source: 'Béhémoth Conjuré', capture: false }),
            netRegexJa: NetRegexes.startsUsing({ id: '195D', source: 'ベヒーモス・ワード', capture: false }),
            netRegexCn: NetRegexes.startsUsing({ id: '195D', source: '贝希摩斯护卫', capture: false }),
            netRegexKo: NetRegexes.startsUsing({ id: '195D', source: '고서의 베히모스', capture: false }),
            delaySeconds: 14,
            alertText: (_data, _matches, output) => output.text(),
            outputStrings: {
                text: {
                    en: 'Hide behind boulder',
                    de: 'Hinter dem Brocken verstecken',
                    fr: 'Cachez-vous derrière le rocher',
                    ja: 'メテオの後ろに',
                    cn: '站在陨石后',
                    ko: '운석 뒤에 숨기',
                },
            },
        },
    ],
    timelineReplace: [
        {
            'locale': 'de',
            'replaceSync': {
                'Behemoth Ward': 'Buch-Behemoth',
                'Demon of the Tome': 'Bücherdämon',
                'Liquid Flame': 'flüssig(?:e|er|es|en) Flamme',
                'Mechanoscribe': 'Mechanoscholar',
                'Meteor': 'Meteor',
                'Middle Shelf Tome': 'Pappband',
                'Strix': 'Strix',
                'The Astrology and Astromancy Camera': 'Astrologische und Astronomische Gewölbe',
                'The Hall of Magicks': 'Halle der Magie',
                'The Rare Tomes Room': 'Abteilung für seltene Schriften',
                'Top Shelf Tome': 'Prachtband',
            },
            'replaceText': {
                '\\(buster\\)': '(Tankbuster)',
                'Bibliocide': 'Bibliozid',
                'Book Drop': 'Buch fällt',
                'Check Out': 'Anthologie',
                'Discontinue': 'Druck einstellen',
                'Ecliptic Meteor': 'Ekliptik-Meteor',
                'Folio': 'Foliant',
                'Form Shift': 'Formwechsel',
                'Frightful Roar': 'Furchtbares Brüllen',
                'Hand/Tornado': 'Hand/Tornado',
                'Issue': 'Publizieren',
                'Magnetism': 'Magnetismus',
                'Meteor Impact': 'Meteoreinschlag',
                'Properties Of Darkness': 'Theorie der Dunkelung',
                'Properties Of Imps': 'Über Flusskobolde',
                'Properties Of Quakes': 'Theorie des Seisga',
                'Properties Of Thunder III': 'Theorie des Blitzga',
                'Properties Of Tornados': 'Theorie des Tornado',
                'Quakes/Tornados': 'Seisga/Tornados',
                'Repel': 'Abstoßung',
                'Sea Of Flames': 'Flammenmeer',
                'Seal Of Night And Day': 'Siegel',
                'Searing Wind': 'Versengen',
                'Slosh': 'Durchbläuen',
                'Triclip': 'Dreischnitt',
            },
        },
        {
            'locale': 'fr',
            'replaceSync': {
                'Behemoth Ward': 'Béhémoth conjuré',
                'Demon of the Tome': 'Démon du Tome',
                'Liquid Flame': 'Flamme liquide',
                'Mechanoscribe': 'Mécano-scribe',
                'Meteor': 'Météore',
                'Middle Shelf Tome': 'Livre broché',
                'Strix': 'Strix',
                'The Astrology and Astromancy Camera': 'dôme d\'astrologie et d\'astromancie',
                'The Hall of Magicks': 'puits des magies',
                'The Rare Tomes Room': 'dôme des manuscrits rares',
                'Top Shelf Tome': 'Livre relié',
            },
            'replaceText': {
                '\\?': ' ?',
                'Bibliocide': 'Bibliocide',
                'Book Drop': 'Laché de livre',
                'Check Out': 'Anthologie',
                'Discontinue': 'Arrêt de publication',
                'Ecliptic Meteor': 'Météore écliptique',
                'Folio': 'Réimpression',
                'Form Shift': 'Glissement de posture',
                'Frightful Roar': 'Rugissement effroyable',
                'Hand/Tornado': 'Main/Tornade',
                'Issue': 'Publication',
                'Magnetism/Repel': 'Attraction/Répulsion',
                'Meteor Impact': 'Impact de météore',
                'Properties Of Darkness II': 'Propriétés d\'Extra Obscurité',
                'Properties Of Darkness(?! II)': 'Propriétés d\'Obscurité',
                'Properties Of Imps': 'Propriétés de Coup du kappa',
                'Properties Of Quakes': 'Propriétés de Méga Séisme',
                'Properties Of Thunder III': 'Propriétés de Méga Foudre',
                'Properties Of Tornados': 'Propriétés de Tornade',
                'Quakes/Tornados': 'Séismes/Tornades',
                'Sea Of Flames': 'Mer de flammes',
                'Seal Of Night And Day': 'Gravure',
                'Searing Wind': 'Carbonisation',
                'Slosh': 'Ruée',
                'Triclip': 'Triclip',
            },
        },
        {
            'locale': 'ja',
            'replaceSync': {
                'Behemoth Ward': 'ベヒーモス・ワード',
                'Demon of the Tome': 'デモン・オブ・トーム',
                'Liquid Flame': 'リクイドフレイム',
                'Mechanoscribe': 'メカノスクライブ',
                'Meteor': 'メテオ',
                'Middle Shelf Tome': '並製本',
                'Strix': 'ストリックス',
                'The Astrology and Astromancy Camera': '占星学研究室',
                'The Hall of Magicks': '魔書の翼廊',
                'The Rare Tomes Room': '思想稀覯書庫',
                'Top Shelf Tome': '上製本',
            },
            'replaceText': {
                '\\(buster\\)': '(バスター)',
                'Bibliocide': '火炎',
                'Book Drop': '本落下',
                'Check Out': '選書',
                'Discontinue': '廃刊',
                'Ecliptic Meteor': 'エクリプスメテオ',
                'Folio': '重版',
                'Form Shift': '演武',
                'Frightful Roar': 'フライトフルロア',
                'Hand/Tornado': '手/竜卷',
                'Issue': '刊行',
                'Magnetism': '磁力',
                'Meteor Impact': 'メテオインパクト',
                'Properties Of Darkness II': 'ダークラの章',
                'Properties Of Darkness(?! II)': 'ダークの章',
                'Properties Of Imps': 'カッパの章',
                'Properties Of Quakes': 'クエイガの章',
                'Properties Of Thunder III': 'サンダガの章',
                'Properties Of Tornados': 'トルネドの章',
                'Quakes/Tornados': 'クエイガの章/トルネドの章',
                'Repel': '反発',
                'Sea Of Flames': 'シー・オブ・フレイム',
                'Seal Of Night And Day': '刻印',
                'Searing Wind': '熱風',
                'Slosh': '突進',
                'Triclip': 'トライクリップ',
            },
        },
        {
            'locale': 'cn',
            'replaceSync': {
                'Behemoth Ward': '贝希摩斯护卫',
                'Demon of the Tome': '书中恶魔',
                'Liquid Flame': '液态火焰',
                'Mechanoscribe': '自走人偶抄写员',
                'Meteor': '陨石',
                'Middle Shelf Tome': '平装本',
                'Strix': '博学林鸮',
                'The Astrology and Astromancy Camera': '占星学研究室',
                'The Hall of Magicks': '魔书翼廊',
                'The Rare Tomes Room': '思想珍秘书库',
                'Top Shelf Tome': '精装本',
            },
            'replaceText': {
                '\\?': ' ?',
                'Bibliocide': '焚书',
                'Book Drop': '书落下',
                'Check Out': '选集',
                'Discontinue': '停刊',
                'Ecliptic Meteor': '黄道陨石',
                'Folio': '再版',
                'Form Shift': '演武',
                'Frightful Roar': '骇人嚎叫',
                'Hand/Tornado': '手/龙卷',
                'Issue': '发行',
                'Magnetism/Repel': '磁力/相斥',
                'Meteor Impact': '陨石冲击',
                'Properties Of Darkness II': '昏暗之章',
                'Properties Of Darkness(?! II)': '黑暗之章',
                'Properties Of Imps': '河童之章',
                'Properties Of Quakes': '爆震之章',
                'Properties Of Thunder III': '暴雷之章',
                'Properties Of Tornados': '龙卷之章',
                'Quakes/Tornados': '爆震/龙卷',
                'Sea Of Flames': '火海',
                'Seal Of Night And Day': '刻印',
                'Searing Wind': '热风',
                'Slosh': '突进',
                'Triclip': '三连爪',
            },
        },
        {
            'locale': 'ko',
            'missingTranslations': true,
            'replaceSync': {
                'Behemoth Ward': '고서의 베히모스',
                'Demon of the Tome': '고서의 악마',
                'Liquid Flame': '액체 불꽃',
                'Mechanoscribe': '기계 서기',
                'Meteor': '메테오',
                'Middle Shelf Tome': '문고본',
                'Strix': '스트릭스',
                'The Astrology and Astromancy Camera': '점성학 연구실',
                'The Hall of Magicks': '악마서 복도',
                'The Rare Tomes Room': '사상희귀서고',
                'Top Shelf Tome': '양장본',
            },
            'replaceText': {
                'Bibliocide': '화염',
                'Book Drop': '책 떨어짐',
                'Check Out': '도서 선정',
                'Discontinue': '폐간',
                'Ecliptic Meteor': '황도 메테오',
                'Folio': '증쇄',
                'Form Shift': '연무',
                'Frightful Roar': '끔찍한 포효',
                'Hand/Tornado': '손/토네이도',
                'Issue': '간행',
                'Magnetism': '자력',
                'Meteor Impact': '운석 낙하',
                'Properties Of Darkness': '다크의 장',
                'Properties Of Imps': '물요정의 장',
                'Properties Of Quakes': '퀘이가의 장',
                'Properties Of Thunder III': '선더가의 장',
                'Properties Of Tornados': '토네이도의 장',
                'Repel': '반발',
                'Sea Of Flames': '화염의 바다',
                'Seal Of Night And Day': '각인',
                'Searing Wind': '열풍',
                'Slosh': '돌진',
                'Triclip': '삼단베기',
                'Quakes/Tornados': '퀘이가/토네이도',
            },
        },
    ],
});