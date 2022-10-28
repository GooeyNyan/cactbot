Options.Triggers.push({
    zoneId: ZoneId.TheTempleOfTheFist,
    timelineFile: 'temple_of_the_fist.txt',
    timelineTriggers: [
        {
            id: 'Temple Pounce',
            regex: /Pounce/,
            beforeSeconds: 5,
            response: Responses.tankBuster(),
        },
        {
            id: 'Temple Cardinal Shift',
            regex: /Cardinal Shift/,
            beforeSeconds: 5,
            response: Responses.aoe(),
        },
    ],
    triggers: [
        {
            id: 'Temple Electric Burst Sruti',
            type: 'StartsUsing',
            netRegex: { id: '1FD6', source: 'Coeurl Sruti', capture: false },
            response: Responses.aoe(),
        },
        {
            id: 'Temple Electric Burst Smriti',
            type: 'StartsUsing',
            netRegex: { id: '1FD6', source: 'Coeurl Smriti', capture: false },
            response: Responses.aoe(),
        },
        {
            id: 'Temple Fourfold Shear',
            type: 'StartsUsing',
            netRegex: { id: '1FD9', source: 'Arbuda' },
            response: Responses.tankBuster(),
        },
        {
            id: 'Temple Moonseal',
            type: 'HeadMarker',
            netRegex: { id: '0059' },
            condition: Conditions.targetIsYou(),
            infoText: (_data, _matches, output) => output.text(),
            outputStrings: {
                text: {
                    en: 'Stand in blue',
                    de: 'Im Blauen stehen',
                    fr: 'Placez-vous dans le bleu',
                    ja: '青色を踏む',
                    cn: '站在蓝色区域',
                    ko: '파랑장판에 서기',
                },
            },
        },
        {
            id: 'Temple Sunseal',
            type: 'HeadMarker',
            netRegex: { id: '0058' },
            condition: Conditions.targetIsYou(),
            infoText: (_data, _matches, output) => output.text(),
            outputStrings: {
                text: {
                    en: 'Stand in red',
                    de: 'Im Roten stehen',
                    fr: 'Placez-vous dans le rouge',
                    ja: '赤色を踏む',
                    cn: '站在红色区域',
                    ko: '빨강장판에 서기',
                },
            },
        },
        {
            id: 'Temple Port And Star',
            type: 'StartsUsing',
            netRegex: { id: '1FDC', source: 'Arbuda', capture: false },
            response: Responses.goFrontBack(),
        },
        {
            id: 'Temple Fore And Aft',
            type: 'StartsUsing',
            netRegex: { id: '1FDB', source: 'Arbuda', capture: false },
            response: Responses.goSides(),
        },
        {
            id: 'Temple Killer Instinct',
            type: 'StartsUsing',
            netRegex: { id: '1FDE', source: 'Arbuda', capture: false },
            alertText: (_data, _matches, output) => output.text(),
            outputStrings: {
                text: {
                    en: 'watch for safe',
                    de: 'nach sicherer Position schauen',
                    fr: 'Trouvez une zone safe',
                    ja: '安置へ',
                    cn: '前往安全区',
                    ko: '안전지대 찾기',
                },
            },
        },
        {
            id: 'Temple Spirit Wave',
            type: 'StartsUsing',
            netRegex: { id: '1FE7', source: 'Ivon Coeurlfist', capture: false },
            response: Responses.aoe(),
        },
        {
            id: 'Temple Touch Of Slaughter',
            type: 'StartsUsing',
            netRegex: { id: '1FE6', source: 'Ivon Coeurlfist' },
            condition: (data) => data.role === 'healer',
            infoText: (data, matches, output) => output.text({ player: data.ShortName(matches.target) }),
            outputStrings: {
                text: {
                    en: 'Heal ${player} soon',
                    de: 'Bald ${player} heilen',
                    fr: 'Soignez ${player} bientôt',
                    ja: 'すぐに${player}をヒール',
                    cn: '马上奶 ${player}',
                    ko: '${player}힐 준비',
                },
            },
        },
        {
            id: 'Temple Coeurl Heads',
            type: 'Ability',
            netRegex: { id: '1FE9', source: 'Ivon Coeurlfist', capture: false },
            infoText: (_data, _matches, output) => output.text(),
            outputStrings: {
                text: {
                    en: 'Avoid floating heads',
                    de: 'Weiche den fliegenden Köpfen aus',
                    fr: 'Évitez les têtes flottantes',
                    ja: 'ヘッドを避ける',
                    cn: '避开漂浮的头',
                    ko: '커얼머리 피하기',
                },
            },
        },
        {
            id: 'Temple Rhalgr\'s Piece',
            type: 'StartsUsing',
            netRegex: { id: '1FED', source: 'Ivon Coeurlfist', capture: false },
            infoText: (_data, _matches, output) => output.text(),
            outputStrings: {
                text: {
                    en: 'Away from marker',
                    de: 'Weg von den Markierungen',
                    fr: 'Éloignez-vous du marqueur',
                    ja: 'マーカーから離れる',
                    cn: '远离标记',
                    ko: '마커에게서 멀어지기',
                },
            },
        },
        {
            id: 'Temple Rose Of Destruction',
            type: 'StartsUsing',
            netRegex: { id: '1FEE', source: 'Ivon Coeurlfist' },
            response: Responses.stackMarkerOn(),
        },
    ],
    timelineReplace: [
        {
            'locale': 'de',
            'replaceSync': {
                'Arbuda': 'Arbuda',
                'Coeurl Smriti': 'Coeurl Smriti',
                'Coeurl Sruti': 'Coeurl Sruti',
                'Guidance': 'Unterweisung',
                'Harmony': 'Harmonie',
                'Ivon Coeurlfist': 'Ivon Coeurlfaust',
                'Tourmaline Pond': 'Turmalinteich',
            },
            'replaceText': {
                '--Smriti Appears--': '--Smriti erscheint--',
                'Basic Instinct': 'Kampfinstinkt',
                'Cardinal Shift': 'Großrotation',
                'Coeurl Whisper': 'Coeurl-Flüstern',
                'Electric Burst': 'Stromstoß',
                'Fourfold Shear': 'Vierschere',
                'Front/Back\\?Sides\\?': 'Vorne/Hinten?Seiten?',
                'Furious Fists': 'Todeskralle',
                'Heat Lightning': 'Hitzeblitz',
                'Hellseal': 'Höllensiegel',
                'Hurricane Kick': 'Hurrikan-Tritt',
                'Impact': 'Einschlag',
                'Killer Instinct': 'Vorausahnung',
                'Pounce': 'Raubtiertatze',
                'Radial Blaster': 'Radial-Blaster',
                'Rhalgr\'s Piece': 'Gewalt des Zerstörers',
                'Silent Roar': 'Stilles Brüllen',
                'Spirit Wave': 'Mentale Welle',
                'Tapas': 'Kasteiung',
                'The Rose Of Destruction': 'Zermalmender Geist',
                'Touch of Slaughter': 'Hauch des Gemetzels',
                'Wide Blaster': 'Weitwinkel-Blaster',
            },
        },
        {
            'locale': 'fr',
            'replaceSync': {
                'Arbuda': 'Arbuda',
                'Coeurl Smriti': 'Coeurl smriti',
                'Coeurl Sruti': 'Coeurl sruti',
                'Guidance': 'la Conduite',
                'Harmony': 'l\'Harmonie',
                'Ivon Coeurlfist': 'Ivon le Coeurl',
                'Tourmaline Pond': 'l\'étang de Tourmaline',
            },
            'replaceText': {
                '--Smriti Appears--': '-- Apparition de Smriti --',
                'Basic Instinct': 'Instinct profond',
                'Cardinal Shift': 'Rotation cardinale',
                'Coeurl Whisper': 'Murmure du Coeurl',
                'Electric Burst': 'Salve électrique',
                'Fourfold Shear': 'Quadruple cisaille',
                'Front/Back\\?Sides\\?': 'Devant/Derrière ? Côtés ?',
                'Furious Fists': 'Poings furieux',
                'Heat Lightning': 'Éclair de chaleur',
                'Hellseal': 'Sceau infernal',
                'Hurricane Kick': 'Coup de pied ouragan',
                'Impact': 'Impact',
                'Killer Instinct': 'Instinct meurtrier',
                'Pounce': 'Attaque subite',
                'Radial/Wide Blaster': 'Fulguration radiale/large',
                'Radial Blaster': 'Fulguration radiale',
                'Rhalgr\'s Piece': 'Force de Rhalgr',
                'Silent Roar': 'Hurlement silencieux',
                'Spirit Wave': 'Onde spirituelle',
                'Tapas': 'Tapas',
                'The Rose Of Destruction': 'Rose de la destruction',
                'Touch of Slaughter': 'Toucher massacreur',
                '(?<!Radial/)Wide Blaster': 'Fulguration large',
            },
        },
        {
            'locale': 'ja',
            'replaceSync': {
                'Arbuda': 'アブダ',
                'Coeurl Smriti': 'クァール・スムリティ',
                'Coeurl Sruti': 'クァール・シュルティ',
                'Guidance': '導霊殿',
                'Harmony': '陰陽苑',
                'Ivon Coeurlfist': '双豹のイヴォン',
                'Tourmaline Pond': '水苔池',
            },
            'replaceText': {
                '--Smriti Appears--': '--雑魚: スムリティ--',
                'Basic Instinct': '闘争本能',
                'Cardinal Shift': '四剣大回転',
                'Coeurl Whisper': '双豹招来',
                'Electric Burst': 'エレクトリックバースト',
                'Fourfold Shear': '四連双斬',
                'Front/Back\\?Sides\\?': '縦? 横?',
                'Furious Fists': '双豹蒼連撃',
                'Heat Lightning': 'ヒートライトニング',
                'Hellseal': '試練の刻印',
                'Hurricane Kick': '霊魂旋風脚',
                'Impact': 'ラールガーズインパクト',
                'Killer Instinct': '見切り',
                'Pounce': 'パウンス',
                'Radial Blaster': 'ラディアルブラスター',
                'Rhalgr\'s Piece': '壊神拳',
                'Silent Roar': '双豹撃',
                'Spirit Wave': '真霊波',
                'Tapas': '苦行',
                'The Rose Of Destruction': '闘霊弾',
                'Touch of Slaughter': '霊魂秘孔拳',
                'Wide Blaster': 'ワイドブラスター',
            },
        },
        {
            'locale': 'cn',
            'replaceSync': {
                'Arbuda': '额部陀',
                'Coeurl Smriti': '凶豹所忆',
                'Coeurl Sruti': '凶豹所闻',
                'Guidance': '导灵殿',
                'Harmony': '阴阳苑',
                'Ivon Coeurlfist': '双豹伊沃恩',
                'Tourmaline Pond': '水苔池',
            },
            'replaceText': {
                '--Smriti Appears--': '--凶豹出现--',
                'Basic Instinct': '斗争本能',
                'Cardinal Shift': '四剑大回旋',
                'Coeurl Whisper': '双豹招来',
                'Electric Burst': '电光爆发',
                'Fourfold Shear': '四连双斩',
                'Front/Back\\?Sides\\?': '前/后?两侧?',
                'Furious Fists': '双豹苍连击',
                'Heat Lightning': '惊电',
                'Hellseal': '试炼刻印',
                'Hurricane Kick': '灵魂旋风脚',
                'Impact': '拉尔戈冲击',
                'Killer Instinct': '预判',
                'Pounce': '爪袭',
                'Radial Blaster': '放射冲击波',
                'Rhalgr\'s Piece': '破坏神拳',
                'Silent Roar': '双豹击',
                'Spirit Wave': '真灵波',
                'Tapas': '苦行',
                'The Rose Of Destruction': '斗灵弹',
                'Touch of Slaughter': '灵魂秘孔拳',
                'Wide Blaster': '广域冲击波',
            },
        },
        {
            'locale': 'ko',
            'replaceSync': {
                'Arbuda': '아부다',
                'Coeurl Smriti': '커얼 스므리티',
                'Coeurl Sruti': '커얼 슈루티',
                'Guidance': '도령전',
                'Harmony': '음양원',
                'Ivon Coeurlfist': '쌍표범 이본',
                'Tourmaline Pond': '물이끼 연못',
            },
            'replaceText': {
                '--Smriti Appears--': '--스므리티 등장--',
                'Basic Instinct': '투쟁 본능',
                'Cardinal Shift': '사중 대회전',
                'Coeurl Whisper': '쌍표범 소환',
                'Electric Burst': '전하 폭발',
                'Fourfold Shear': '사연속 베기',
                'Front/Back\\?Sides\\?': '앞/뒤? 양옆?',
                'Furious Fists': '쌍표창연격',
                'Heat Lightning': '뜨거운 번개',
                'Hellseal': '시련의 각인',
                'Hurricane Kick': '영혼의 선풍각',
                'Impact': '랄거의 충격',
                'Killer Instinct': '간파',
                'Pounce': '덮치기',
                'Radial Blaster': '방사형 블래스터',
                'Rhalgr\'s Piece': '파신권',
                'Silent Roar': '쌍표격',
                'Spirit Wave': '진령파',
                'Tapas': '고행',
                'The Rose Of Destruction': '투령탄',
                'Touch of Slaughter': '영혼의 혈도 찌르기',
                'Wide Blaster': '광범위 블래스터',
            },
        },
    ],
});
