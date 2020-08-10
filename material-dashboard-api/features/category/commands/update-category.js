const { update } = require('../repository');
const { CREATE_ERROR_MESSAGE, CREATE_SUCCESS_MESSAGE } = require('../constants');
const logger = require('../../../logger');

async function updateCategory(req, res) {
  logger.info('UPDATE_CATEGORY');
  let category = {};
  const id = req.params.id;
  
  try {
    category = await update({ ...req.body, id });
    logger.info(category);
  } catch (error) {
    logger.error(error);
    category = error;
  }

  if (category.id) {
    return res.send(category);
  }
  
  const databaseError = CREATE_ERROR_MESSAGE;

  return res.status(500).send({ success: false, messages: { databaseError } });
}

module.exports = updateCategory;
