# Form Validator

A validation class for forms

Live demo pending


## Validation rules

* `required` : field cannot be blank
* `email` : must be a valid email address
* `url` : must be a valid url
* `minLength:2` : at least 2 characters; replace `2` with any number
* `maxLength:20` : at most 20 characters; replace `20` with any number
* `length:12` : exactly 12 characters; replace `12` with any number
* `matches:#password` : must have same value as #password; replace `#password` with any query selector
* `alphabet` : only letters allowed
* `cap` : at least one capital
* `allCaps`
* `noCaps`
* `alphaNumeric` : must have at least 1 letter and 1 number
* `noSpaces`
* `number` : must be number
* `min:5` : must be a number greater than 4; replace `5` with any number
* `max:50` : must be number less than 51; ; replace `50` with any number
* `integer`
* `decimal`
* `contains:dog` : value must contain 'dog' in it; replace `dog` with any string or number to match
* `inList:cat:dog:21` : value must be one of the items in the list; build list with any string or number separated by `:`