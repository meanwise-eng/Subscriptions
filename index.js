var express = require('express');
var app = express();
var SENDGRID_API_KEY = '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';

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');
app.use(express.static('views'));

var sg = require('sendgrid')(SENDGRID_API_KEY);

function helloEmail(useremail){
    var helper = require('sendgrid').mail;

    from_email = new helper.Email("punit@meanwise.com");
    to_email = new helper.Email(useremail);
    subject = "Hello World from the SendGrid Node.js Library";
    content = new helper.Content("text/plain", "some text here");
    mail = new helper.Mail(from_email, subject, to_email, content);
    
    return mail.toJSON()
}

function send(toSend){
    // console.log(JSON.stringify(toSend, null, 2));
    //console.log(JSON.stringify(toSend))
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
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email successfully added to the list');
                send(helloEmail(email));
            }
        });
    });
    
    res.render('templates/index');
});


var server = app.listen(3000, function () {
    console.log("Server is running at http://localhost:" + server.address().port);
});