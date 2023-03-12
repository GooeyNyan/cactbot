Options.Triggers.push({
  zoneId: ZoneId.EurekaOrthosFloors51_60,
  triggers: [
    // ---------------- Floor 51-59 Mobs ----------------
    {
      id: 'EO 51-60 Orthos Ice Sprite Hypothermal Combustion',
      // explodes in a letal PBAoE after death
      type: 'StartsUsing',
      netRegex: { id: '7EF0', source: 'Orthos Ice Sprite', capture: false },
      response: Responses.getOut(),
    },
    {
      id: 'EO 51-60 Orthos Ymir Gelid Charge',
      // gains Ice Spikes (C6), lethal counterattack when hit with physical damage
      type: 'StartsUsing',
      netRegex: { id: '819C', source: 'Orthos Ymir' },
      response: Responses.stunIfPossible(),
    },
    {
      id: 'EO 51-60 Orthos Ymir Ice Spikes Gain',
      // C6 = Ice Spikes, lethal counterattack damage when hit with physical damage
      type: 'GainsEffect',
      netRegex: { effectId: 'C6', target: 'Orthos Ymir' },
      alertText: (_data, matches, output) => output.text({ target: matches.target }),
      outputStrings: {
        text: {
          en: 'Stop attacking ${target}',
          de: 'Stoppe Angriffe auf ${target}',
          cn: '停止攻击 ${target}',
          ko: '${target} 공격 중지',
        },
      },
    },
    {
      id: 'EO 51-60 Orthos Rockfin Aqua Spear',
      // lethal line charge AoE; can break line-of-sight to avoid
      type: 'StartsUsing',
      netRegex: { id: '7EF4', source: 'Orthos Rockfin' },
      condition: Conditions.targetIsYou(),
      alertText: (_data, matches, output) => output.text({ name: matches.source }),
      outputStrings: {
        text: {
          en: 'Break line-of-sight to ${name}',
        },
      },
    },
    {
      id: 'EO 51-60 Orthos Big Claw Crab Dribble',
      type: 'StartsUsing',
      netRegex: { id: '7EE5', source: 'Orthos Big Claw', capture: false },
      response: Responses.goFront(),
    },
    {
      id: 'EO 51-60 Orthos Zaratan Sewer Water Back First',
      type: 'StartsUsing',
      netRegex: { id: '7EEB', source: 'Orthos Zaratan', capture: false },
      response: Responses.getBackThenFront('alert'),
    },
    {
      id: 'EO 51-60 Orthos Zaratan Sewer Water Front First',
      type: 'StartsUsing',
      netRegex: { id: '7EEC', source: 'Orthos Zaratan', capture: false },
      response: Responses.getFrontThenBack('alert'),
    },
    {
      id: 'EO 51-60 Orthos Stingray Expulsion',
      type: 'StartsUsing',
      netRegex: { id: '81A1', source: 'Orthos Stingray', capture: false },
      response: Responses.getOut(),
    },
    {
      id: 'EO 51-60 Orthos Stingray Electric Whorl',
      type: 'StartsUsing',
      netRegex: { id: '81A2', source: 'Orthos Stingray', capture: false },
      response: Responses.getUnder('alert'),
    },
    // ---------------- Floor 60 Boss: Servomechanical Minotaur 16 ----------------
    {
      id: 'EO 51-60 Servomechanical Minotaur 16 Bullish Swipe',
      type: 'StartsUsing',
      netRegex: { id: '801B', source: 'Servomechanical Minotaur 16', capture: false },
      response: Responses.awayFromFront(),
    },
    {
      id: 'EO 51-60 Servomechanical Minotaur 16 Bullish Swing',
      type: 'StartsUsing',
      netRegex: { id: '7C83', source: 'Servomechanical Minotaur 16', capture: false },
      response: Responses.getOut(),
    },
    {
      id: 'EO 51-60 Servomechanical Minotaur 16 Disorienting Groan',
      // knockback, will push all the way into damage wall if not under boss
      type: 'StartsUsing',
      netRegex: { id: '7C84', source: 'Servomechanical Minotaur 16', capture: false },
      response: Responses.getUnder('alert'),
    },
    {
      id: 'EO 51-60 Servomechanical Minotaur 16 Octuple Swipe Cleanup',
      type: 'StartsUsing',
      netRegex: { id: '7C80', source: 'Servomechanical Minotaur 16', capture: false },
      run: (data) => {
        delete data.octupleSwipes;
        delete data.calledOctupleSwipes;
      },
    },
    {
      id: 'EO 51-60 Servomechanical Minotaur 16 Octuple Swipe',
      type: 'Ability',
      netRegex: { id: '7C7B', source: 'Servomechanical Minotaur 16' },
      condition: (data) => !data.calledOctupleSwipes,
      durationSeconds: 10,
      alertText: (data, matches, output) => {
        // convert the heading into 0=N, 1=E, 2=S, 3=W
        const heading = Math.round(2 - 2 * parseFloat(matches.heading) / Math.PI) % 4;
        data.octupleSwipes ??= [];
        data.octupleSwipes.push(heading);
        if (data.octupleSwipes.length <= 4)
          return;
        data.calledOctupleSwipes = true;
        if (data.octupleSwipes[0] === data.octupleSwipes[4])
          // swipe order is Front > Back > Right > Left > Front > Back > Right > Left
          return output.text({
            dir1: output.left(),
            dir2: output.front(),
            dir3: output.left(),
            dir4: output.front(),
          });
        if (data.octupleSwipes[3] === data.octupleSwipes[4])
          // swipe order is Front > Back > Right > Left > Left > Right > Back > Front
          return output.text({
            dir1: output.left(),
            dir2: output.front(),
            dir3: output.front(),
            dir4: output.left(),
          });
        // something went wrong
        data.calledOctupleSwipes = false;
        return;
      },
      outputStrings: {
        front: Outputs.front,
        left: Outputs.left,
        text: {
          en: '${dir1} > ${dir2} > ${dir3} > ${dir4}',
          de: '${dir1} > ${dir2} > ${dir3} > ${dir4}',
          fr: '${dir1} > ${dir2} > ${dir3} > ${dir4}',
          ja: '${dir1} > ${dir2} > ${dir3} > ${dir4}',
          cn: '${dir1} > ${dir2} > ${dir3} > ${dir4}',
          ko: '${dir1} > ${dir2} > ${dir3} > ${dir4}',
        },
      },
    },
    {
      id: 'EO 51-60 Servomechanical Minotaur 16 Thundercall',
      type: 'StartsUsing',
      netRegex: { id: '7C81', source: 'Servomechanical Minotaur 16', capture: false },
      response: Responses.aoe(),
    },
  ],
});
