const { wrap } = require('async-middleware');
const router = require('express').Router();

const createEmployee = require('./commands/create-employee');
const updateEmployee = require('./commands/update-employee');
const { getEmployee, getEmployees } = require('./commands/get-employee');

router.post('/', wrap(createEmployee));
router.put('/:id', wrap(updateEmployee));
router.get('/:id', wrap(getEmployee));
router.get('/', wrap(getEmployees));

module.exports = router;
