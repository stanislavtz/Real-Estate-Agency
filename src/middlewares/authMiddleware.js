const { jwtVerify } = require('../utils/jwtUtil');
const { COOKIE_NAME, JWT_SECRET } = require('../utils/constants');
const offersService = require('../services/offersService');

exports.auth = () => async function (req, res, next) {
    const token = req.cookies[COOKIE_NAME];
    if (!token) {
        return next();
    }

    try {
        const decoded = await jwtVerify(token, JWT_SECRET);
        req.user = decoded;
        res.locals.user = decoded;
        next();
    } catch (error) {
        res.locals.error = error;
        res.render('404');
    }
}

exports.isGuest = function (req, res, next) {
    if (!req.user) {
        return next();
    }

    res.locals.error = { message: 'You are logged in' }
    res.status(401).render('404');
}

exports.isAuthenticated = function (req, res, next) {
    if (req.user) {
        return next();
    }

    res.locals.error = { message: 'You are not authenticated' }
    res.status(401).render('404');
}

exports.isAuthorized = async function (req, res, next) {
    const offer = await offersService.getOne(req.params.offerId);
    if (!offer) {
        throw { message: 'Offer was removed' }
    }

    if (offer.ownerId == req.user._id) {
        res.locals.user.isOwner = true
    } else {
        res.locals.user.isOwner = false
    }

    next();
}