const express = require("express")
const app = express();
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');


var apiRoute = require("./app/routes/routeApi.js");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const PORT = process.env.NODE_DOCKER_PORT || 3002;



//

app.use('/api', apiRoute);


app.listen(PORT, () => {
    console.log("server RND ready http://localhost:3002")
})
