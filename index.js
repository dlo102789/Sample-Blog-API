const express = require('express');
const path = require('path');
const port = 9000;
var app = express();

require('./routes/routes')(app);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');



app.listen(port, () => console.log("Server running on port " + port));



