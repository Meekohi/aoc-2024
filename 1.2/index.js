import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString()

const zipped = input.split('\n').map(pair => {
   return _.compact(pair.split(' ').map(Number))
})

const [left, right] = _.unzip(zipped)
const tally = _.groupBy(right, n => n)
const similarity = _.compact(
   _.map(left, n => n * (tally[n.toString()]?.length || 0))
)

console.log(similarity)
console.log(_.sum(similarity))