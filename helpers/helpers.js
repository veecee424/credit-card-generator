const db = require('../bin.db')

const cardBrandAndType = (brand, type)=> {
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
    } else if(brand && type) {
        for (let item of db) {
            if (item.BRAND == brand.toUpperCase() && item.CARD_TYPE == type.toUpperCase()) {
                cardArr.push(item)
            }
        }
    } 
    //Randomly loop through card array and use one
    numOfCardsFetched = cardArr.length;
    card = cardArr[Math.floor(Math.random() * numOfCardsFetched)]
    return card
}


//Fetch card according to brand
const generateCardNumber = (brand, type) => {
    try {
        let dbLength = db.length;
        let creditCardDetails = db[Math.floor(Math.random()*dbLength)];
        let BIN_Digits = null;
        let accNum = null;
        let accountNumber = null;
        
        if (brand && cardBrandAndType(brand, type)) {
            creditCardDetails = cardBrandAndType(brand, type)
        } 

        if (brand && !cardBrandAndType(brand)) {
            throw new Error('Invalid card brand')
        }

        if (brand && type && !cardBrandAndType(brand, type)) {
            throw new Error('invalid card brand or type')
        }
    
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
const fetchCC = (brand, type) => {
    try {
        let cardNumberArray = generateCardNumber(brand, type);
        let cardNumber = null;
     
        if (typeof(cardNumberArray) == 'object') {
            cardNumber = cardNumberArray.join('')
        } else {
            throw new Error('Invalid card brand or type, could not generate card')
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


module.exports = {generateCardNumber, cardBrandAndType, fetchCC}