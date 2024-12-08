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

      for(const ant of ants[type]) {
         // calculate top and bottom antinodes
         // a + 2 * (b - a) = 2b - a
         const top = {
            y: 2 * y - ant.y,
            x: 2 * x - ant.x,
         }
         // a + (a - b) = 2a - b
         const bottom = {
            y: 2 * ant.y - y,
            x: 2 * ant.x - x,
         }

         if(inBounds(top.x,top.y)) {
            antis.push(top)
         }
         if(inBounds(bottom.x,bottom.y)) {
            antis.push(bottom)
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
