const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser'); //Set up a REST API
const campsiteRouter = require('./routes/campsiteRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

//from campsiteRouter.js it was specify here **
app.use('/campsites', campsiteRouter);

/* deleted this as it will need to be in campsiteRouter.js later
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
*/

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

