import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString().replace(/\r/g,'')
const machines = input.split('\n\n').map(machineStr => {
  const [a, b, p] = machineStr.split('\n')
  const [ax, ay] = a.slice(12).split(', Y+').map(Number)
  const [bx, by] = b.slice(12).split(', Y+').map(Number)
  const [px, py] = p.slice(9).split(', Y=').map(Number)

  return {
    a: { x: ax, y: ay },
    b: { x: bx, y: by },
    prize: {x: px, y: py}
  }
})

console.log(machines)

// Just do the O(n^2) version for now
let total = 0
for(const machine of machines) {
  let bestScore = Infinity
  for(let a = 0; a * machine.a.x <= machine.prize.x; a++) {
    for(let b = 0; a * machine.a.x + b * machine.b.x <= machine.prize.x; b++) {
      const x = a * machine.a.x + b * machine.b.x
      const y = a * machine.a.y + b * machine.b.y
      if(x === machine.prize.x && y === machine.prize.y) {
        if(a*3+b < bestScore) {
          bestScore = a*3+b
        }
      }
    }
  }
  console.log("Best score", bestScore)
  if(bestScore < Infinity)
    total += bestScore
}

console.log(total)
