import fs from 'fs'
import _ from 'lodash'

let input = fs.readFileSync('input.txt').toString()

while(true) {
   const off = input.indexOf('don\'t()')
   const on = input.indexOf('do()')

   console.log(input)
   console.log(off,on)

   if(off === -1) break;
   if(on === -1) {
      input = input.slice(0, off)
      continue
   }
   if(on < off) {
      input = _.slice(input.split(''),0,on).join('') + _.slice(input.split(''),on+4).join('')
      continue
   }

   input = _.slice(input.split(''),0,off).join('') + _.slice(input.split(''),on+4).join('')
   input = input.toString()
}

const matches = input.match(/mul\(\d+,\d+\)/g)
const output = _.sum(_.map(matches, match => {
   const [a, b] = match.substring(4, match.length - 1).split(',')
   return Number(a) * Number(b)
}))

console.log(output)