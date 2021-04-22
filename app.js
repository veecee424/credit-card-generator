const express = require('express')
const app = express()
const {fetchCC} = require('./helpers/helpers')

const generateValidCard = {}

generateValidCard.params = (input)=> {
    return fetchCC(input)
} 

generateValidCard.randomCard = () => {
    return fetchCC()
}
// console.log(generateValidCard.randomCard())
// console.log(generateValidCard.params({country: 'nigeria', brand: 'visa', type: 'debit'}))

const port = process.env.PORT || 3001;
app.listen(port, ()=> {
    console.log(`Server running on ${port}`)
})


