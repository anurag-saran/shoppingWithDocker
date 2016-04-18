var router = require('express').Router();

//add call back function with parameter of req and res
router.get('/myname', function(req,res) {
    var name = "Anurag";
    res.json("My name is :" +name);
});

router.get('/', function(req,res) {
   
    res.render('main/home');
});

router.get('/about', function(req,res) {
   
    res.render('main/about');
});

module.exports = router;
