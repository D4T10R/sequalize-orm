const bodyParser = require('body-parser');
const pessoas = require('./pessoasRoutes')
const turmas = require('./turmasRoutes')
const niveis = require('./niveisRoutes')

module.exports = app => {
    app.use(
        bodyParser.json(),
        pessoas, 
        turmas,
        niveis
    );
}