const router = require('express').Router();
const sequelize = require('../config/connection');
// const { } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    res.json('Homepage');
});

router.get('/showdown', async (req, res) => {
    res.json('Showdown page');
});

router.get('/profile', withAuth, async (req, res) => {
    res.json('User profile page');
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;