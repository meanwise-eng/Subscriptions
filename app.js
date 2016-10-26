var express = require('express');

var bodyParser = require('body-parser');
var validator = require('express-validator');

var app = express();

var SENDGRID_API_KEY = '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';
var sg = require('sendgrid')(SENDGRID_API_KEY);

var myApp = require('./app-common');

var app = myApp.init('myApp', require('./mw/logger'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(validator());


function helloEmail(useremail){
    var helper = require('sendgrid').mail;
    mail = new helper.Mail();
    personalization = new helper.Personalization()

    from_email = new helper.Email("m@meanwise.com", "Team Meanwise");
    mail.setFrom(from_email);
    
    to_email = new helper.Email(useremail);
    personalization.addTo(to_email)
    mail.addPersonalization(personalization)

    mail.setTemplateId("186c5da5-6045-49d6-855a-ec9ec579c3a6");
    
    return mail.toJSON()
}

function send(toSend){
    var requestBody = toSend;
    var emptyRequest = require('sendgrid-rest').request;
    var requestPost = JSON.parse(JSON.stringify(emptyRequest));
    requestPost.method = 'POST';
    requestPost.path = '/v3/mail/send';
    requestPost.body = requestBody;
    sg.API(requestPost, function (error, response) {
        error ? console.log(error) : console.log("An email has been send to the user");
    })
}


app.get('/', function (req, res) {
    res.render('index');
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
        var data = response.body;
        var reqs = sg.emptyRequest();
        var list_id = 665876;
        var recipient_id = data["persisted_recipients"];
        
        reqs.method = 'POST';
        reqs.path = '/v3/contactdb/lists/' + list_id + '/recipients/' + recipient_id;

        
        sg.API(reqs, function (error, resp) {
            err = error
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email successfully added to the list');
                send(helloEmail(email));
            }
        });
    });
    
    res.render('index');
});

app.post('/subscribe', function(req, res){
    var email = req.body.email;
    console.log(email);
    var result = {};
    res.writeHead(200, {"Content-Type": "application/json"});

    req.checkBody("email").isEmail();
    var errors = req.validationErrors();
    
    if (errors) {
        result = {
            status: 400,
            message: 'Your email is not valid. Please enter a valid email address.'
        };
        res.end(JSON.stringify(result));
    }
    else {
        var request = sg.emptyRequest();
        request.body = [
            {
                'email': email
            }
        ];
        request.method = 'POST';
        request.path = '/v3/contactdb/recipients';
        sg.API(request, function (error, response) {
            var data = response.body;
            var reqs = sg.emptyRequest();
            var list_id = 665876;
            var recipient_id = data["persisted_recipients"];
            
            
            reqs.method = 'POST';
            reqs.path = '/v3/contactdb/lists/' + list_id + '/recipients/' + recipient_id;
            
            sg.API(reqs, function (error, resp) {
                err = error
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email successfully added to the list');
                    send(helloEmail(email));
                }
                result = {
                    status: 200,
                    message: "You've been successfully subscribed"
                };
                res.end(JSON.stringify(result));
            });
        });
    }
});

myApp.handleCommonError(app);

module.exports = app;

