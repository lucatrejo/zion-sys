const { update } = require('../repository');
const logger = require('../../../logger');

async function updateEmployee(req, res) {
  let employee = {};
  const id = req.params.id;
  logger.info("id: " + id);
  
  try {
    employee = await update({ ...req.body, id });
    logger.info(employee);
  } catch (error) {
    logger.error(error);
    employee = error;
  }

  if (employee.id) {
    return res.send(employee);
  }
  
  return res.status(500).send({ success: false, messages: 'error updating employee' });
}

module.exports = updateEmployee;
