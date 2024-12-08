import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString().replace(/\r/g,'')
const puzzles = input.split('\n').map(line => {
   const [total, numsStr] = line.split(':')
   return {
      total: Number(total),
      nums: numsStr.trim().split(' ').map(Number)
   }
})

console.log(puzzles)

function findEq(puzzle) {
   const nums = puzzle.nums
   for(let i = 0; i < Math.pow(3,nums.length-1); i++) {
      const bin = i.toString(3).padStart(nums.length-1,'0')
      let testTotal = nums[0]
      for(let j = 1; j < nums.length; j++) {
         if(bin[j-1] == '0') {
            // console.log("+",nums[j])
            testTotal += nums[j]
         } else if(bin[j-1] == '1') {
            // console.log("*",nums[j])
            testTotal *= nums[j]
         } else {
            // console.log("||",nums[j])
            testTotal = Number(testTotal.toString() + nums[j].toString())
         }
      }
      if(testTotal == puzzle.total) {
         return puzzle.total
      }
   }
   return 0
}

// for(let i = 0; i < puzzles.length; i++) {
//    console.log(findEq(puzzles[i]))
// }

console.log(
   "total",_.sumBy(puzzles,findEq)
)