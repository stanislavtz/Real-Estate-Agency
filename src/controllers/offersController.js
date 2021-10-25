const router = require('express').Router();

const offersService = require('../services/offersService');
const { isAuthenticated, isAuthorized } = require('../middlewares/authMiddleware');

async function getOffersPage(req, res) {
    res.locals.title = 'Housing Page';
    try {
        const offers = await offersService.getAll();

        res.render('offers/housing', { offers });
    } catch (error) {
        res.locals.error = error;

        res.render('offers/housing');
    }
}

function getSearchPage(req, res) {
    res.locals.title = 'Search Page';
    res.render('offers/search')
}

function getCreateOfferPage(req, res) {
    res.locals.title = 'Create Page';
    res.render('offers/create');
}

async function createOffer(req, res) {
    try {
        const offer = Object.assign(req.body, { ownerId: req.user._id })
        await offersService.create(offer);
        res.redirect('/housing');
    } catch (error) {
        console.error(error);
        res.locals.error = error.errors ? Object.values(error.errors)[0] : error;
        res.render('offers/create', { ...req.body });
    }
}

async function getOfferDetailsPage(req, res) {
    res.locals.title = 'Details Page';

    try {
        const offer = await offersService.getOne(req.params.offerId);

        if (offer.ownerId == req.user?._id) {
            res.locals.user.isOwner = true;
        }

        if (offer.pieces > 0) {
            offer.isAvailable = true;
        }

        if (offer.tenants.some(t => t._id == req.user?._id)) {
            res.locals.user.isTenant = true;
        }

        const tenants = offer.tenants.map(t => t.name).join(', ')

        res.render('offers/details', { offer, tenants });
    } catch (error) {
        console.error(error)
        res.locals.error = error;
        res.render('404');
    }
}

async function rentHome(req, res) {
    const offer = await offersService.getOne(req.params.offerId);

    if (offer.pieces > 0) {
        offer.tenants.push(req.user._id);
        offer.pieces--;
    }

    try {
        await offersService.update(offer._id, offer);
        res.redirect('/housing');
    } catch (error) {
        console.error(error)
    }

}

async function getEditOfferPage(req, res) {
    res.locals.title = 'Edit Page';
    try {
        const offer = await offersService.getOne(req.params.offerId);
        res.render('offers/edit', { ...offer });
    } catch (error) {
        console.error(error);
        res.locals.error = error;
        res.render('404');
    }
}

async function editOffer(req, res) {
    try {
        await offersService.update(req.params.offerId, req.body);
        res.redirect('/housing');
    } catch (error) {
        console.error(error);
        res.locals.error = error.errors ? Object.values(error.errors)[0] : error;
        res.render('offers/edit', { ...req.body });
    }
}

router.get('/', getOffersPage);
router.get('/search', getSearchPage);
router.get('/:offerId/details', getOfferDetailsPage);
router.get('/:offerId/rent', rentHome);

router.get('/create', isAuthenticated, getCreateOfferPage);
router.post('/create', isAuthenticated, createOffer);

router.get('/:offerId/edit', isAuthenticated, isAuthorized, getEditOfferPage);
router.post('/:offerId/edit', isAuthenticated, isAuthorized, editOffer);

module.exports = router;