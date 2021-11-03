const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Celebrity, Showdown } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const showdownData = await Showdown.findAll({
            include: [
                { model: Celebrity }
            ]
        });

        const showdowns = showdownData.map((showdown) => showdown.get({ plain: true }));

        res.render('homepage', { 
            showdowns: showdowns, 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/showdowns', async (req, res) => {
    res.render('showdowns')
});

router.get('/leaderboard', async (req, res) => {
    try {
        const userData = await User.findAll({});

        const users = userData.map((user) => user.get({ plain: true }));

        res.render('leaderboard', { 
            users: users, 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.get('/user/:id', async (req, res) => {
//     res.json('See user page by id');
// });

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Celebrity }
            ]
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;