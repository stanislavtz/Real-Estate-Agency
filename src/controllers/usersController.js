const router = require('express').Router();

const usersService = require('../services/usersService');
const { COOKIE_NAME } = require('../utils/constants');
const { isGuest, isAuthenticated } = require('../middlewares/authMiddleware');

function getRegisterPage(req, res) {
    res.locals.title = 'Register Page';
    res.render('users/register');
}

function getLoginPage(req, res) {
    res.locals.title = 'Login Page';
    res.render('users/login');
}

async function registerUser(req, res) {
    try {
        await usersService.register(req.body);
        res.redirect('/');
    } catch (error) {
        if (error.message.includes('E11000')) {
            res.locals.error = { message: `Username is already taken` }
        } else {
            res.locals.error = error.errors ? Object.values(error.errors)[0] : error;
        }

        res.render('users/register', { ...req.body });
    }
}

async function loginUser(req, res) {
    try {
        const token = await usersService.login(req.body);
        res.cookie(COOKIE_NAME, token, {
            httpOnly: true
        });
        res.redirect('/');
    } catch (error) {
        console.log(error)
        res.locals.error = error;
        res.render('users/login', { ...req.body });
    }
}

function logOutUser(req, res) {
    res.clearCookie(COOKIE_NAME).redirect('/');
}

router.get('/register', isGuest, getRegisterPage);
router.get('/login', isGuest, getLoginPage);
router.get('/logout', isAuthenticated, logOutUser);

router.post('/register', isGuest, registerUser);
router.post('/login', isGuest, loginUser);

module.exports = router;