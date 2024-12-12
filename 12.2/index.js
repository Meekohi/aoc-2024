import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString().replace(/\r/g,'')
let grid = input.split('\n').map(row => row.split(''))

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

// Now count up the area of each region
const price = {}
for(let y = 0; y < grid.length; y++) {
  for(let x = 0; x < grid[y].length; x++) {
    if(price[grid[y][x]] == undefined) {
      price[grid[y][x]] = {
        area: 0,
        sides: 0
      }
    }
    price[grid[y][x]].area++
  }
}

// horizontal walls
for(let y = 0; y <= grid.length; y++) {
  let abovePlant = null
  let belowPlant = null
  for(let x = 0; x < grid[0].length; x++) {
    // x and y here represent the TOP wall of the cell

    if(y > 0 && y < grid.length) {
      if(grid[y][x] == grid[y-1][x]) {
        // same region, no wall here
        abovePlant = null
        belowPlant = null
        continue
      }
    }
    
    if(y < grid.length) {
      if(grid[y][x] != belowPlant) {
        price[grid[y][x]].sides++
        belowPlant = grid[y][x]
      }
    }

    if(y-1 >= 0) {
      if(grid[y-1][x] != abovePlant) {
        price[grid[y-1][x]].sides++
        abovePlant = grid[y-1][x]
      }
    }
  }
}

// vertical walls
for(let x = 0; x <= grid[0].length; x++) {
  let leftPlant = null
  let rightPlant = null
  for(let y = 0; y < grid.length; y++) {
    // x and y here represent the LEFT wall of the cell

    if(x > 0 && x < grid[0].length) {
      if(grid[y][x] == grid[y][x-1]) {
        // same region, no wall here
        leftPlant = null
        rightPlant = null
        continue
      }
    }
    
    if(x < grid[0].length) {
      if(grid[y][x] != rightPlant) {
        price[grid[y][x]].sides++
        rightPlant = grid[y][x]
      }
    }

    if(x-1 >= 0) {
      if(grid[y][x-1] != leftPlant) {
        price[grid[y][x-1]].sides++
        leftPlant = grid[y][x-1]
      }
    }
  }
}

console.log(price)
console.log(
  _.sumBy(Object.values(price), region => region.area*region.sides)
)