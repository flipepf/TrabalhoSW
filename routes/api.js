var express = require('express')
var router = express.Router()

const Produto = require('../Model/Produto')
const ProdutoDao = require('../Model/ProdutoDAO')

var dao = new ProdutoDao();

/* GET */
router.get('/produtos', function(req, res) {
   res.send(dao.getAll())
})

/* POST */
router.post('/produtos', function(req, res) {
   if (req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.send("Objeto vazio")
   } else {
      var envio = req.body //PEGA O CONTEUDO PASSADO NA REQUISIÇÃO
      var Prod = new Produto(envio.id, envio.nome, envio.descricao, envio.preco, envio.categoria) //CRIA O OBJETO COM O CONTEÚDO PASSADO NA REQUISIÇÃO
      var resposta = dao.add(Prod) //ARMAZENA O OBJETO NO ARRAY
      res.send(JSON.stringify(resposta))
   }
})

/* PUT */
router.put('/produtos/:id', function(req, res) {
   if (req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.send("Objeto vazio")
   } else { 
      var obj = req.body //PEGA O CONTEUDO PASSADO NA REQUISIÇÃO
      var id = req.params.id //PEGA O ID PASSADO POR PARAMETRO
      var resposta = dao.update(obj, parseInt(id)) //REALIZA O UPDATE
      if (resposta!=null) res.send(JSON.stringify(resposta))
      else res.send("Produto não localizado")
   }
})

/* DELETE */
router.delete('/produtos/:id', function(req, res) {
   var id = req.params.id //PEGA O ID PASSADO POR PARAMETRO
   var index = dao.remove(parseInt(id));
   if (index!=null) res.send("Produto de ID: "+id+" removido!")
   else res.send("Produto não localizado")
})

module.exports = router