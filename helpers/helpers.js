const db = require('../bin.db')


const cardDetails = (brand, type, country)=> {
    let card = null;
    let cardArr = []
    let numOfCardsFetched = null;
    if (brand && !type) {
        //loop through db
        for(let item of db) {
            if (item.BRAND == brand.toUpperCase()) {
                cardArr.push(item)
            }
        }   
    } 
    
    if(brand && type && !country) {
        cardArr = []
        for (let item of db) {
            if (item.BRAND == brand.toUpperCase() && item.CARD_TYPE == type.toUpperCase() ) {
                cardArr.push(item)
            }
        }
    } 
    // console.log(cardArr.length)
    if(brand && type && country) {
        cardArr = []
        for (let item of db) {
            if (item.BRAND == brand.toUpperCase() && item.CARD_TYPE == type.toUpperCase() && item.COUNTRY.toUpperCase() == country.toUpperCase()) { 
                cardArr.push(item)
            }
        }
    }

    if (!cardArr.length) {
        throw new Error('Card not found - invalid brand, type, or country.')
    }

    //Randomly loop through card array and use one
    numOfCardsFetched = cardArr.length;
    card = cardArr[Math.floor(Math.random() * numOfCardsFetched)]
    return card
}



//Fetch card according to brand
const generateCardNumber = (brand, type, country) => {
    try {
        let dbLength = db.length;
        let creditCardDetails = db[Math.floor(Math.random()*dbLength)];
        let BIN_Digits = null;
        let accNum = null;
        let accountNumber = null;

        if (brand && cardDetails(brand, type, country)) {
            creditCardDetails = cardDetails(brand, type, country)
        } 

        // if (brand && !cardDetails(brand)) {
        //     throw new Error('Invalid card brand')
        // }

        // if (brand && type && !cardDetails(brand, type)) {
        //     throw new Error('invalid card brand or type')
        // }
       
        // if (country && !cardDetails(brand, type, country)) {
        //     throw new Error('invalid card brand or type or country')
        // }
    
        // Verve card check
        if (creditCardDetails.BRAND == 'verve'.toUpperCase()) {
            accNum = Math.random().toString().slice(2, 14)
        }

        BIN_Digits = creditCardDetails.BIN.toString()
        accNum = Math.random().toString().slice(2, 11)
        accountNumber =  BIN_Digits.split('').slice(0).concat(accNum.split(''));

        return accountNumber
    } catch (e) {
        return e.message
    }
}

// generateCardNumber(brand)
const fetchCC = (brand, type, country) => {
    try {
        let cardNumberArray = generateCardNumber(brand, type, country);
        let cardNumber = null;
        
        if (typeof(cardNumberArray) == 'object') {
            cardNumber = cardNumberArray.join('')
        } else {
            throw new Error(cardNumberArray)
        }

        for (let i = cardNumberArray.length - 1; i >= 0; i-=2) {
            cardNumberArray[i] *= 2
            if (cardNumberArray[i] > 9) {
                cardNumberArray[i] -= 9
            }
        }
    
        //Loop through account number and convert to array
        let checkSum = cardNumberArray.map((value)=> {
            return parseInt(value)
        }).reduce((total, nextValue)=> {
            return total+nextValue;
        }, 0)
        
        let checkDigit = 0;
        if (checkSum % 10 !== 0) {
            checkDigit = (checkSum*9) % 10;
        }
        return cardNumber+checkDigit
    } catch (e) {
        return e.message
    }
}

// console.log(fetchCC('mastercard', ''))


module.exports = {generateCardNumber, cardDetails, fetchCC}