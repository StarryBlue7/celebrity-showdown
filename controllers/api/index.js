const router = require('express').Router();
const userRoutes = require('./userRoutes');
const celebrityRoutes = require('./celebrityRoutes');
const fameRoutes = require('./fameRoutes');
const showdownRoutes = require('./showdownRoutes');

router.use('/users', userRoutes);
router.use('/celebrities', celebrityRoutes);
router.use('/fame', fameRoutes);
router.use('/showdown', showdownRoutes);

module.exports = router;