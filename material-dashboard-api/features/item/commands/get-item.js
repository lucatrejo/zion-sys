const { getById, getAll } = require('../repository');
const { GET_ERROR_MESSAGE } = require('../constants');
const logger = require('../../../logger');

async function getItem(req, res) {
  let item = {};
  const id = req.params.id;
  
  try {
    item = await getById({ id });
  } catch (error) {
    return res.status(500).send({ success: false, messages: { GET_ERROR_MESSAGE } });
  }

  if (item.name) {
    return res.send(item);
  }
}

async function getItems(req, res) {
  let items = [];
  
  try {
    items = await getAll();
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ success: false, messages: { GET_ERROR_MESSAGE } });
  }

  if (items) {
    logger.info(items);
    return res.send({ items });
  }
}

module.exports = {
  getItem,
  getItems,
};