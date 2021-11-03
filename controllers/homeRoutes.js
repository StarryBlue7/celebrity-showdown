const router = require('express').Router();
const sequelize = require('../config/connection');
// const { } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    res.json('Homepage');
    // res.render('homepage')
});

router.get('/showdowns', async (req, res) => {
    res.json('Showdown page');
    // res.render('showdowns')
});

router.get('/leaderboard', async (req, res) => {
    res.json('Leaderboard page');
    // res.render('leaderboard')
});

// router.get('/user/:id', async (req, res) => {
//     res.json('See user page by id');
// });

router.get('/profile', async (req, res) => {
    res.json('User profile page');
    // res.render('profile')
});

router.get('/login', (req, res) => {
    // if (req.session.logged_in) {
    //     res.redirect('/profile');
    //     return;
    // }
    res.json('login page');
    // res.render('login');
});

module.exports = router;