const { update } = require('../repository');
const { CREATE_ERROR_MESSAGE, CREATE_SUCCESS_MESSAGE } = require('../constants');
const logger = require('../../../logger');

async function updateItem(req, res) {
  let item = {};
  const id = req.params.id;
  logger.info("id: " + id);
  
  try {
    item = await update({ ...req.body, id });
    logger.info(item);
  } catch (error) {
    logger.error(error);
    item = error;
  }

  if (item.id) {
    return res.send(item);
  }
  
  return res.status(500).send({ success: false, messages: 'error updating item' });
}

module.exports = updateItem;
