const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const https = require("https");
const appBackEnd = express();
const upload = require("express-fileupload");
const mongoose = require("mongoose");
const fs = require('fs');
const defaultPortWhenIndividual = 5000;
const mongoURI = 'mongodb://localhost:27017/arcadia';
const httpsOptions = {
    key: fs.readFileSync("./myarcadia.io.key"),
    cert: fs.readFileSync("./myarcadia_io.crt"),

    ca: [
        fs.readFileSync('./myarcadia_io.ca-bundle')
    ]
};

// This is Workers can share any TCP connection
// It will be initialized using express
console.log(`Worker ${process.pid} started`);

appBackEnd.use(bodyParser.json());
appBackEnd.use(cors());
appBackEnd.use(upload());
appBackEnd.use(bodyParser.urlencoded({extended: false}));

mongoose.connect(mongoURI, {useNewUrlParser: true})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

appBackEnd.use("/site", require("./routes/site.js"));

/*
https.createServer(httpsOptions, appBackEnd).listen(defaultPortWhenIndividual, function () {
    console.log("BackEnd Server is running on port: " + defaultPortWhenIndividual)
});
*/
appBackEnd.listen(defaultPortWhenIndividual, function() {
    console.log("BackEnd Server is running on port: " + defaultPortWhenIndividual);
});