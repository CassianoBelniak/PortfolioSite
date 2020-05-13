const express = require('express');
const app = express();
const path = require('path');
const sass = require('node-sass');
const sassMiddleware = require('node-sass-middleware');
const pugCopiler = require('./pug-copiler');

const routes = require("./src/routes");

app.set('views', path.join(__dirname, '/src'));
app.set('view engine', 'pug');
app.use(routes);

app.use(
    sassMiddleware({
        src: __dirname + '/src', 
        dest: __dirname + '/public', 
        debug: true
    })
    );
    
    app.get('*', async function (req, res, next) {
        console.log('hi')
        await pugCopiler();
        next();
    });
    
app.use(express.static('public'));

app.listen(3000);