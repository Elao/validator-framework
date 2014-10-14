var _           = require('underscore'),
    validator   = require('./src/validator.js'),
    Promise     = require('bluebird'),
    util        = require('util');

/**
 *  OK - Vérifier les groupes de validation
 * - Tester le dependsOn
 * - Rajouter les erreurs consolidées en flat
 * - Rajouter le fail on first error
 * - Remettre le code au propre
 * - Rajouter un callback pre-clean
 * - Rajouter un callback post
 * - Rajouter la notion de validateur global
 * - Enrober les datas d'un data accessor permettant d'avoir une hierarchie
 */

/*
Validated.getErrors();
Validated.getErrors(true); // Flated errors
*/


/*
try{
    validator.Validator('required')
} catch(e) {
    console.log(e);
    console.log("Is error : ", util.isError(e));
    console.log("Instance of ruleerror : ", e instanceof validator.RulesConfigurationError);
    console.log(util.inspect(e));
}
*/

function debug()
{
    var log = "";
    _.each(arguments, function(v, k) {
        if (_.isObject(v)) {
            log += util.inspect(v, false, null);
        } else {
            log += v;
        }
    });
    console.log(log);
}

var rules = {
    username: {
        _label:   "Nom d'utilisateur",
        required: {
            value:      true
        },
        minLength: {
            value:      true
        }
    },
    toto: {
        _label:  "Le label de toto",
        isEmail: true
    },
    _post: [
        {
            always:   true, // Only apply if field validations succeed or all the time if true
            callback: function() { return new Error('Something went wrong') },
            params:   {p1: 'bla bla bla'}
        }
    ]
};

var rules2 = {
    emails: {
        isArray: true,
        contentValues: {
            isEmail: true
        }
    }
}

var data2 = {
    emails: ['toto', 'titi@tata.com', 1, 'plurp', 'dudu@didi.com']
}

validator.ObjectValidator(rules2).validate(data2)
.then(function() { console.log("success"); })
.catch(function(e) {
    console.log(e.flat());
})


/*
var obConfig = {
    labelizer: function(path) { return path.toUpperCase()+"_custom_label_de_ouf_by_labelizer" }
}
var ov = validator.ObjectValidator(rules, obConfig);


ov.validate({toto: "titi"}).then(function(data) { console.log("success with ", data); })
               .catch(function(error) {
                    console.log(error.flat());
               })*/

/*
var v = validator.FieldValidator({isEmail: true});
console.log(v.getConfig());
v.setConfig({
    errors: {
        messages: {
            invalid: "Fuck you"
        }
    }
})
console.log(v.getConfig());
*/

/*
validator.FieldValidator({
    required: {
        value:      true,
        message:    'This fucking %%field%% is required baby',
        groups:     ['default']
    },
    isEmail: {
        value: true
    }
}, 'email')
    .validate()
    .then(function(data) {
        debug("Clean data: ");
        debug(data);
    })
    .catch(function(errors) {
        debug("Error data: ", typeof errors);
        debug(util.isError(errors) ? "is error" : "is not error");
        debug(errors instanceof validator.FieldValidatorError);
        debug(errors);
    })
*/

