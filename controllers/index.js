const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

module.exports = router;
const router = require('express').Router();
const apiRoutes = require('./routes');

router.use('/routes', apiRoutes);

module.exports = router;
