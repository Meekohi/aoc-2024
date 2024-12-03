import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString()

const zipped = input.split('\n').map(pair => {
   return _.compact(pair.split(' ').map(Number))
})

const [left, right] = _.unzip(zipped).map(col => _.sortBy(col, n => n))

const diff = _.zip(left, right).map( ([a,b]) => Math.abs(a-b))
const output = _.sum(diff)

console.log(output)

