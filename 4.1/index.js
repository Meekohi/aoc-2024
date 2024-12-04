import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString()
const puz = input.split('\n').map(r => r.split(''))

const dirs = [[-1, -1], [-1, 0], [-1, 1],
              [0, -1] , [0, 1],
              [1, -1], [1, 0], [1, 1]]

// self overlap isn't possible since every letter is different
const word = 'XMAS'.split('')

function checkWord(x,y,dir) {
   for(let i = 0; i < word.length; i++) {
      const nx = x + dir[0] * i
      const ny = y + dir[1] * i
      if(nx < 0 || ny < 0 || nx >= puz[0].length || ny >= puz.length) {
         return false
      }
      if(puz[ny][nx] !== word[i]) {
         return false
      }
   }
   return true
}

let output = 0
for(let y = 0; y < puz.length; y++) {
   for(let x = 0; x < puz[y].length; x++) {
      for(const dir of dirs) {
         if(checkWord(x,y,dir)) {
            output++
         }
      }
   }
}

console.log(output)

