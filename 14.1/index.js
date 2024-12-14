import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString().replace(/\r/g,'')
const robots = input.split('\n').map(robot => {
  const [pStr, vStr] = robot.split(' ')
  const [px,py] = pStr.slice(2).split(',').map(Number)
  const [vx,vy] = vStr.slice(2).split(',').map(Number)
  return {
    p: {x: px, y: py},
    v: {x: vx, y: vy}
  }
})

const W = 101
const H = 103

function debug(){
  const grid = Array(H).fill().map(() => Array(W).fill('.'))
  robots.forEach(robot => {
    console.log(robot.p.y, robot.p.x)
    grid[robot.p.y][robot.p.x] = isNaN(grid[robot.p.y][robot.p.x]) ? 1 : grid[robot.p.y][robot.p.x]+1
  })
  console.log(grid.map(row => row.join('')).join('\n'))
}

// Let's go.

debug()

for(let t = 0; t < 100; t++) {
  robots.forEach(robot => {
    robot.p.x = (robot.p.x + robot.v.x + W) % W
    robot.p.y = (robot.p.y + robot.v.y + H) % H
  })
}

debug()

const quad = {a:0,b:0,c:0,d:0}
const left = x => x < (W-1)/2
const right = x => x > (W-1)/2
const up = y => y < (H-1)/2
const down = y => y > (H-1)/2

robots.forEach(robot => {
  const x = robot.p.x
  const y = robot.p.y

  if(left(x) && up(y)) quad.a++
  if(left(x) && down(y)) quad.b++
  if(right(x) && up(y)) quad.c++
  if(right(x) && down(y)) quad.d++
})
console.log(quad.a * quad.b * quad.c * quad.d)



