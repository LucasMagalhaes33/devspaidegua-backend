const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');

//validationResult verifica se deu erro
//matchedData pega o resultado final

const User = require('../models/User');

module.exports = {

    signin: async (req, res) => {

    },
    signup: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.json({error: errors.mapped()});
            return;
        }
        const data = matchedData(req);

        //verificando se email já existe
        const user = await User.findOne({
            email: data.email
        });

        if(user) {
            res.json({
                error: {email: {msg: 'Email já cadastrado'}}
            });
            return;
        }

        const passwordHash = await bcrypt.hash(data.password, 10);

        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        const newUser = new User({
            name: data.name,
            email: data.email,
            passwordHash,
            token
        });

        await newUser.save();

        res.json({token});
    }

};