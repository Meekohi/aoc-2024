import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString().replace(/\r/g,'')
let stones = input.split(' ').map(Number)

let mancala = {}
for(const stone of stones) {
  mancala[stone] = (mancala[stone] || 0) + 1
}

console.log(mancala)

function nextStones(stone) {
  if(stone === 0) return [1]
    if(String(stone).length % 2 === 0) {
      const left = Number(String(stone).slice(0, String(stone).length / 2))
      const right = Number(String(stone).slice(String(stone).length / 2))
      return [left, right]
    }
    return [2024 * stone]
}

for(let t = 0; t < 75; t++) {
  const nextMancala = {}
  _.forOwn(mancala, function(count, n) { 
    const next = nextStones(Number(n))
    // console.log(n, '->', next)
    for(const nextStone of next) {
      nextMancala[nextStone] = (nextMancala[nextStone] || 0) + count
    }
  });

  mancala = nextMancala
  console.log(mancala)
}

console.log(
  _.sum(_.values(mancala))
)