//Se definen las rutas y los nombres de los procesos
const Users = require ('./auth.controller');
module.exports = (router) =>{
    router.post('/registro-cliente', Users.createUser);
    router.post('/login-clientes', Users.loginUser);
    
}
