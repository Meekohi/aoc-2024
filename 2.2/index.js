import fs from 'fs'
import _ from 'lodash'

const input = fs.readFileSync('input.txt').toString()

const reports = input.split('\n').map(report => {
   return _.compact(report.split(' ').map(Number))
})

function validate(report) {
   const asc = report[1]-report[0] > 0
   for(let i = 1; i < report.length; i++) {
      if(report[i]-report[i-1] > 0 && !asc) return false
      if(report[i-1]-report[i] > 0 && asc) return false
      if(Math.abs(report[i]-report[i-1]) < 1) return false
      if(Math.abs(report[i]-report[i-1]) > 3) return false
   }
   return true
}

const validReports = _.map(reports, report => {
   if(validate(report)) return report
   for(let i = 0; i < report.length; i++) {
      const newReport = _.cloneDeep(report)
      newReport.splice(i,1)
      if(validate(newReport)) return newReport
   }
   return null
})

console.log(validReports)
console.log(_.compact(validReports).length)