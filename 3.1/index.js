import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString()

const matches = input.match(/mul\(\d+,\d+\)/g)
const output = _.sum(_.map(matches, match => {
   const [a, b] = match.substring(4, match.length - 1).split(',')
   return Number(a) * Number(b)
}))

console.log(output)