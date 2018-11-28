var express = require('express');
var router = express.Router();
var Backendless = require('backendless');

router.post('/', function(req, res, next) {
    console.log(req.body);
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    // email validation is already done with javascript in the front end.
    // Might want to consider server side validation as well as javascript can be disabled.
    saveWaitlist(res, firstName + " " + lastName, email);

	// Comment out this line:
//    res.send('respond with a resource');
});

function saveWaitlist(res, name,email){
    var appId = '3EF18BC1-BF1D-617E-FFDA-CE76798F2800';
    var secretKey = 'B0C4ADD0-331C-BDBF-FF65-04B64C401400';
    var appVer = 'v1';
    Backendless.initApp( appId, secretKey, appVer );
    Backendless.Data.of( "waitlist" ).save( { name: name, email: email} )
    .then( function( savedObject ) {
          res.redirect('/');
          })
    .catch( function( error ) {
           res.redirect('/');
           });
}

module.exports = router;
