const router = require('express').Router();
const { Fame } = require('../../models');
// const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    res.json('Get fame data')
});

router.get('/:id', async (req, res) => {
    res.json('Get fame data by id')
});

module.exports = router;