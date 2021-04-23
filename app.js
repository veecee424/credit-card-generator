// const express = require('express')
// const app = express()
const {fetchCC} = require('./helpers/helpers')
const db = require('./db/bin.db')

const generateValidCard = {}

generateValidCard.params = (input)=> {
    return fetchCC(input)
} 

generateValidCard.randomcard = (input) => {
    if (!input) {
        return fetchCC()
    } else if (input) {
        return {status: 'error', message: 'No parameter required - allow me to do my thing.'}
    }
}

generateValidCard.startwith = (start) => {
    let cardNumberArray = []
    let startNum = null
    let remainingDigits = null
    let cardNumber = null;

    try {
        // Validation 
        if (typeof start !== 'number' || start < 0) {
            throw new Error('Please input a valid number greater than 0')
        }

        if (start < 220001 || start > 6767749999) {
            throw new Error('Start number should not be less than 2200010000 or greater than 6767749999')
        }
        
        if (start.toString().split('').length < 10 || start.toString().split('').length > 10) {
            throw new Error('Start number should not be less or more than 10 digits')
        }

        if (start) {
            startNum = Number(start).toString().split('')
            remainingDigits = Math.random().toString().slice(2, 7).split('')
            cardNumberArray = startNum.concat(remainingDigits)
            cardNumber = cardNumberArray.join('')
    
    
            for (let i = cardNumberArray.length - 1; i >= 0; i-=2) {
                cardNumberArray[i] *= 2
                if (cardNumberArray[i] > 9) {
                    cardNumberArray[i] -= 9
                }
            }
        
            // Loop through account number and convert to array
            let checkSum = cardNumberArray.map((value)=> {
                return parseInt(value)
            }).reduce((total, nextValue)=> {
                return total+nextValue;
            }, 0)
    
            let checkDigit = 0;
            if (checkSum % 10 !== 0) {
                checkDigit = (checkSum*9) % 10;
            }
            return {status: "Success", card_number: cardNumber+checkDigit}
        }
    } catch (e) {
        return {status: 'error', message: e.message}
    }
    
}


generateValidCard.endwith = (input) => {
    let cardNumberArray = []
    let endNum = input
    let BIN = null;
    let providedCheckDigit = null;
    let cardDetails = null;
    let cardNumber = null;

    try {
        if (typeof endNum !== 'number' || endNum < 0) {
            throw new Error('Please input a valid number greater than 0')
        }
        
        if (endNum.toString().split('').length < 10 || endNum.toString().split('').length > 10) {
            throw new Error('End number should not be less or more than 10 digits')
        }

        cardDetails = db[Math.floor(Math.random() * db.length)];
        BIN = cardDetails.BIN;
        providedCheckDigit = endNum.toString().split('')[9]
        cardNumberArray = BIN.toString().split('').concat(endNum.toString().split('').slice(0, 9))
        cardNumberArray[1] = 0;
        cardNumber = cardNumberArray.join('');

        for (let i = cardNumberArray.length - 1; i >= 0; i-=2) {
            cardNumberArray[i] *= 2
            if (cardNumberArray[i] > 9) {
                cardNumberArray[i] -= 9
            }
        }
      
        // Loop through account number and convert to array
        let checkSum = cardNumberArray.map((value)=> {
            return parseInt(value)
        }).reduce((total, nextValue)=> {
            return total+nextValue;
        }, 0)
        

        let checkDigit = Number(providedCheckDigit);
        let remainder = 0;
        if ((checkSum + checkDigit) % 10 !== 0) {
           remainder = (checkSum + checkDigit) % 10;
           cardNumber[1] = 10 - remainder
        } 
    
        let card_num = cardNumber.split('')
        card_num[1] = 10- remainder;
        return {status: "Success", card_number: card_num.join('')+checkDigit}
    } catch (e) {
        return {status: "Error", "message": e.message}
    }
}
// console.log(generateValidCard.endWith(4629486243))
// console.log(generateValidCard.startWith(220001000))
// console.log(generateValidCard.randomcard(8))
// console.log(generateValidCard.params({country: 'brazil', brand: 'american express', type: "credit"}))

// const port = process.env.PORT || 3001;
// app.listen(port, ()=> {
//     console.log(`Server running on ${port}`)
// })
module.exports = generateValidCard;

