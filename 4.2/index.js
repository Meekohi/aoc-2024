import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString()
const puz = input.split('\n').map(r => r.replace('\r','').trim().split(''))

function checkWord(x,y) {
   if(x-1 < 0 || y-1 < 0 || x+1 >= puz[y].length || y+1 >= puz.length) return false
   
   if(puz[y][x] !== 'A') return false

   if(puz[y-1][x-1] == 'M' && puz[y+1][x+1] != 'S') return false
   if(puz[y-1][x-1] == 'S' && puz[y+1][x+1] != 'M') return false
   if(puz[y+1][x-1] == 'M' && puz[y-1][x+1] != 'S') return false
   if(puz[y+1][x-1] == 'S' && puz[y-1][x+1] != 'M') return false

   if(puz[y-1][x-1] == 'X' || puz[y-1][x-1] == 'A') return false
   if(puz[y-1][x+1] == 'X' || puz[y-1][x+1] == 'A') return false
   if(puz[y+1][x-1] == 'X' || puz[y+1][x-1] == 'A') return false
   if(puz[y+1][x+1] == 'X' || puz[y+1][x+1] == 'A') return false

   return true
}

let output = 0
for(let y = 0; y < puz.length; y++) {
   for(let x = 0; x < puz[y].length; x++) {
      if(checkWord(x,y)) output++
   }
}

console.log(output) // 2322 too high

