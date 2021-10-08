const express = require('express');
const logger = require('./logger');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');

const app = express();
const server = http.createServer(app);

const io = require('./socket')(server);

let filePath = path.join(__dirname, '../test/timestamp.log');

//app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
    //return res.render(index);
    return res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
        .render('index')
});

app.get('/logs', () => {

});

logger.watch(filePath);

module.exports = server;