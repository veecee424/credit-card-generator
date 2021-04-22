const db = require('../db/bin.db')

const cardDetails = (input)=> {
    let brand = null;
    let country = null;
    let type = null;
    
    if (input) {
        brand = input.brand;
        country = input.country;
        type = input.type;
    }
    let card = null;
    let cardArr = []
    let numOfCardsFetched = null;

    if(brand && type && country) {
        cardArr = []
        for (let item of db) {
            if (item.BRAND.toUpperCase() == brand.toUpperCase() && item.CARD_TYPE.toUpperCase() == type.toUpperCase() && item.COUNTRY.toUpperCase() == country.toUpperCase()) { 
                cardArr.push(item)
            }
        }
    } else {
        for (let item of db) {
            cardArr.push(item)
        }
    }
   
    if (!cardArr.length) {
        return 'Invalid brand and country combination / invalid brand, type, or country provided.'
    }

    //Randomly loop through card array and use one
    numOfCardsFetched = cardArr.length;
    card = cardArr[Math.floor(Math.random() * numOfCardsFetched)]
    return card
}

const generateCardNumber = (input) => {
    try {
        let creditCardDetails = null;
        let BIN_Digits = null;
        let accNum = null;
        let accountNumber = null;
        
        if (cardDetails(input).BIN) {
            creditCardDetails = cardDetails(input)
        } else {
            return cardDetails(input)
        }
    
        // Card brand check
        if (creditCardDetails.BRAND == 'verve'.toUpperCase()) {
            accNum = Math.random().toString().slice(2, 14)
        } else if (creditCardDetails.BRAND == 'american express'.toUpperCase()) {
            accNum = Math.random().toString().slice(2, 10)
        } else {
            accNum = Math.random().toString().slice(2, 11)
        }
        
        BIN_Digits = creditCardDetails.BIN.toString()
        accountNumber =  BIN_Digits.split('').slice(0).concat(accNum.split(''));

        return {accountNumber, creditCardDetails}
    } catch (e) {
        return 'Something went wrong - could not generate card number'
    }
}

// generateCardNumber(brand)
const fetchCC = (input) => {
    try {
        let fetchedCardDetails = generateCardNumber(input);
        let cardNumberArray = fetchedCardDetails.accountNumber;
        let cardNumber = null;
       
        if (typeof fetchedCardDetails == 'object') {
            cardNumber = cardNumberArray.join('')
        } else {
            throw new Error(fetchedCardDetails)
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
        return {status: "Success", "card_number": cardNumber+checkDigit, "brand": fetchedCardDetails.creditCardDetails.BRAND, "type": fetchedCardDetails.creditCardDetails.CARD_TYPE, "country": fetchedCardDetails.creditCardDetails.COUNTRY}
    } catch (e) {
        return {"status": "error", "message": e.message}
    }
}

// console.log(fetchCC({country: 'brazil', brand: 'american express', type: "credit"}))


module.exports = {generateCardNumber, cardDetails, fetchCC}