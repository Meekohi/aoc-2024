import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString().replace(/\r/g,'')
const map = input.split('\n').map(row => row.split(''))

console.log(map)

function inBounds(x,y) {
   if(x < 0 || y < 0) {
      return false
   }
   if(y >= map.length || x >= map[y].length) {
      return false
   }
   return true
}

const ants = []
const antis = []
for(let y = 0; y < map.length; y++) {
   for(let x = 0; x < map[y].length; x++) {
      if(map[y][x] === '.') {
         continue
      }

      const type = map[y][x]
      if(ants[type] === undefined) {
         ants[type] = [{x,y}]
         continue
      }

      const b = {x,y}

      for(const a of ants[type]) {
         // calculate top and bottom antinodes
         // a + 2 * (b - a) = 2b - a

         for(let n = 0; ;n++) {
            const next = {
               y: b.y + n * (b.y - a.y),
               x: b.x + n * (b.x - a.x),
            }
            if(!inBounds(next.x,next.y)) {
               break
            }
            antis.push(next)
         }

         // a + (a - b) = 2a - b
         for(let n = 0; ;n++) {
            const next = {
               y: a.y + n * (a.y - b.y),
               x: a.x + n * (a.x - b.x),
            }
            if(!inBounds(next.x,next.y)) {
               break
            }
            antis.push(next)
         }
      }
      
      ants[type].push({x,y})
   }
}

const antipoles = _.uniqWith(antis, (a,b) => {
   return a.x===b.x && a.y===b.y
})


// # Viz
// console.log(map.map(row => row.join('')).join('\n'))
// for(const anti of antipoles) {
//    map[anti.y][anti.x] = '#'
// }
// console.log()
// console.log(map.map(row => row.join('')).join('\n'))
// console.log()

console.log(antipoles.length)
