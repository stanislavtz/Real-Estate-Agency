const router = require('express').Router();
const offersService = require('../services/offersService');

async function getOffersPage(req, res) {
    res.locals.title = 'Housing Page';
    try {
        const offers = await offersService.getAll();
        
        console.log(offers);
    
        res.render('offers/housing', { offers });
        
    } catch (error) {
        res.locals.error = error;
        res.render('offers/housing');
    }
}

function getCreatePage(req, res) {
    res.locals.title = 'Create Page';
    res.render('offers/create');
}


router.get('/', getOffersPage);
router.get('/create', getCreatePage);

module.exports = router;