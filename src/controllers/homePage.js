const router = require('express').Router();

function getHomePage(req, res) {
    res.locals.title = 'Home Page';
    res.render('home/index');
}

router.get('/', getHomePage);

module.exports = router;