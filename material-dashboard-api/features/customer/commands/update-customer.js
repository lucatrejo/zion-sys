const { update } = require('../repository');
const logger = require('../../../logger');

async function updateCustomer(req, res) {
  let customer = {};
  const id = req.params.id;
  logger.info("id: " + id);
  
  try {
    customer = await update({ ...req.body, id });
    logger.info(customer);
  } catch (error) {
    logger.error(error);
    customer = error;
  }

  if (customer.id) {
    return res.send(customer);
  }
  
  return res.status(500).send({ success: false, messages: 'error updating customer' });
}

module.exports = updateCustomer;
