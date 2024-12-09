import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString().replace(/\r/g,'')
const disk = input.split('').map(Number)

console.log(disk)

let total = 0
let blockIdx = 0

for(let i = 0; i < disk.length; i++) {
  if(i % 2 == 0) {
    const nBlocks = disk[i]
    const fileIdx = i/2
    
    // sum of blockIdx to blockIdx+nBlocks
    for(let b = 0; b < nBlocks; b++) {
      console.log(blockIdx, '*' , fileIdx)
      total += fileIdx * blockIdx++
    }
    continue
  } else {
    // while the gap has room...
    while(disk[i] > 0) {
      if(disk[disk.length-1] == 0) {
        disk.pop()
        continue
      }
      // remove empty space from end
      if(disk.length % 2 == 0) {
        disk.pop()
        continue
      }

      while(disk[disk.length-1] > 0 && disk[i] > 0) {
        const fileIdx = (disk.length-1)/2
        disk[disk.length-1]--
        disk[i]--
        console.log(blockIdx, '*' , fileIdx)
        total += fileIdx * blockIdx++
      }
    }
  }
}

console.log(total)