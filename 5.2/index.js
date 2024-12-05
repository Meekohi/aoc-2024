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

const allowSet = []
for(const rule of rules) {
   allowSet[rule[0]] = allowSet[rule[0]] || []
   allowSet[rule[0]].push(rule[1])
}

// Add numbers one at a time, put them as far toward the end as you can without breaking a rule.
function reorder(printing) {
   const newPrinting = []
   for(let i = 0; i < printing.length; i++) {
      const n = printing[i]
      let j = 0
      for(j = 0; j < newPrinting.length; j++) {
         const m = newPrinting[j]

         if(_.includes(allowSet[n], m)) {
            // console.log("Found",n,m, "better stop and put you before this...")
            break
         }
      }
      newPrinting.splice(Math.max(0,j), 0, n)
   }
   return newPrinting[Math.floor((newPrinting.length-1) / 2)]
}

let output = 0
for(const printing of printings) {
   let disallow = []
   for(let i = 0; i < printing.length; i++) {
      const page = printing[i]
      if(_.includes(disallow, page)) {
         // BAD BOI.
         output += reorder(printing)
         break;
      }

      disallow = _.union(disallow, ruleSet[page])
   }
}

console.log(output)