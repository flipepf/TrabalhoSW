const Produto = require('./Produto');

module.exports =  class ProdutoDAO{
    constructor(  ){
        this.Produtos = []
    }

    add(Produto){
        this.Produtos[(this.Produtos.length)] = Produto
        return Produto
    }

    getAll(){ return this.Produtos }
    
    remove(id){
        var index = this.getIndex(id)
        if (index!=null) this.Produtos.splice(index,1)
        return index
    }

    update(Produto, id){
        var index = this.getIndex(id)
        if (index!=null) this.Produtos[index] = Produto
        else return index
        return Produto
    }

    getById(id){
        for (var i=0; i<this.Produtos.length; i++) {
            if (this.Produtos[i].id === id) return this.Produtos[i]
        }
        return null
    }

    getIndex(id){
        for (var i=0; i<this.Produtos.length; i++) {
            if (this.Produtos[i].id === id) return i 
        }
        return null
    }
}