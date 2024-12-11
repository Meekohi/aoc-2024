import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString().replace(/\r/g,'')
let stones = input.split(' ').map(Number)

for(let t = 0; t < 25; t++) {
  stones = _.flatten(
    _.map(stones, stone => {
      if(stone === 0) return 1
      if(String(stone).length % 2 === 0) {
        const left = Number(String(stone).slice(0, String(stone).length / 2))
        const right = Number(String(stone).slice(String(stone).length / 2))

        console.log(stone, '->', left, right)
        return [left, right]
      }
      return 2024 * stone
    })
  )

  console.log(stones)
}

console.log(stones.length)