var express = require('express')
var router = express.Router()

var jwt = require('jsonwebtoken') //para usar a API
const SECRET = 'senha'

const Produto = require('../Model/Produto')
const ProdutoDao = require('../Model/ProdutoDAO')
const auth = require('../middlewares/authenctication')

var dao = new ProdutoDao();
var isLogin = false

/* GET */
router.get('/produtos', function(req, res) {
   res.status(200).send(dao.getAll())
})

router.get('/produtos/:id', function(req, res) {
   var id = req.params.id
   resposta = dao.getById(parseInt(id))
   if (resposta!=null) {
      res.status(200).send({ status: 200, message: JSON.stringify(resposta)})
   } else {
      res.status(404).send({ status: 404, message: "Produto não localizado",
     })
   }
})

/* POST */
router.post('/produtos', function(req, res) {
   if (!isLogin){
      res.status(403).send({ status: 403, message: "Necessário efetuar login para acessar este recurso!"})
   } else {
      if (req.body.constructor === Object && Object.keys(req.body).length === 0){
         res.status(400).send({ status: 400, message: "Parametro vazio" })
      } else {
         var envio = req.body //PEGA O CONTEUDO PASSADO NA REQUISIÇÃO
         var Prod = new Produto(envio.id, envio.nome, envio.descricao, envio.preco, envio.categoria) //CRIA O OBJETO COM O CONTEÚDO PASSADO NA REQUISIÇÃO
         var resposta = dao.add(Prod) //ARMAZENA O OBJETO NO ARRAY
         if (resposta!=null){
            res.status(201).send({ status: 201, message: "Produto cadastrado com sucesso!" })
         } else {
            res.status(409).send({ status: 400, message: "ID "+envio.id+" já cadastrado" })
         }
      }
   }
})

/* PUT */
router.put('/produtos/:id', function(req, res) {
   if (!isLogin){
      res.status(403).send({ status: 403, message: "Necessário efetuar login para acessar este recurso!"})
   } else {      
      if (req.body.constructor === Object && Object.keys(req.body).length === 0){
         res.status(400).send({ status: 400, message: "Parametro vazio" })
      } else { 
         var obj = req.body 
         var id = req.params.id 
         var resposta = dao.update(obj, parseInt(id)) 
         if (resposta!=null){
            res.status(200).send({ status: 200, message: "Produto de ID: "+id+" alterado com sucesso!" })
         } else {
            res.status(404).send({ status: 404, message: "Produto não localizado" })
         }
      }
   }
})

/* DELETE */
router.delete('/produtos/:id', function(req, res) {
   if (!isLogin){
      res.status(403).send({ status: 403, message: "Necessário efetuar login para acessar este recurso!"})
   } else {     
      var id = req.params.id
      var index = dao.remove(parseInt(id))
      if (index!=null) {
         res.status(200).send({ status: 201, message: "Produto de ID: "+id+" removido!"})
      } else {
         res.status(404).send({ status: 404, message: "Produto não localizado"})
      }
   }
})

//########################################################################################## LOGIN
router.post('/login', function(req, res) { 
   console.log('login...')   
   if (req.body.user ==='aluno' && req.body.pass ==='ifsul'){
      var payload = {
         user: req.body.user,
         role: 'admin',
         id: 1
      }
      var token = jwt.sign(payload, SECRET, { expiresIn: '5m'})
      res.status(200).send({ auth: true, token: token})
      isLogin = true
      console.log('usuario logado...')
   } else {
      res.status(401).send({ user: 'user', pass: 'pass'})
   }
})

router.get('/session', verificaToken, function (req, res, next) {
   var data = req.userData
   res.statusCode = 200
    res.send('Token OK')
  })
  
function verificaToken(req, res, next) {
   var token = req.headers.authorization;
   if (!token)
     return res.status(401).send({ message: 'Token não foi fornecido.' });
   
   jwt.verify(token, SECRET, function (err, payload) {
     if (err)
       return res.status(403).send({ auth: false, message: 'Failed to authenticate token.' });
     req.userData = payload;
     next();
   })
}

router.get('/logout', function(req, res) {
   isLogin = false
   res.status(200).send({ auth: false, token: null });
});

module.exports = router