const { insert } = require('../repository');
const logger = require('../../../logger');

async function createEmployee(req, res) {
  let employee = {};
  const createSuccessMessage = "El empleado se creó con éxito.";

  try {
    employee = await insert(req.body);
  } catch (error) {
    logger.error(error);
    employee = error;
  }

  if (employee.id) {
    return res.send({
      success: true,
      employee: { ...employee },
      messages: { success: createSuccessMessage }
    });
  }

  const { code } = employee;

  if(code === '23505') {
    const name = 'El nombre del empleado ya existe.';
    return res.status(500).send({ success: false, messages: { errors: { name }} });
  }

  const databaseError = 'Hubo un problema en la creación del empleado.';
  return res.status(500).send({ success: false, messages: { errors: { databaseError }} });
}

module.exports = createEmployee;
