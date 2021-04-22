const express = require('express')
const db = require('./bin.db')
const app = express()
const {fetchCC} = require('./helpers/helpers')

const generateValidCard = {}


generateValidCard.randomCard = ()=> {
    return fetchCC()
} 

generateValidCard.cardType = (brand)=> {
    return fetchCC(brand)
}

generateValidCard.cardBrandAndType = ()=> {
    return fetchCC(brand, type)
}

console.log(fetchCC('mastercard', 'credit'))


const port = process.env.PORT || 3001;
app.listen(port, ()=> {
    console.log(`Server running on ${port}`)
})


