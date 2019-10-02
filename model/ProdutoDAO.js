const Produto = require('./Produto');

module.exports =  class ProdutoDAO{
    constructor(  ){
        this.Produtos = [];
    }

    add(Produto){
        this.Produtos[Produto.id] = Produto;
        return Produto;
    }

    getAll(){
        return this.Produtos;
    }
    
    get(id){
        return this.Produtos[id];
    }

    remove(id){
        this.Produtos.splice(id,1);
    }

    update(Produto){
        this.Produtos[Produto.id] = Produto;
        return Produto;
    }
    
}