import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString().replace(/\r/g,'')
const disk = input.split('').map( (val, idx) => {
  return {
    isFile: idx%2==0,
    fileId: idx/2,
    nBlocks: Number(val)
  }
})

function d(){
  return
  console.log(disk.map(file=> {
    if(file.isFile)
    return (new Array(file.nBlocks).fill(file.fileId)).join('')
      else 
    return (new Array(file.nBlocks).fill('.')).join('')
  }).join(''))
}

d();
// -------------
//    ^j      ^i
for(let i=disk.length-1; i>0; i--) {
  if(i >= disk.length) continue; // don't think this can happen actually?
  if(disk[i].isFile) {
    // try to move
    for(let j=0; j < disk.length; j++) {
      if(j >= i) break
      if(!disk[j].isFile && disk[i].nBlocks <= disk[j].nBlocks) {
        // chance of adding an "empty" space here and that's ok.
        disk.splice(j, 1, 
          _.clone(disk[i]),
          {isFile:false, nBlocks:disk[j].nBlocks - disk[i].nBlocks}
        ) 
        // you added net one element so you need to move i up
        i++
        disk[i].isFile = false
        break
      }
    }
    d();
  }
}

let blockId = 0
let total = 0
for(let i = 0; i < disk.length; i++) {
  for(let j = 0; j < disk[i].nBlocks; j++) {
    if(disk[i].isFile) {
      total += disk[i].fileId * blockId++
    } else {
      blockId++
    }
  }
}
console.log(total)