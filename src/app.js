const express = require('express'),
    app = express(),
    routes = require('./routes/index');

const host = '127.0.0.1';
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.use('', routes);

app.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
);