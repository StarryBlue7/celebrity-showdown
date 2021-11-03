const router = require('express').Router();
const { Showdown } = require('../../models');
// const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    res.json('Add showdown results to history')
});


module.exports = router;