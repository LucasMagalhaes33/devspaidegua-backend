const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');

//validationResult verifica se deu erro
//matchedData pega o resultado final

const User = require('../models/User');

module.exports = {

    signin: async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.json({error: errors.mapped()});
            return;
        }
        const data = matchedData(req);

        //validando o email
        const user = await User.findOne({email: data.email});
        if(!user){
            res.json({error: 'Email ou senha inválidos'});
            return;
        }
        
        //validando a senha
        const match = await bcrypt.compare(data.password, user.passwordHash);
        if(!match){
            res.json({error: 'Email ou senha inválidos'});
            return;
        }

        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        user.token = token;
        await user.save();

        res.json({token, email: data.email});

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
            token,
            isSeller
        });

        await newUser.save();

        res.json({token});
    }

};