const router = require('express').Router();
const { Celebrity } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    res.json('Create new Celebrity')
});

router.put('/:id', withAuth, async (req, res) => {
    res.json('Update Celebrity stats')
});

router.delete('/:id', withAuth, async (req, res) => {
    res.json('Delete celebrity')
});

module.exports = router;