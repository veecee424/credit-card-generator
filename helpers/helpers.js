const db = require('../bin.db')

const cardDetails = (input)=> {
    let brand = input.brand;
    let country = input.country;
    let type = input.type;
    let card = null;
    let cardArr = []
    let numOfCardsFetched = null;
    if (brand && !type) {
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


const generateCardNumber = (input) => {
    try {
        let dbLength = db.length;
        let creditCardDetails = db[Math.floor(Math.random()*dbLength)];
        let BIN_Digits = null;
        let accNum = null;
        let accountNumber = null;
        
        if (cardDetails(input).BIN) {
            creditCardDetails = cardDetails(input)
        } 
    
        // Verve card check
        if (creditCardDetails.BRAND == 'verve'.toUpperCase()) {
            accNum = Math.random().toString().slice(2, 14)
        }

        if (creditCardDetails.BRAND == 'american express'.toUpperCase()) {
            accNum = Math.random().toString().slice(2, 10)
        }
        
        BIN_Digits = creditCardDetails.BIN.toString()
        accNum = Math.random().toString().slice(2, 11)
        accountNumber =  BIN_Digits.split('').slice(0).concat(accNum.split(''));

        return {accountNumber, creditCardDetails}
    } catch (e) {
        return e.message
    }
}

// generateCardNumber(brand)
const fetchCC = (input) => {
    try {
        let cardDetails = generateCardNumber(input);
        let cardNumberArray = cardDetails.accountNumber;
        let cardNumber = null;
        
        if (typeof cardNumberArray == 'object') {
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
        return {"card_number": cardNumber+checkDigit, "brand": cardDetails.creditCardDetails.BRAND, "type": cardDetails.creditCardDetails.CARD_TYPE, "country": cardDetails.creditCardDetails.COUNTRY}
    } catch (e) {
        return {"status": "error", "message": "e.message"}
    }
}


module.exports = {generateCardNumber, cardDetails, fetchCC}