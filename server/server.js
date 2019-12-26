
const clustering = false;
const cluster = require('cluster');
const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const https = require("https");
const numCPUs = require('os').cpus().length;
const appFrontEnd = express();
const appBackEnd = express();
const upload = require("express-fileupload");
const mongoose = require("mongoose");
const fs = require('fs');
const defaultPortWhenIndividual = 5000;
const runIndividually = false;
const port = process.env.PORT || (!runIndividually ? 443 : defaultPortWhenIndividual);
const mongoURI = 'mongodb://localhost:27017/arcadia';
const httpsOptions = {
    key: fs.readFileSync("./myarcadia.io.key"),
    cert: fs.readFileSync("./myarcadia_io.crt"),

    ca: [
        fs.readFileSync('./myarcadia_io.ca-bundle')
    ]
};

if (clustering && cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    //Check if work id is died
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });

} else {
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

    router.get('*', function(req, res){
        res.sendFile('index.html', { root: __dirname + '/../dist' });
    });

    if (!runIndividually) {
        appFrontEnd.use(express.static(__dirname + '/../dist'));
    }

    appFrontEnd.use('/', router);

    appBackEnd.use("/site", require("./routes/site"));

    https.createServer(httpsOptions, appBackEnd).listen(defaultPortWhenIndividual, function () {
        console.log("BackEnd Server is running on port: " + defaultPortWhenIndividual)
    });

    if (!runIndividually) {
        https.createServer(httpsOptions, appFrontEnd).listen(443, function () {
            console.log("FrontEnd Server is running on port: " + 443)
        });
    }
}


