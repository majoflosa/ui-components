class FormValidation {
    constructor( options ) {
        // form to validate
        this.$form = document.querySelector( options.formSelector );
        // abort function if there is no form to validate
        if ( !this.$form ) {
            console.warn( `The provided query selector ${options.formSelector} did not match any elements on the document. Aborting validation.` );

            return false;
        }

        // fields to validate
        this.fields = options.fields;
        // query selector for element containing error messages
        this.errorSelector = options.errorSelector;
        // store of possible errors
        this.errors = [];
        // css class to add to fields with errors
        this.errorClass = options.errorClass || 'error-field';

        // disable browser's default validation
        this.$form.noValidate = true;
        // initiate main control for validity
        this.formIsValid = true;
        // object containing all test functions for each rule
        this.validationTests = this.tests();

        // bind all methods' context to this instance
        this.bindEvents = this.bindEvents.bind( this );
        this.validate = this.validate.bind( this );
        this.checkRules = this.checkRules.bind( this );
        this.tests = this.tests.bind( this );
        this.resetForm = this.resetForm.bind( this );

        // bind relevant events to their handlers
        this.bindEvents();
    }
    
    bindEvents() {
        this.$form.addEventListener( 'submit', this.validate );
        this.$form.addEventListener( 'reset', this.resetForm );
    }

    validate( event ) {
        // reset errors, in case validation has already been tried
        this.errors = [];

        // loop through each field to validate
        this.fields.forEach( field => {
            // the field's HTML element
            const $field = document.querySelector( field.selector );
            // make form invalid if the field does not exist
            if ( !$field ) {
                console.warn( `The query selector ${field.selector} did not match any elements. Form validation not passed.` );
                this.formIsValid = false;
                return;
            }
            // html element containing possible error messages
            const $fieldError = $field.parentElement.querySelector( this.errorSelector );
            
            // reset error text, in case validation was already tried
            $fieldError.innerText = '';
            // store this field's error messages
            field.errors = [];
            // loop through the field's rules
            this.checkRules( $field.value, field.rules, field.errors );
            
            // add this field's errors to main form's errors
            this.errors.push( ...field.errors );
            
            if ( this.errors.length ) {
                // if errors exist in main form, form is not valid
                this.formIsValid = false;
                
                // if errors exist in this field, add class to style errors; else remove class
                if ( field.errors.length ) $field.classList.add( this.errorClass );
                else $field.classList.remove( this.errorClass );
                
                // add messages to errors container element
                $fieldError.innerText = field.errors.join(' | ');
            } else {
                // if no errors exist in main form at this point, form remains valid
                this.formIsValid = true;
                // remove any error styling
                $field.classList.remove( this.errorClass );
            }
            
        });
        
        // prevent form submission if form is invalid after all fields were tested
        if ( !this.formIsValid ) event.preventDefault();
    }

    checkRules( value, rules, errors ) {
        // loop through each of the fields' rules
        rules.forEach( rule => {
            if ( rule.includes(':') ) {
                // if rule has parameters, extract rule name, and turn all other divisions into array of params
                const split = rule.split(':');
                const _rule = split.shift();
                const params = [...split];
                
                // invoke the rule's test function with its params
                this.validationTests[_rule](value, errors, params);
            } else {
                // if rule has no parameters, invoke the rule's test function
                this.validationTests[rule](value, errors);
            }
        });
    }

    resetForm() {
        // loop through each field
        this.fields.forEach( field => {
            // the fields html element
            const $field = document.querySelector( field.selector );
            // end this iteration if no such field exists
            if ( !$field ) {
                console.warn( `The query selector ${field.selector} did not match any elements. Form validation not passed.` );
                return;
            }
            // html element for error message container
            const $fieldError = $field.parentElement.querySelector( this.errorSelector );
            
            // reset error message text to blank
            $fieldError.innerText = '';
            // remove error styles
            $field.classList.remove( this.errorClass );
            // reset this field's errors
            field.errors = [];
        });

        // reset main form errors
        this.errors = [];
    }

    tests() {
        return {
            // field cannot be blank
            'required': function( value, errors ) {
                if ( !value.length ) errors.push( 'This field is required. ' );
            },
            // field must have a minimum length
            'minLength': function( value, errors, params ) {
                if ( value.length < +params[0] ) 
                    errors.push( `This field must be at least ${params[0]} characters long. Length submitted: ${value.length} `);
            },
            // field cannot exceed a maximum length
            'maxLength': function( value, errors, params ) {
                if ( value.length > +params[0] )
                    errors.push( `This field cannot exceed ${params[0]} characters. Length submitted: ${value.length} `);
            },
            // field must have an exact length
            'length': function( value, errors, params ) {
                if ( value.length !== +params[0] )
                    errors.push( `This field must be ${params[0]} characters long. Length submitted: ${value.length} `);
            },
            // field must be a valid email addres
            'email': function( value, errors ) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if ( value && !re.test(value.toLowerCase()) )
                    errors.push( 'This field must be a valid email address. ' );
            },
            // field must be a valid url
            'url': function( value, errors ) {
                const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

                if ( value && !re.test(value) )
                    errors.push( 'This field must be a valid url. ' );
            },
            // field must match another specified field
            'matches': function( value, errors, params ) {
                const $mold = document.querySelector( params[0] );
                if ( !$mold ) return errors.push( `There is no ${params[0]} field to match. `);

                const moldValue = $mold.value;
                if ( moldValue !== value )
                    errors.push( `Password confirmation does not match password. `)
            },
            // field can only contain letters
            'alphabet': function( value, errors ) {
                const re = /^[A-Za-z]+$/;
                if ( value && !re.test(value) )
                    errors.push( 'This field can only contain letters. ' );
            },
            // field must have at least one capital letter
            'cap': function( value, errors ) {
                const re = /[A-Z]/;
                if ( value && !re.test(value) )
                    errors.push( 'This field must contain at least one capital letter. ' );
            },
            // field cannot contain capital letters
            'noCaps': function( value, errors ) {
                const re = /^[a-z]+$/;
                if ( value && !re.test(value) )
                    errors.push( 'This field can only contain lowercase letters. ' );
            },
            // field must be all capital letters
            'allCaps': function( value, errors ) {
                const re = /^[A-Z]+$/;
                if ( value && !re.test(value) )
                    errors.push( 'This field can only contain uppercase letters. ' );
            },
            // field cannot contain white spaces
            'noSpaces': function( value, errors ) {
                if ( value && value.includes(' ') )
                    errors.push( 'This field cannot contain spaces. ' );
            },
            // field must contain at least one number and one letter, no special characters
            'alphaNumeric': function( value, errors ) {
                const re = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
                if ( value && !re.test(value) )
                    errors.push('This field must contain at least one letter and one number, and no special characters. ');
            },
            // field can only contain numbers
            'number': function( value, errors ) {
                const re = /^[0-9]+$/;
                if ( value && !re.test(value) )
                    errors.push( 'This field can only contain numbers. ' );
            },
            // field must contain a number greater or equal to specified number
            'min': function( value, errors, params ) {
                if ( value && (+value < +params[0] || isNaN(+value)) )
                    errors.push( `This field must contain a number greater or equal to ${params[0]}. ` );
            },
            // field must contain a number less than or equal to specified number
            'max': function( value, errors, params ) {
                if ( value && (+value > +params[0] || isNaN(+value)) )
                    errors.push( `This field must contain a number that is less than or equal to ${params[0]}. ` );
            },
            // field must contain an integer
            'integer': function( value, errors ) {
                if ( value && (+value % 1 !== 0 || isNaN(+value)) )
                    errors.push( 'This field can only contain whole numbers. ' );
            },
            // field must contain decimal number
            'decimal': function( value, errors ) {
                if ( value && (+value % 1 === 0 || isNaN(+value)) )
                    errors.push( 'This field must contain a decimal number. ' );
            },
            // field must contain specified phrase
            'contains': function( value, errors, params) {
                if ( value && !value.includes(params[0]) )
                    errors.push( `This field must contain "${params[0]}" in it. ` );
            },
            // field must be one of specified list of phrases
            'inList': function( value, errors, params ) {
                if ( value && !params.includes(value) )
                    errors.push( `This field must be one of: ${list.join(', ')} `)
            },
        }
    }
}

window.addEventListener('load', () => {
    const contactValidation = new FormValidation({
        formSelector: '.validation-form',
        fields: [
            // for each field to be evaluated, provide query selector and array of rules
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
        errorSelector: '.error-message',
        errorClass: 'error-field' // optional; defaults to 'error-field'
    });
});
