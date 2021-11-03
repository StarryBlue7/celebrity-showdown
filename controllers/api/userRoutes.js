const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    res.json('Create user account')
});

router.post('/login', async (req, res) => {
    res.json('Login to user account')
});

router.post('/logout', (req, res) => {
    res.json('Logout of user account')
    // if (req.session.logged_in) {
    //     req.session.destroy(() => {
    //         res.status(204).end();
    //     });
    // } else {
    //     res.status(404).end();
    // }
});

module.exports = router;