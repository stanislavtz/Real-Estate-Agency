const router = require('express').Router();

const homePageController = require('./controllers/homePage');
const usersController = require('./controllers/usersController');
const offersController = require('./controllers/offersController');

router.use('/', homePageController);
router.use('/users', usersController);
router.use('/housing', offersController);

router.all('*', (req, res) => res.render('404', {title: 'Page Not Found'}));


module.exports = () => router;