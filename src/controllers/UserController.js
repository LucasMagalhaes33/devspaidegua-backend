const User = require('../models/User');
const Category = require('../models/Category');
const Ad = require('../models/Ad');
const { validationResult, matchedData } = require('express-validator');
const bcrypt = require('bcrypt');

module.exports = {

    /*
    TODO: 
    //RESOLVER PROBLEMA DO CAT.SLUG
    */

    info: async (req, res) => {
        let token =  req.query.token;

        const user = await User.findOne({token});
        const ads = await User.find({idUser: user._id.toString()});

        let adList = [];
        for(let i in ads){
            const cat = await Category.findById(ads[i].category);
            adList.push({...ads[i], 
            //category: cat.slug
            })
        }

        res.json({
            name: user.name,
            email: user.email,
            ads: adList
        });
    },
    editAction: async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.json({error: errors.mapped()});
            return;
        }
        const data = matchedData(req);

        let updates = {};

        // se a pessoa digitou o nome na atualização então muda o nome
        if(data.name){
            updates.name = data.name;
        }
        //se a pessoa digitou o email, primeiro realiza a busca se já existe um email igual, se existir manda um json com erros
        //se não existir, email é trocado
        if(data.email){
            const emailCheck = await User.findOne({email: data.email});
            if(emailCheck){
                res.json({error: `E-mail já existente!`});
                return;
            }
            
            updates.email = data.email;
        }

        if(data.password){
            updates.passwordHash = await bcrypt.hash(data.password, 10);
        }

        TODO: 
        //Atualizações de mudança de vendedor para visitante e vice-versa

        
        await User.findOneAndUpdate({token: data.token}, {$set: updates});
        
        res.json({});
    }
};