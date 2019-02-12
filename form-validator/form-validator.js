class FormValidation {
    constructor( options ) {
        this.$form = document.querySelector( options.formSelector );
        if ( !this.$form ) {
            console.warn( `The provided query selector ${options.formSelector} did not match any elements on the document.` );

            return false;
        }

        this.fields = options.fields;
        this.errorSelector = options.errorSelector;
        this.errors = [];

        this.$form.noValidate = true;
        this.formIsValid = true;
        this.validationTests = this.tests();

        this.bindEvents = this.bindEvents.bind( this );
        this.validate = this.validate.bind( this );
        this.checkRules = this.checkRules.bind( this );
        this.tests = this.tests.bind( this );
        this.resetForm = this.resetForm.bind( this );

        this.bindEvents();
    }
    
    bindEvents() {
        this.$form.addEventListener( 'submit', this.validate );
        this.$form.addEventListener( 'reset', this.resetForm );
    }

    validate( event ) {
        this.errors = [];

        this.fields.forEach( field => {
            const $field = document.querySelector( field.selector );
            const $fieldError = $field.parentElement.querySelector( this.errorSelector );
            
            $fieldError.innerText = '';
            field.errors = [];
            this.checkRules( $field.value, field.rules, field.errors );
            
            this.errors.push( ...field.errors );
            
            if ( this.errors.length ) {
                this.formIsValid = false;
                
                if ( field.errors.length ) $field.classList.add( 'error-field' );
                else $field.classList.remove( 'error-field' );
                
                $fieldError.innerText = field.errors.join(' | ');
            } else {
                this.formIsValid = true;
                
                $field.classList.remove( 'error-field' );
            }
            
        });
        
        if ( !this.formIsValid ) event.preventDefault();
    }

    checkRules( value, rules, errors ) {
        rules.forEach( rule => {
            if ( rule.includes(':') ) {
                const split = rule.split(':');
                const _rule = split.shift();
                const params = [...split];

                this.validationTests[_rule](value, errors, params);
            } else {
                this.validationTests[rule](value, errors);
            }
        });
    }

    resetForm() {
        this.fields.forEach( field => {
            const $field = document.querySelector( field.selector );
            const $fieldError = $field.parentElement.querySelector( this.errorSelector );
            
            $fieldError.innerText = '';
            $field.classList.remove( 'error-field' );
            field.errors = [];
            this.errors = [];
        });
    }

    tests() {
        return {
            'required': function( value, errors ) {
                if ( !value.length ) errors.push( 'This field is required. ' );
            },
            'minLength': function( value, errors, params ) {
                if ( value.length < +params[0] ) 
                    errors.push( `This field must be at least ${params[0]} characters long. Length submitted: ${value.length} `);
            },
            'maxLength': function( value, errors, params ) {
                if ( value.length > +params[0] )
                    errors.push( `This field cannot exceed ${params[0]} characters. Length submitted: ${value.length} `);
            },
            'length': function( value, errors, params ) {
                if ( value.length !== +params[0] )
                    errors.push( `This field must be ${params[0]} characters long. Length submitted: ${value.length} `);
            },
            'email': function( value, errors ) {
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if ( !re.test(value.toLowerCase()) )
                    errors.push( 'This field must be a valid email address.' );
            },
            'url': function( value, errors ) {},
            'matches': function( value, errors, params ) {
                const $mold = document.querySelector( params[0] );
                if ( !$mold ) return errors.push( `There is no ${params[0]} field to match.`);

                const moldValue = $mold.value;
                if ( moldValue !== value )
                    errors.push( `Password confirmation does not match password.`)
            },
            'alphabet': function( value, errors ) {},
            'cap': function( value, errors ) {},
            'allCaps': function( value, errors ) {},
            'noCaps': function( value, errors ) {},
            'noSpaces': function( value, errors ) {},
            'alphaNumeric': function( value, errors ) {},
            'number': function( value, errors ) {},
            'min': function( value, errors, params ) {},
            'max': function( value, errors, params ) {},
            'integer': function( value, errors ) {},
            'decimal': function( value, errors ) {},
            'contains': function( value, errors, params) {},
            'inList': function( value, errors, params ) {},
        }
    }
}

window.addEventListener('load', () => {
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
});

/* 
required
email
url
minLength:2 >>> at least 2 characters
maxLength:20 >>> at most 20 characters
length:12 >>> exactly 12 characters
matches:#password >>> must have same value as #password
alphabet >>> only letters allowed
cap >>> at least one capital
allCaps
noCaps
alphaNumeric >>> must have at least 1 letter and 1 number
noSpaces
number >>> must be number
min:5 >>> must be number > 4
max:50 >>> must be number < 51
integer
decimal
contains:dog >>> must have 'dog' somewhere
inList:cat:dog:21 >>> value must be one of the items in the list
*/