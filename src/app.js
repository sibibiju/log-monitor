const server = require('./controllers/server');
const config = require('./config/config');

let port = config.PORT || 3000;
server.listen(port, () => {
    console.log('--Listening on PORT = ', port);
});