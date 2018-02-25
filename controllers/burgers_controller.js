var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');


router.get('/burgers', function(req, res) {
    burger.selectAll(function(data) {
        res.render('index', { burgers: data });
    });
});

router.post('/burgers/create', function(req, res) {
    burger.insertOne(['burger_name', 'devoured'], [req.body.name, req.body.devoured], function() {
        res.redirect('/burgers');
    });
});

router.put('/burgers/update/:id', function(req, res) {
    var condition = 'id=' + req.params.id;
    console.log('condition', condition);

    burger.updateOne({ devoured: req.body.devoured }, condition, function() {
        res.redirect('/burgers');
    });
});



module.exports = router;