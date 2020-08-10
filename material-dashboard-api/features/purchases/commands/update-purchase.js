const { update } = require('../repository');
const logger = require('../../../logger');

async function updatePurchase(req, res) {
  let provider = {};
  const id = req.params.id;
  logger.info("id: " + id);
  
  try {
    provider = await update({ ...req.body, id });
    logger.info(provider);
  } catch (error) {
    logger.error(error);
    provider = error;
  }

  if (provider.id) {
    return res.send(provider);
  }
  
  return res.status(500).send({ success: false, messages: 'error updating provider' });
}

module.exports = updatePurchase;
