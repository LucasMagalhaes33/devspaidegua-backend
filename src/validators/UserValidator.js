const { checkSchema } = require('express-validator');

module.exports = {

    editAction: checkSchema ({
        token: {
            notEmpty: true
        },
        name: {
            optional: true,
            trim: true,
            isLength: {options: { min: 2 }},
            errorMessage: 'Nome precisa ter pelo menos 2 caracteres'
        },
        email: {
            optional: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'Insira um email válido'
        },
        password: {
            optional: true,
            isLength: {options: { min: 6 }},
            errorMessage: 'Senha precisa ter pelo menos 6 caracteres'
        },
        isSeller:  {
            optional: true,
            isBoolean: true,
            notEmpty: true,
            errorMessage: 'Precisa selecionar o tipo de usuário'
        }
    })

}