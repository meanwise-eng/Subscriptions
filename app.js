var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)

///////////////////////////////////////////////////
// Create a Custom Field
// POST /contactdb/custom_fields


var request = sg.emptyRequest()
request.body = {
  "name": "pet", 
  "type": "text"
};
request.method = 'POST'
request.path = '/v3/contactdb/custom_fields'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Create a List
// POST /contactdb/lists


var request = sg.emptyRequest()
request.body = {
  "name": "your list name"
};
request.method = 'POST'
request.path = '/v3/contactdb/lists'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Add Multiple Recipients to a List
// POST /contactdb/lists/{list_id}/recipients


var request = sg.emptyRequest()
request.body = [
  "recipient_id1", 
  "recipient_id2"
];
request.method = 'POST'
request.path = '/v3/contactdb/lists/{list_id}/recipients'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Add a Single Recipient to a List
// POST /contactdb/lists/{list_id}/recipients/{recipient_id}


var request = sg.emptyRequest()
request.method = 'POST'
request.path = '/v3/contactdb/lists/{list_id}/recipients/{recipient_id}'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})

///////////////////////////////////////////////////
// Add recipients
// POST /contactdb/recipients


var request = sg.emptyRequest()
request.body = [
  {
    "age": 25, 
    "email": "example@example.com", 
    "first_name": "", 
    "last_name": "User"
  }, 
  {
    "age": 25, 
    "email": "example2@example.com", 
    "first_name": "Example", 
    "last_name": "User"
  }
];
request.method = 'POST'
request.path = '/v3/contactdb/recipients'
sg.API(request, function (error, response) {
  console.log(response.statusCode)
  console.log(response.body)
  console.log(response.headers)
})
