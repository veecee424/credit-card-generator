Table of contents
=======
1. Features
2. Installing
3. Example

Features
=======
* Generate valid random cards
* Provide key parameters to generate card(s) of specific brands, types, and countries.
* Provide start and end digits and have random cards generated from them

Installing
=======
> npm install getrandomcards

Examples
=======
```
const card = require('getrandomcards')`

console.log(card.randomCard()) //Output { status: 'Success', card_number: '4892409075582441', brand: 'VISA', type: 'CREDIT', country: 'United States' }
_The randomCard() method requires no parameter and automatically generates random cards once called._

console.log(card.startWith(2200010000)) //Output { status: 'Success', card_number: '2200010000679475' }
_startWith() takes in a single parameter which should be a number not less or more than 10 digits._

console.log(card.endWith(3126765890) //Output { status: 'Success', card_number: '3713143126765890' }
_endWith() also takes a single parameter which is a valid 10 digit number_

console.log(card.params({country: 'brazil', brand: 'american express', type: "credit"})) //Output { status: 'Success', card_number: '375177961246546', brand: 'AMERICAN EXPRESS', type: 'CREDIT', country: 'Brazil' }
_.params({}) accepts an object with properties country, brand, and type of card that should be generated_

console.log(card.endWith("3126765890")) //Output { status: 'Error', message: 'Please input a valid number greater than 0' }

console.log(card.endWith(312676589)) //Output { status: 'Error', message: 'Start number should not be less or more than 10 digits' }

console.log(card.startWith(220001000)) //Output { status: 'error', message: 'Start number should not be less or more than 10 digits' }

console.log(card.params({country: 'wrong country', brand: 'american express', type: "credit"})) //Output { status: 'error', message:'Invalid brand and country combination / invalid brand, type, or country provided.' }
```
**NOTE:** --> All parameters are required



