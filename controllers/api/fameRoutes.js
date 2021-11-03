const router = require('express').Router();
const { Fame } = require('../../models');
const withAuth = require('../../utils/auth');

// api/fame routes

// Get fame data for one celebrity
router.get('/:id', withAuth, async (req, res) => {
    try {
        const fameData = await Fame.findByPk(req.params.id);

        const fame = fameData.get({ plain: true });
        
        res.render('blog', {
            ...fame,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;