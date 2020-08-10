const { wrap } = require('async-middleware');
const router = require('express').Router();

const createCustomer = require('./commands/create-customer');
const updateCustomer = require('./commands/update-customer');
const { getCustomer, getCustomers } = require('./commands/get-customer');

router.post('/', wrap(createCustomer));
router.put('/:id', wrap(updateCustomer));
router.get('/:id', wrap(getCustomer));
router.get('/', wrap(getCustomers));

module.exports = router;
