const { checkSchema } = require('express-validator');

module.exports = {

    signup: checkSchema ({
        name: {
            trim: true,
            isLength: {options: { min: 2 }},
            errorMessage: 'Nome precisa ter pelo menos 2 caracteres'
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'Insira um email válido'
        },
        password: {
            isLength: {options: { min: 6 }},
            errorMessage: 'Senha precisa ter pelo menos 6 caracteres'
        },
        isSeller:  {
            notEmpty: true,
            errorMessage: 'Precisa selecionar o tipo de usuário'
        }
    }),
    signin: checkSchema ({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'Insira um email válido'
        },
        password: {
            isLength: {options: { min: 6 }},
            errorMessage: 'Senha precisa ter pelo menos 6 caracteres'
        }
    })

}