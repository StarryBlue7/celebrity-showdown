const router = require('express').Router();
const { Celebrity } = require('../../models');
// const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    res.json('Create new Celebrity')
});

router.put('/:id', async (req, res) => {
    res.json('Update Celebrity stats')
});

router.delete('/:id', async (req, res) => {
    res.json('Delete celebrity')
});

module.exports = router;