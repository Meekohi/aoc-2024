import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString().replace(/\r/g,'')
const map = input.split('\n').map(row => row.split('').map(Number))

function debug(){
  console.log(map.map(row => row.join('')).join('\n'))
}

function trailhead(x,y,h=0){
  if(y < 0 || x < 0) return null
  if(y >= map.length) return null
  if(x >= map[y].length) return null

  if(map[y][x] !== h) return null

  if(h == 9) {
    return {x,y}
  }

  const directions = [
    [x, y-1, h+1],
    [x, y+1, h+1],
    [x-1, y, h+1],
    [x+1, y, h+1]
  ]

  return directions.map(([x,y,h]) => {
    return trailhead(x,y,h)
  })

}

let total = 0
for(let y = 0; y < map.length; y++) {
  for(let x = 0; x < map[y].length; x++) {
    const allPeaks = trailhead(x, y)
    const peaks = _.uniqWith(
      _.compact(_.flattenDeep(allPeaks)),
      (p,q) => (p.x === q.x && p.y === q.y)
    )
    if(peaks.length > 0)
      console.log(x,y,'+',peaks.length)
    total += peaks.length
  }
}

console.log("total", total)