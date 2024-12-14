import fs from 'fs'
import _ from 'lodash'
import {PNG} from 'pngjs'

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
let t = 0;

function debug(){
  console.log('=====',t,'=====')
  
}

// Let's go.

function next(){

  let corner = 0
  robots.forEach(robot => {
    robot.p.x = (robot.p.x + robot.v.x + W) % W
    robot.p.y = (robot.p.y + robot.v.y + H) % H

    if(robot.p.x < 20 && robot.p.y < 20) corner++
  })
  t++
 
  if(corner > 10) return next()

  console.log(t)
  let output = new PNG({ width: W, height: H });

  const grid = Array(H).fill().map(() => Array(W).fill('.'))
  robots.forEach(robot => {
    //grid[robot.p.y][robot.p.x] = isNaN(grid[robot.p.y][robot.p.x]) ? 1 : grid[robot.p.y][robot.p.x]+1
    let idx = (output.width * robot.p.y + robot.p.x) << 2;
    output.data[idx+0] = 0;
    output.data[idx+1] = 255;
    output.data[idx+2] = 0;
    output.data[idx+3] = 0xff;
  })
  output.pack().pipe(fs.createWriteStream('out/'+String(t).padStart(6,'0') + '.png')).on('finish',next)
}
next()