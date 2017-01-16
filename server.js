var express = require('express');
var bodyParser = require('body-parser');


var Wit = require('./node-wit/lib/wit.js')
var interactive = require('./node-wit/lib/interactive.js')

let sessionId;
const accessToken = (() => {
    return 'IGBWADZIQJH3FEBA6OL64J2NHPSSJ3NF'
})()

const actions = {
    send (request, response) {
        return new Promise(function (resolve, reject) {
            console.log('sending...', JSON.stringify(response))
            return resolve();
        })
    }
}

const client = new Wit({accessToken, actions})
sessionId = interactive(client);

var app = express();

app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', express.static('app'));

app.post('/api/sendmsg', function (req, res){
    client.converse(sessionId, req.body.content, {})
        .then((data) => {
            client.runActions(sessionId, req.body.content, {}).
            then(() => {
                console.log("you said: ", req.body.content);
                console.log("bot reply: ", data.msg);
                res.json(data)
            })
            .catch(console.error);
        })
        .catch(console.error);
});

app.listen(3000, function (){
    console.log("Listening on port 3000...");
});
