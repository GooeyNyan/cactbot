import { UnreachableCode } from '../../../resources/not_reached';
import {
  badSpots,
  findDragonMarks,
  modDistance,
} from '../data/04-sb/ultimate/unending_coil_ultimate';

// TODO: move this into test, use mocha and chai instead of console.assert.

const testModDistance = () => {
  for (let i = 0; i < 8; ++i) {
    for (let j = -4; j <= 4; ++j) {
      
      
    }
  }
};
testModDistance();

const testBadSpots = () => {
  const equals = function(a: [number, number, number], b: number[]) {
    a.sort();
    b.sort();
    if (a.length !== b.length)
      return false;
    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i])
        return false;
    }
    return true;
  };

  // 1 away dragons
  for (let i = 0; i < 8; ++i) {
    const before = (i - 1 + 8) % 8;
    const after = (i + 1) % 8;
    
    
  }

  // 2 away dragons
  for (let i = 0; i < 8; ++i) {
    const before2 = (i - 2 + 8) % 8;
    const before1 = (i - 1 + 8) % 8;
    const after1 = (i + 1) % 8;
    const after2 = (i + 2) % 8;
    
    
  }
};
testBadSpots();

const testFindDragonMarks = (array: number[], output: ReturnType<typeof findDragonMarks>) => {
  if (!output) {
    
    return;
  }
  const marks = output.marks;
  const dragons = [];
  for (let i = 0; i < 8; ++i) {
    if (array[i])
      dragons.push(i);
  }
  

  
  for (const mark of marks) {
    
    
  }

  const [mark0, mark1, mark2] = marks;
  if (mark0 === undefined || mark1 === undefined || mark2 === undefined)
    throw new UnreachableCode();

  const [dragon0, dragon1, dragon2, dragon3, dragon4] = dragons;
  if (
    dragon0 === undefined || dragon1 === undefined || dragon2 === undefined ||
    dragon3 === undefined || dragon4 === undefined
  )
    throw new UnreachableCode();

  // Marks can't be in front of their dragons.
  
  
  
  
  

  // Marks can also be at most two away from a dragon except for one
  // tricksy edge case on dragon 3 where it can be three away.
  
  
  
  if (output.wideThirdDive)
    
  else
    

  

  const bad0 = badSpots(mark0, dragon0).concat(badSpots(mark0, dragon1));
  const bad1 = badSpots(mark1, dragon2);

  // First set of dragons should not cover second mark.
  
  // Second set of dragons should not cover third mark.
  

  // Verify unsafe third mark.
  if (output.unsafeThirdMark)
    
  else
    
};

let total = 0;
for (let i = 0; i < 256; ++i) {
  const array = [
    i & 0x80 ? 1 : 0,
    i & 0x40 ? 1 : 0,
    i & 0x20 ? 1 : 0,
    i & 0x10 ? 1 : 0,
    i & 0x08 ? 1 : 0,
    i & 0x04 ? 1 : 0,
    i & 0x02 ? 1 : 0,
    i & 0x01 ? 1 : 0,
  ];
  let count = 0;
  for (const arrValue of array)
    count += arrValue;

  if (count !== 5)
    continue;

  console.log(array);
  const output = findDragonMarks(array);
  console.log(output);
  testFindDragonMarks(array, output);
  ++total;
}

// 8 choose 5 == 56

