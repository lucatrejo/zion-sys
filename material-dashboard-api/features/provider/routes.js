const { wrap } = require('async-middleware');
const router = require('express').Router();

const createProvider = require('./commands/create-provider');
const updateProvider = require('./commands/update-provider');
const { getProvider, getProviders } = require('./commands/get-provider');

router.post('/', wrap(createProvider));
router.put('/:id', wrap(updateProvider));
router.get('/:id', wrap(getProvider));
router.get('/', wrap(getProviders));

module.exports = router;
