const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Celebrity, Fame, Showdown } = require('../models');
const withAuth = require('../utils/auth');

// Get homepage with latest showdown data
router.get('/', async (req, res) => {
    try {
        const showdownData = await Showdown.findAll({
            include: [
                { 
                    model: Celebrity,
                    include: [{ 
                        model: User,
                        attributes: { exclude: ['password', 'email'] }
                    }],
                },
            ],
            order: [
                ['date_created', 'DESC']
            ]
        });

        const showdowns = showdownData.map((showdown) => showdown.get({ plain: true }));

        // res.json(showdowns)
        res.render('homepage', { 
            showdowns: showdowns,
            logged_in: req.session.logged_in || false
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get showdown page with all celebrity data
router.get('/showdowns', async (req, res) => {
    try {
        const celebrityData = await Celebrity.findAll({
            include: [
                { 
                    model: User,
                    attributes: { exclude: ['password', 'email'] }
                }, 
                { model: Fame }]
        });

        const userCelebs = [];
        const enemyCelebs = [];
        celebrityData.forEach(celebData => {
            const celeb = celebData.get({ plain: true });
            if (celeb.user_id === req.session.user_id) {
                userCelebs.push(celeb);
            } else {
                enemyCelebs.push(celeb);
            }
        });

        res.render('showdowns', { 
            userCelebs,
            enemyCelebs, 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get leaderboard page with all user data ranked by win_count
router.get('/leaderboard', async (req, res) => {
    try {
        const userData = await User.findAll({
            order: [
                ['win_count', 'DESC']
            ]
        });

        const users = userData.map((user) => user.get({ plain: true }));

        res.render('leaderboard', { 
            users: users, 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get create celebrity page with options from the rank 10-20 power
router.get('/create', withAuth, async (req, res) => {
    try {
        const fameData = await Fame.findAll({
            order: [
                ['power', 'DESC']
            ],
            limit: 20
        });

        const tenToTwentyFame = [];
        for (let i = 10; i < 19; i++) {
            tenToTwentyFame.push(fameData[i].get({ plain: true }));
        }

        res.render('create', { 
            fame: tenToTwentyFame, 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get user profile with user stats and associated celebrity roster
router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                { 
                    model: Celebrity,
                    include: [{ model: Fame}]
                }
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

// Get login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;