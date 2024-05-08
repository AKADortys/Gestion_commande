const { v4: uuidv4 } = require('uuid');

const ModelCommand = {
    command: []
}

ModelCommand.save = function (command) {
    if (command.id) {
        const existingCommandIndex = ModelCommand.command.findIndex(n => n.id === command.id);
        if (existingCommandIndex !== -1) {
            // Mettre à jour les propriétés de la commande existante
            ModelCommand.command[existingCommandIndex].id_user = command.id_user;
            ModelCommand.command[existingCommandIndex].date = new Date().toLocaleString();
            ModelCommand.command[existingCommandIndex].prix = command.products.reduce((total, product) => total + product.total, 0);
            ModelCommand.command[existingCommandIndex].recup = command.recup;
            ModelCommand.command[existingCommandIndex].confirm = command.confirm;
            ModelCommand.command[existingCommandIndex].products = command.products;
        }
    } else {
        command.id = uuidv4();
        ModelCommand.command.push(command);
    }
}




ModelCommand.delete = function (id) {
    const index = ModelCommand.command.findIndex(n => n.id === id);
    if (index !== -1) {
        ModelCommand.command.splice(index, 1);
        return true;
    } else {
        return false;
    }
}


ModelCommand.addArticle = (id, data) => {
    const commande = ModelCommand.command.find(n => n.id === id);
    
    if (commande) {
        if (!commande.products) {
            commande.products = [];
        }
        
        const existingArticleIndex = commande.products.findIndex(product => product.id === data.id);
        if (existingArticleIndex !== -1) {
            // L'article existe déjà, donc mettons à jour sa quantité
            commande.products[existingArticleIndex].quantite = data.quantite;
        } else {
            // L'article n'existe pas encore, alors ajoutons-le
            parseInt(data.quantite);
            commande.products.push(data);
        }
        
        return true;
    } else {
        // Gérer le cas où aucune commande n'est trouvée pour l'ID 
        res.statuts(404).send("La commande n'existe pas")
    }
}



ModelCommand.removeArticle = (commandID, artID) => {
    const command = ModelCommand.command.find(n => n.id === commandID);
    
    if (command) {
        const index = command.products.findIndex(product => product.id === artID);
        if (index !== -1) {
            command.products.splice(index, 1);
            return true;
        } else {
            res.statuts(404).send("L'article n'as été trouvé");
        }
    } else {
        res.statuts(404).send("La commande n'existe pas")
    }
}

ModelCommand.getCommandsByUser = function (id_user) {
    return ModelCommand.command.filter(command => command.id_user === id_user);
}


ModelCommand.getCommand = function (id) {
    const commande = ModelCommand.command.find(n => n.id === id);
    return commande
}

ModelCommand.getAll = () => {
    return ModelCommand.command
}

ModelCommand.showAll = () => {
    return  console.log(ModelCommand.command)
}

ModelCommand.getCommandFalse =(id) => {
    return ModelCommand.command.find(n => n.id_user === id && n.confirm === false)
}

module.exports = ModelCommand;