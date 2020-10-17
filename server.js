const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser'); //Set up a REST API

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

//catch all for all http verb
app.all('/campsites', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); 
    //pass controll of the application routing to the next relevant routing method after this one otherwise it'll just stop here and doesn't go any further.
});

// Path ---> /campsites 
app.get('/campsites', (req, res) => {
    res.end(`Will send all the campsites to you`); //Send a plain text to user
});

app.post('/campsites', (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
});

app.put('/campsites', (req, res) => {
    res.statusCode = 403;
    res.end('Put operation not supported on /campsites');
});

//Note: Delete is normally a dangerous operation so, make sure I not allow ordinary users to do it
app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
});

// Path ---> /campsites/:campsiteId 
app.get('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`); 
});

app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});

app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name} with description: ${req.body.description}`);
});

app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

//refer to the absolute path of the file that it's in
app.use(express.static(__dirname + '/public')); 


app.use((req, res) => {
    //console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

