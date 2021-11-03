const router = require('express').Router();
const userRoutes = require('./userRoutes');
const celebrityRoutes = require('./celebrityRoutes');

router.use('/users', userRoutes);
router.use('/users', celebrityRoutes);

module.exports = router;