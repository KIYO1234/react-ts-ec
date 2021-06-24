import React from 'react'

export const toArray = <T, U>(arg1: T, arg2: U): (T | U)[] => [arg1, arg2];
console.log(toArray(8, 3))

console.log(toArray('こんにちは', 'ジョン'))
console.log(toArray( 'ジョン', 1000))

// type Resident = {
//     familyName: string;
//     lastName: string;
//     mom?: Resident;
// }

// const getMomName = (resident: Resident): string => resident.mom.lastName;