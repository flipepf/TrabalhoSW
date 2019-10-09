var express = require('express')
var router = express.Router()

const Produto = require('../Model/Produto')
const ProdutoDao = require('../Model/ProdutoDAO')

var dao = new ProdutoDao();

/* GET */
router.get('/produtos', function(req, res) {
   res.status(200)
   res.send(dao.getAll())
})

router.get('/produtos/:id', function(req, res) {
   var id = req.params.id
   resposta = dao.getById(parseInt(id))
   if (resposta!=null) {
      res.status(200)
      res.send(JSON.stringify(resposta))
   } else {
      res.status(404)
      res.send("Produto não localizado")
   }
})

/* POST */
router.post('/produtos', function(req, res) {
   if (req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400)
      res.send("Parametro vazio")
   } else {
      var envio = req.body //PEGA O CONTEUDO PASSADO NA REQUISIÇÃO
      var Prod = new Produto(envio.id, envio.nome, envio.descricao, envio.preco, envio.categoria) //CRIA O OBJETO COM O CONTEÚDO PASSADO NA REQUISIÇÃO
      var resposta = dao.add(Prod) //ARMAZENA O OBJETO NO ARRAY
      if (resposta!=null){
         res.status(201)
         res.send("Produto cadastrado com sucesso!")
      } else {
         res.status(409)
         res.send("ID "+envio.id+" já cadastrado")
      }
   }
})

/* PUT */
router.put('/produtos/:id', function(req, res) {
   if (req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400)
      res.send("Parametro vazio")
   } else { 
      var obj = req.body 
      var id = req.params.id 
      var resposta = dao.update(obj, parseInt(id)) 
      if (resposta!=null){
         res.status(200)
         res.send("Produto de ID: "+id+" alterado com sucesso!")
      } else {
         res.status(404)
         res.send("Produto não localizado")
      }
   }
})

/* DELETE */
router.delete('/produtos/:id', function(req, res) {
   var id = req.params.id
   var index = dao.remove(parseInt(id));
   if (index!=null) {
      res.status(200)
      res.send("Produto de ID: "+id+" removido!")
   }
   else {
      res.status(404)
      res.send("Produto não localizado")
   }
})

module.exports = router