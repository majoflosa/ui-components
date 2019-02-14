# Form Validator

A validation class for forms

Live demo pending

## Example usage
```html
<form class="validation-form" method="POST">
    <div>
        <label for="name">Name: (required)</label>
        <input type="text" id="name">
        <p class="error-message"></p>
    </div>
    <div>
        <label for="email">Email: (required, valid email address)</label>
        <input type="email" id="email">
        <p class="error-message"></p>
    </div>
    <div>
        <label for="password">Password: (required, 4 characters minimum)</label>
        <input type="password" id="password">
        <p class="error-message"></p>
    </div>
    
    <div>
        <label for="confirm-password">Confirm Password (required, must match password)</label>
        <input type="password" id="confirm-password">
        <p class="error-message"></p>
    </div>
</form>
```

```javascript
const contactValidation = new FormValidation({
    formSelector: '.validation-form',
    fields: [
        { selector: '#name', rules: ['required'] },
        { selector: '#email', rules: ['required', 'email'] },
        { selector: '#password', rules: ['required', 'minLength:4'] },
        { selector: '#confirm-password', rules: ['required', 'matches:#password'] }
    ],
    errorSelector: '.error-message'
});
```


## Validation rules

* `required` : field cannot be blank
* `email` : must be a valid email address
* `url` : must be a valid url
* `minLength:2` : at least 2 characters; replace `2` with any number
* `maxLength:20` : at most 20 characters; replace `20` with any number
* `length:12` : exactly 12 characters; replace `12` with any number
* `matches:#password` : must have same value as #password; replace `#password` with any query selector
* `alphabet` : only letters allowed
* `cap` : at least one uppercase letter
* `allCaps`
* `noCaps`
* `alphaNumeric` : must have at least 1 letter and 1 number, no special characters
* `noSpaces`
* `number` : must be number
* `min:5` : must be a number greater than 4; replace `5` with any number
* `max:50` : must be number less than 51; ; replace `50` with any number
* `integer`
* `decimal`
* `contains:dog` : value must contain 'dog' in it; replace `dog` with any string or number to match
* `inList:cat:dog:21` : value must be one of the items in the list; build list with any string or number separated by `:`