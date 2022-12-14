const express = require('express');
const router = express.Router();

const Auth = require('./middlewares/Auth');

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const AdsController = require('./controllers/AdsController');

const AuthValidator = require('./validators/AuthValidator');
const UserValidatorJs = require('./validators/UserValidator.Js');

router.get('/ping', (req, res)=> {
    res.json({pong: true});
})

//rota de cadastro e login
router.post('/user/signin', AuthValidator.signin , AuthController.signin);
router.post('/user/signup', AuthValidator.signup , AuthController.signup);

//rota de listar as informações do próprio usuario e edição do usuário
router.get('/user/me', Auth.private , UserController.info);
router.put('/user/me', UserValidatorJs.editAction ,Auth.private , UserController.editAction);

//listar categoria
router.get('/categories', AdsController.getCategories);

//listar e adicionar o assunto
router.post('/ad/add', Auth.private , AdsController.addAction);
router.get('/ad/list', AdsController.getList);
router.get('ad/item', AdsController.getItem);
router.post('/ad/:id', Auth.private ,AdsController.editAction);

module.exports = router;