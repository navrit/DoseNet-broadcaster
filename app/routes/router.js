var router = require('express').Router();

router.get('/api/json', require('./api/get'));

router.get('*', require('./front/get'));

module.exports = router;
