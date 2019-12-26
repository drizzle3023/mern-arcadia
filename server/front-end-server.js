
const clustering = false;
const cluster = require('cluster');
const express = require("express");
const router = express.Router();
const https = require("https");
const numCPUs = require('os').cpus().length;
const appFrontEnd = express();
const fs = require('fs');
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

    router.get('*', function(req, res){
        res.sendFile('index.html', { root: __dirname + '/../dist' });
    });

    appFrontEnd.use(express.static(__dirname + '/../dist'));

    appFrontEnd.use('/', router);

    https.createServer(httpsOptions, appFrontEnd).listen(443, function () {
        console.log("FrontEnd Server is running on port: " + 443)
    });
}


