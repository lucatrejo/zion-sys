const { getById, getAll } = require('../repository');
const { GET_ERROR_MESSAGE } = require('../constants');
const logger = require('../../../logger');

async function getCategory(req, res) {
  let category = {};
  const id = req.params.id;
  
  try {
    category = await getById({ id });
  } catch (error) {
    return res.status(500).send({ success: false, messages: { GET_ERROR_MESSAGE } });
  }

  if (category.name) {
    return res.send(category);
  }
}

async function getCategories(req, res) {
  let categories = [];
  
  try {
    categories = await getAll();
  } catch (error) {
    return res.status(500).send({ success: false, messages: { GET_ERROR_MESSAGE } });
  }

  if (categories) {
    return res.send({ categories });
  }
}

module.exports = {
  getCategory,
  getCategories,
};