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
    // prize: {x: px, y: py}
    prize: {x: px+10000000000000, y: py+10000000000000}
  }
})

console.log(machines)

//
// isn't this just a straight solve problem? are there any machines that actually have multiple solutions?
//
// x * a.x + y * b.x = p.x
// x * a.y + y * b.y = p.y
//

// x = (p.x - y*b.x) / a.x
// x = (p.y - y*b.y) / a.y
//
// (p.y - y*b.y) / a.y = (p.x - y*b.x) / a.x
// a.x * (p.y - y*b.y) = a.y * (p.x - y*b.x)
//
// a.x * p.y - y * a.x * b.y = a.y * p.x - y * a.y * b.x
//
// a.x * p.y - y * a.x * b.y - a.y * p.x + y * a.y * b.x = 0
// a.x * p.y - a*y * p.x = y * (a.x * b.y - a.y * b.x)
// y = (a.x * p.y - a.y * p.x) / (a.x * b.y - a.y * b.x)

let total = 0
for(const machine of machines) {
  let bestScore = Infinity
  const denom = (machine.a.x * machine.b.y - machine.a.y * machine.b.x)
  if(denom == 0) {
    console.log("OH NO.")
  }
  const b = (machine.a.x * machine.prize.y - machine.a.y * machine.prize.x) / denom
  const a = (machine.prize.x - b * machine.b.x) / machine.a.x

  if(a % 1 === 0 && b % 1 === 0 && a >= 0 && b >= 0) {
    bestScore = a*3+b
  }
            

  // for(let a = Math.ceil(machine.prize.x / machine.a.x); a >= 0; a--) {
  //   let b = (machine.prize.x - a * machine.a.x) / machine.b.x
  //   if(a % 1000000 == 0) console.log(a)

  //   if(b < 0 || !Number.isInteger(b)) { continue }

  //   const x = a * machine.a.x + b * machine.b.x
  //   const y = a * machine.a.y + b * machine.b.y
  //   if(x === machine.prize.x && y === machine.prize.y) {
  //     if(a*3+b < bestScore) {
  //       bestScore = a*3+b
  //     }
  //   }
  //   console.log(a)
  // }

  //console.log("Best score", bestScore)
  if(bestScore < Infinity)
    total += bestScore
}

console.log(total)
