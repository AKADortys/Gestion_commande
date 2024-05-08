const { v4: uuidv4 } = require('uuid');

const ModelProduct = {
    product: []
}

ModelProduct.save = function(produit) {
    if(produit.id){
       const newProduct = ModelProduct.product.find(i => i.id === produit.id);
       if(newProduct){
        newProduct.designation = produit.designation;
        newProduct.description = produit.description;
        newProduct.prix = produit.prix;
        newProduct.info = produit.info;
       }
    } else {
        produit.id = uuidv4();
        ModelProduct.product.push(produit);
    }
}

ModelProduct.delete = function (id) {
    const produit = ModelProduct.product.find(i => i.id === id);
    if (produit) {
        ModelProduct.product.splice(id,1)
        return true
    } else {

        return console.log('Le produit n\'exite pas')
    }
}

ModelProduct.getProduct = function (id) {
    const produit = ModelProduct.product.find(i => i.id === id);
    return produit;
}

ModelProduct.getAll = () => {
    return ModelProduct.product
}

module.exports = ModelProduct;
