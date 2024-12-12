import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString().replace(/\r/g,'')
let grid = input.split('\n').map(row => row.split(''))

function debug() {
  console.log(grid.map(row => row.join('')).join('\n'))
}

// debug()

function markGrid(x,y,letter,id) {
  if(x < 0 || y < 0) return
  if(y >= grid.length || x >= grid[y].length) return
  if(grid[y][x] != letter) return

  const dirs = [
    [0,1],
    [0,-1],
    [1,0],
    [-1,0]
  ]
  
  grid[y][x] = id
  dirs.forEach(dir => {
    markGrid(x+dir[0],y+dir[1],letter,id)
  })

}

// First, give new ids to "disconnected" regions
let id = 1
for(let y = 0; y < grid.length; y++) {
  for(let x = 0; x < grid[y].length; x++) {
    if(isNaN(grid[y][x])) {
      markGrid(x,y,grid[y][x],id++)
    }
  }
}

// debug()

// Now count up the area and perimeter of each region
const price = {}
for(let y = 0; y < grid.length; y++) {
  for(let x = 0; x < grid[y].length; x++) {
    if(price[grid[y][x]] == undefined) {
      price[grid[y][x]] = {
        area: 0,
        perimeter: 0
      }
    }

    price[grid[y][x]].area++
    const dirs = [
      [0,1],
      [0,-1],
      [1,0],
      [-1,0]
    ]
    dirs.forEach(dir => {
      if(grid[y+dir[1]] == undefined || grid[y+dir[1]][x+dir[0]] == undefined || grid[y+dir[1]][x+dir[0]] != grid[y][x]) {
        price[grid[y][x]].perimeter++
      }
    })
  }
}

console.log(price)
console.log(
  _.sumBy(Object.values(price), region => region.area*region.perimeter)
)