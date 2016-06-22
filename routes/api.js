var express = require('express');
var router = express.Router();
/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('api/list', {baseUrl: req.headers.host});
});

module.exports = router;
