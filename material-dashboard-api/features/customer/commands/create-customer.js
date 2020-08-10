const { insert } = require('../repository');
const logger = require('../../../logger');

async function createCustomer(req, res) {
  let customer = {};

  try {
    customer = await insert(req.body);
  } catch (error) {
    logger.error(error);
    customer = error;
  }

  if (customer.id) {
    return res.send(customer);
  }

  const { code } = customer;

  if(code === '23505') {
    return res.status(400).send({ success: false, message: 'The name has already been taken.' });
  }

  return res.status(500).send({ success: false, message: "error creating customer"});
}

module.exports = createCustomer;
