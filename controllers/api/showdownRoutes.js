const router = require('express').Router();
const { Showdown } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newShowdown = await Showdown.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newShowdown);
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;