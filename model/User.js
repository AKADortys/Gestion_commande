const { v4: uuidv4 } = require('uuid');
const ModelUser =
{
    user: []
}


ModelUser.save = function (users) {
    if (users.id) {
        const utilisateur = ModelUser.user.find(u => u.id === users.id);
        if (utilisateur) {
            utilisateur.nom = users.nom;
            if(users.pwd){utilisateur.pwd = users.pwd};
            utilisateur.prenom = users.prenom;
            utilisateur.telephone = users.telephone;
            utilisateur.mail = users.mail 
        }
    }else {

        users.id = uuidv4();
        ModelUser.user.push(users);
    }

}

ModelUser.getAll = function () {
    return ModelUser.user
}

ModelUser.show = function () {
    (ModelUser.user)
}

ModelUser.delete = function (id) {
    const index = ModelUser.user.find(u => u.id === id);
    if (index) {
        ModelUser.user.splice(id, 1)
        return true
    } else {
        return false
    }
}

ModelUser.getUser = function (id) {
    const user = ModelUser.user.find(n => n.id === id);
    return user
}

module.exports = ModelUser;