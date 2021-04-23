Table of contents
=======
1. Features
2. Installing
3. Example

Features
=======
* Generate valid random debit and credit cards
* Provide key parameters to generate card(s) of specific brands, types, and countries.
* Provide/specify start and end digits to be validated and attached to cards when they are generated.

Installing
=======
```
npm install getrandomcards
```

Examples
=======
```
const card = require('getrandomcards')`
```
```
card.randomCard() //Output { status: 'Success', card_number: '4892409075582441', brand: 'VISA', type: 'CREDIT', country: 'United States' }
**The randomcard() method requires no parameter and automatically generates random cards once called.**
```

```
card.startWith(2200010000) //Output { status: 'Success', card_number: '2200010000679475' }
**startwith() takes in a single parameter which should be a number not less or more than 10 digits.**
```

```
card.endWith(3126765890) //Output { status: 'Success', card_number: '3713143126765890' }
**endwith() also takes a single parameter which is a valid 10 digit number**
```

```
card.params({country: 'brazil', brand: 'american express', type: "credit"}) //Output { status: 'Success', card_number: '375177961246546', brand: 'AMERICAN EXPRESS', type: 'CREDIT', country: 'Brazil' }
**params({}) accepts an object with properties country, brand, and type of card that should be generated**
```
**NOTE:** All parameters here are required

```
card.randomcard(param) //Output {status: 'error', message: 'No parameter required - allow me to do my thing.'}
**Throws an error when a an argument is passed to the random card generating function**
```

```
card.endwith("3126765890") //Output { status: 'Error', message: 'Please input a valid number greater than 0' }
**Throws an error when a string input is passed**
```

```
card.startwith("3126765890") //Output { status: 'Error', message: 'Please input a valid number greater than 0' }
**Throws an error when a string input is passed**
```

```
card.endwith(312676589) //Output { status: 'Error', message: 'End number should not be less or more than 10 digits' }
**Throws an error when end number is less than 10 digits**
```

```
card.startwith(220001000) //Output { status: 'error', message: 'Start number should not be less or more than 10 digits' }
**Throws an error when start number is less than 10 digits**
```

```
card.params({country: 'wrong country', brand: 'american express', type: "credit"}) //Output { status: 'error', message:'Invalid brand and country combination / invalid brand, type, or country provided.' }
**This throws an error given an invalid country input**
```



