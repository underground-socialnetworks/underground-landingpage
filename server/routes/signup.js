var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log(req.body);
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    // email validation is already done with javascript in the front end.
    // Might want to consider server side validation as well as javascript can be disabled.

	// Comment out this line:
    res.send('respond with a resource');
});

module.exports = router;
