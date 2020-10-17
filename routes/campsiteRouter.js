const express = require('express');
const bodyParser = require('body-parser');

const campsiteRouter = express.Router();

campsiteRouter.use(bodyParser.json());


//(this was moved from server.js)
// delete app.all >> .all 
// delete first argument the path ('/campsites', because the path is already set for this route above  ( >> .all((req, res, next) => { // then remove ; at the end as we're not finish yet
campsiteRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); 
    //pass controll of the application routing to the next relevant routing method after this one otherwise it'll just stop here and doesn't go any further.
})

// Path ---> /campsites 
.get((req, res) => {
    res.end('Will send all the campsites to you'); //Send a plain text to user
})
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})
//Note: Delete is normally a dangerous operation so, make sure I not allow ordinary users to do it
.delete((req, res) => {
    res.end('Deleting all campsites');
});

module.exports = campsiteRouter;