import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString().replace(/\r/g,'')
const puz = input.split('\n').map(e => e.split(''))

let guard = {x:0,y:0}
let dir = {x:0,y:-1} // up
for(const y in puz) {
   for(const x in puz[y]) {
      if(puz[y][x] == '^') {
         guard = {x:Number(x),y:Number(y)}
         puz[y][x] = 'x'
      }
   }
}

console.log(guard)

function bounds(x,y) {
   return x >= 0 && y >= 0 && y < puz.length && x < puz[0].length
}

while(true) {
   const x = guard.x+dir.x
   const y = guard.y+dir.y

   if(!bounds(x,y) ) {
      console.log(x,y,'out of bounds')
      break
   }

   if(puz[y][x] == '#') {
      // turn right
      if(dir.x == 0 && dir.y == -1) {
         dir = {x:1,y:0} // right
      } else if(dir.x == 1 && dir.y == 0) {
         dir = {x:0,y:1} // down
      } else if(dir.x == 0 && dir.y == 1) {
         dir = {x:-1,y:0} // left
      } else if(dir.x == -1 && dir.y == 0) {
         dir = {x:0,y:-1} // up
      }
      continue
   }

   guard = {x,y}
   puz[y][x] = 'x'
}

// console.log(puz.map(r => r.join('')).join('\n'))
console.log(
   _.sum(puz.map(r => r.filter(e => e == 'x').length))
)