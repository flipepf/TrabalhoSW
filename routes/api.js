var express = require('express')
var router = express.Router()

const Produto = require('../Model/Produto')
const ProdutoDao = require('../Model/ProdutoDAO')

var dao = new ProdutoDao();

var Produto1 = new Produto(0, 'Frango Teriaki', 'Frango com molho shoio ', 18.99, 'Pratos Quentes' )
var Produto2 = new Produto(1, 'Yaksoba Vegetariano', 'yaksoba sem carne ', 15.99, 'Pratos Quentes' )
var Produto3 = new Produto(2, 'Uramaki de Salmão', 'Enrolado de arroz com file de salmão ', 20.99, 'Uramakis' )
var Produto4 = new Produto(3, 'Temaki California', 'Canudo de arroz com pepino, manga e kani', 18.99, 'Temaki' )

dao.add(Produto1)
/* GET */
router.get('/produtos', function(req, res) {
   res.send(dao.getAll())
})

module.exports = router