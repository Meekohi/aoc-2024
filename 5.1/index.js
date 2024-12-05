import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString().replace(/\r/g,'')
const [rulesStr, printingsStr] = input.split('\n\n')

const rules = rulesStr.split('\n').map(rule => rule.split('|').map(Number))
const printings = printingsStr.split('\n').map(printing => printing.split(',').map(Number))

const ruleSet = []
for(const rule of rules) {
   ruleSet[rule[1]] = ruleSet[rule[1]] || []
   ruleSet[rule[1]].push(rule[0])
}
// console.log(rules)
// console.log(printings)
// console.log(ruleSet)

// go left to right and accumulate numbers that cannot occur

let output = 0
for(const printing of printings) {
   let disallow = []
   for(let i = 0; i < printing.length; i++) {
      const page = printing[i]
      if(_.includes(disallow, page)) break;

      disallow = _.union(disallow, ruleSet[page])
      if(i == printing.length - 1) {
         output += printing[Math.floor((printing.length-1)/2)]
      }
   }
}

console.log(output)