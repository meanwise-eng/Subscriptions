var express = require('express');
var app = express();
var SENDGRID_API_KEY = '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';

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var sg = require('sendgrid')(SENDGRID_API_KEY);

app.set('view engine', 'ejs');
app.use(express.static('views'));

app.get('/', function (req, res) {
    res.render('templates/index');
});

app.post('/', function (req, res) {
    var email = req.body.email;
    console.log(email);
    var request = sg.emptyRequest();
    request.body = [
        {
            'email': email
        }
    ];
    
    request.method = 'POST';
    request.path = '/v3/contactdb/recipients';
    
    sg.API(request, function (error, response) {
        var data = JSON.parse(response.body);
        var reqs = sg.emptyRequest();
        var list_id = 623934;
        var recipient_id = data["persisted_recipients"][0];
        
        reqs.method = 'POST';
        reqs.path = '/v3/contactdb/lists/' + list_id + '/recipients/' + recipient_id;
        
        sg.API(reqs, function (error, resp) {
            error ? console.log(error) : console.log('Email successfully added to the list');
        });
    });
    
    res.render('templates/index');
});



var server = app.listen(3000, function () {
    console.log("Server is running at http://localhost:" + server.address().port);
});