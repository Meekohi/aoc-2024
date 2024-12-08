import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString().replace(/\r/g,'')
const puz = input.split('\n').map(e => e.split(''))

let guard = {x:0,y:0}
let dir = {x:0,y:-1} // up
for(const y in puz) {
   for(const x in puz[y]) {
      if(puz[y][x] == '^') {
         guard = {x:Number(x),y:Number(y)}
         puz[y][x] = '.'
      }
   }
}

function bounds(x,y) {
   return x >= 0 && y >= 0 && y < puz.length && x < puz[0].length
}

function isLoop(_guard,_dir,_puz) {
   while(true) {
      const x = _guard.x+_dir.x
      const y = _guard.y+_dir.y
   
      if(!bounds(x,y) ) {
         return false
      }

      // mark your trail
      const _dirCode = _dir.x == 1 ? '>' : _dir.x == -1 ? '<' : _dir.y == 1 ? 'v' : '^'
      if(_.includes(_puz[_guard.y][_guard.x],_dirCode)) { return true }
      _puz[_guard.y][_guard.x] = _puz[_guard.y][_guard.x].concat( _dirCode )
   
      if(_puz[y][x] == '#') {
         // turn right
         if(_dir.x == 0 && _dir.y == -1) {
            _dir = {x:1,y:0} // right
         } else if(_dir.x == 1 && _dir.y == 0) {
            _dir = {x:0,y:1} // down
         } else if(_dir.x == 0 && _dir.y == 1) {
            _dir = {x:-1,y:0} // left
         } else if(_dir.x == -1 && _dir.y == 0) {
            _dir = {x:0,y:-1} // up
         }
   
         continue
      }

      _guard = {x,y}
   }
}

while(true) {
   const x = guard.x+dir.x
   const y = guard.y+dir.y

   if(!bounds(x,y) ) {
      console.log(x,y,'out of bounds')
      break
   }

   if(!_.includes(puz[y][x],'L')) {
      const pp = _.cloneDeep(puz)
      const gg = _.cloneDeep(guard)
      const dd = _.cloneDeep(dir)
      pp[y][x] = '#'
      if(isLoop(gg,dd,pp)) {
         puz[y][x] = puz[y][x].concat('L')
      }
   }

   if(puz[y][x] == '#') {
      // turn right if you can't step forward
      if(dir.x == 0 && dir.y == -1) { // up
         dir = {x:1,y:0} // right
      } else if(dir.x == 1 && dir.y == 0) { // right
         dir = {x:0,y:1} // down
      } else if(dir.x == 0 && dir.y == 1) { // down
         dir = {x:-1,y:0} // left
      } else if(dir.x == -1 && dir.y == 0) { // left
         dir = {x:0,y:-1} // up
      }
      continue
   }

   guard = {x,y}
}

console.log(
   _.sum(puz.map(r => r.filter(e => _.includes(e,'L')).length))
)
// 1940 too high
// 1878 too high
// 1877 too high