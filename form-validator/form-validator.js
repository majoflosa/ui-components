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
            if ( !$field ) {
                console.warn( `The query selector ${field.selector} did not match any elements. Form validation not passed.` );
                // this.errors.push( `The query selector ${field.selector} did not match any elements. ` );
                this.formIsValid = false;
                return;
            }
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
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if ( value && !re.test(value.toLowerCase()) )
                    errors.push( 'This field must be a valid email address. ' );
            },
            'url': function( value, errors ) {
                const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

                if ( value && !re.test(value) )
                    errors.push( 'This field must be a valid url. ' );
            },
            'matches': function( value, errors, params ) {
                const $mold = document.querySelector( params[0] );
                if ( !$mold ) return errors.push( `There is no ${params[0]} field to match. `);

                const moldValue = $mold.value;
                if ( moldValue !== value )
                    errors.push( `Password confirmation does not match password. `)
            },
            'alphabet': function( value, errors ) {
                const re = /^[A-Za-z]+$/;
                if ( value && !re.test(value) )
                    errors.push( 'This field can only contain letters. ' );
            },
            'cap': function( value, errors ) {
                const re = /[A-Z]/;
                if ( value && !re.test(value) )
                    errors.push( 'This field must contain at least one capital letter. ' );
            },
            'noCaps': function( value, errors ) {
                const re = /^[a-z]+$/;
                if ( value && !re.test(value) )
                    errors.push( 'This field can only contain lowercase letters. ' );
            },
            'allCaps': function( value, errors ) {
                const re = /^[A-Z]+$/;
                if ( value && !re.test(value) )
                    errors.push( 'This field can only contain uppercase letters. ' );
            },
            'noSpaces': function( value, errors ) {
                if ( value && value.includes(' ') )
                    errors.push( 'This field cannot contain spaces. ' );
            },
            'alphaNumeric': function( value, errors ) {
                const re = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
                if ( value && !re.test(value) )
                    errors.push('This field must contain at least one letter and one number, and no special characters. ');
            },
            'number': function( value, errors ) {
                const re = /^[0-9]+$/;
                if ( value && !re.test(value) )
                    errors.push( 'This field can only contain numbers. ' );
            },
            'min': function( value, errors, params ) {
                if ( value && (+value < +params[0] || isNaN(+value)) )
                    errors.push( `This field must contain a number greater or equal to ${params[0]}. ` );
            },
            'max': function( value, errors, params ) {
                if ( value && (+value > +params[0] || isNaN(+value)) )
                    errors.push( `This field must contain a number that is less than or equal to ${params[0]}. ` );
            },
            'integer': function( value, errors ) {
                if ( value && (+value % 1 !== 0 || isNaN(+value)) )
                    errors.push( 'This field can only contain whole numbers. ' );
            },
            'decimal': function( value, errors ) {
                if ( value && (+value % 1 === 0 || isNaN(+value)) )
                    errors.push( 'This field must contain a decimal number. ' );
            },
            'contains': function( value, errors, params) {
                if ( value && !value.includes(params[0]) )
                    errors.push( `This field must contain "${params[0]}" in it. ` );
            },
            'inList': function( value, errors, params ) {
                const list = [...params];
                if ( value && !list.includes(value) )
                    errors.push( `This field must be one of: ${list.join(', ')} `)
            },
        }
    }
}

window.addEventListener('load', () => {
    const contactValidation = new FormValidation({
        formSelector: '.validation-form',
        fields: [
            { selector: '#name', rules: ['required'] },
            { selector: '#email', rules: ['email'] },
            { selector: '#password', rules: ['minLength:4'] },
            { selector: '#confirm-password', rules: ['matches:#password'] },
            { selector: '#url', rules: ['url'] },
            { selector: '#alphabet', rules: ['alphabet'] },
            { selector: '#cap', rules: ['cap'] },
            { selector: '#all-caps', rules: ['allCaps'] },
            { selector: '#no-caps', rules: ['noCaps'] },
            { selector: '#no-spaces', rules: ['noSpaces'] },
            { selector: '#alphanumeric', rules: ['alphaNumeric'] },
            { selector: '#number', rules: ['number'] },
            { selector: '#min', rules: ['min:5'] },
            { selector: '#max', rules: ['max:10'] },
            { selector: '#integer', rules: ['integer'] },
            { selector: '#decimal', rules: ['decimal'] },
            { selector: '#contains', rules: ['contains:dog'] },
            { selector: '#in-list', rules: ['inList:dog:cat:5'] },
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