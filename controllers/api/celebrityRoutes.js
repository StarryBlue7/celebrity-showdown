const router = require('express').Router();
const { Celebrity } = require('../../models');
const withAuth = require('../../utils/auth');

// api/celebrities routes

// Create new celebrity instance
router.post('/', /*withAuth,*/ async (req, res) => {
    try {
        const newCelebrity = await Celebrity.create({
            ...req.body,
            // user_id: req.session.user_id,
        });

        res.status(200).json(newCelebrity);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update celebrity stats
router.put('/:id', withAuth, async (req, res) => {
    try {
        const celebrityData = await Celebrity.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!celebrityData) {
            res.status(404).json({ message: 'Celeb update failed!' });
            return;
        }

        res.status(200).json(celebrityData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete celebrity
router.delete('/:id', /*withAuth,*/ async (req, res) => {
    try {
        const celebrityData = await Celebrity.destroy({
            where: {
                id: req.params.id,
                // user_id: req.session.user_id,
            },
        });

        if (!celebrityData) {
            res.status(404).json({ message: 'Celebrity not found!' });
            return;
        }

        res.status(200).json(celebrityData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;