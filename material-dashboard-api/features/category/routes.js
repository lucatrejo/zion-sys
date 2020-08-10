const { wrap } = require('async-middleware');
const router = require('express').Router();

const requestBodyValidation = require('./commands/verify-request-body');
const createCategory = require('./commands/create-category');
const updateCategory = require('./commands/update-category');
const { getCategory, getCategories } = require('./commands/get-category');
const deleteCategory = require('./commands/delete-category');

router.post('/', wrap(requestBodyValidation), wrap(createCategory));
router.put('/:id', wrap(requestBodyValidation), wrap(updateCategory));
router.get('/:id', wrap(getCategory));
router.delete('/:id', wrap(deleteCategory));
router.get('/', wrap(getCategories));

module.exports = router;
