const router = require('express').Router();
const offersService = require('../services/offersService');

const topLevel = 3;

async function getHomePage(req, res) {
    res.locals.title = 'Home Page';
    try {
        const offers = await offersService.getAll(topLevel);
        res.render('home/index', { offers });
    } catch (error) {
        res.locals.error = error;
        res.render('home/index');
    }
}

router.get('/', getHomePage);

module.exports = router;