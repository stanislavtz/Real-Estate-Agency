const offersService = require('../services/offersService');

exports.isAvailablePlaces = async function (req, res, next) {
    const offer = await offersService.getOne(req.params.offerId);
    if (!offer) {
        throw { message: 'Offer was removed' }
    }
    const tenants = offer.tenants.map(t => t._id).map(t => t.toString());

    if(offer.pieces > 0 && !tenants.includes(req.user._id)) {
        return next();
    }

    res.locals.error = { message: 'Already hired or No available pieces'}
    
    res.render('404');
}