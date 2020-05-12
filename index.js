const express = require('express');
const app = express();
const path = require('path');
const sass = require('node-sass');
const sassMiddleware = require('node-sass-middleware');
const pugCopiler = require('./pug-copiler');

const routes = require("./src/routes");

express.static(path.join(__dirname, '/public'));
app.set('views', path.join(__dirname, '/src'));
app.set('view engine', 'pug');

app.use(
    sassMiddleware({
        src: __dirname + '/src', 
        dest: __dirname + '/public', 
        debug: true
    })
);

app.get('*', async function (req, res, next) {
    await pugCopiler();
    next();
});


app.use(routes);
app.listen(3000);