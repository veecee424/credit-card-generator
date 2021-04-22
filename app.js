const express = require('express')
const app = express()
const {fetchCC} = require('./helpers/helpers')

const generateValidCard = {}


generateValidCard.randomCard = ()=> {
    return fetchCC()
} 

generateValidCard.cardBrand = (brand)=> {
    return fetchCC(brand)
}

generateValidCard.brandAndType = (brand, type)=> {
    return fetchCC(brand, type)
}

generateValidCard.brandAndType = (brand, type)=> {
    return fetchCC(brand, type)
}

generateValidCard.brandTypeAndCountry = (brand, type, country)=> {
    return fetchCC(brand, type, country)
}

// console.log(fetchCC('mastercard', 'debit', 'nigeria'))
console.log(generateValidCard.brandTypeAndCountry('mastercard', 'debit'))


const port = process.env.PORT || 3001;
app.listen(port, ()=> {
    console.log(`Server running on ${port}`)
})


