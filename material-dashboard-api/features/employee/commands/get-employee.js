const { getById, getAll } = require('../repository');
const logger = require('../../../logger');

async function getEmployee(req, res) {
  let employee = {};
  const id = req.params.id;
  
  try {
    employee = await getById({ id });
  } catch (error) {
    return res.status(500).send({ success: false, message: 'error getting employee' });
  }

  if (employee.name) {
    return res.send(employee);
  }
}

async function getEmployees(req, res) {
  let employees = [];
  
  try {
    employees = await getAll();
  } catch (error) {
    return res.status(500).send({ success: false, message: 'error getting employee' });
  }

  if (employees) {
    return res.send({ employees });
  }
}

module.exports = {
  getEmployee,
  getEmployees,
};