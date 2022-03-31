const fs = require('fs')

let fileNames = ['1-input.json','2-input.json']
fileNames.forEach((fileName) => {
    // Reading Data from json file
    let rawData = fs.readFileSync('./' + fileName)
    let input = JSON.parse(rawData)

    // to Store date and amount
    let map = {}

    // it will contain out final output
    let balanceSheet = {
        balance:[]
    }

    // minimum and maximum date (to get the min and max dates in data)
    let minDate = new Date()
    let maxDate;

    // date comparator function
    const compareDate = (startDate) => {
        if(startDate < minDate)
            minDate = startDate
        else if(!maxDate || startDate > maxDate)
            maxDate = startDate
    }

    // looping through revenue data and storing the data in map object, also updating min/max dates
    input.revenueData.forEach((obj)=>{
        let startDate = new Date(obj.startDate)
        compareDate(startDate)

        if(!map[obj.startDate])
            map[obj.startDate] = 0
        map[obj.startDate] += obj.amount
    })

    // looping through expense data and updating the map object, also updating min/max dates
    input.expenseData.forEach((obj)=>{
        let startDate = new Date(obj.startDate)
        compareDate(startDate)

        if(!map[obj.startDate])
            map[obj.startDate] = 0
        map[obj.startDate] += -obj.amount
    })

    // creating the balance from minDate to maxDate
    let startDate = minDate
    while(startDate<=maxDate){
        balanceSheet.balance.push({
            amount: map[startDate.toISOString()]||0,
            startDate: startDate.toISOString()
        })
        startDate.setMonth(startDate.getMonth() + 1)
    }

    // Output
    console.log(`Output of ${fileName}`,balanceSheet)
})
