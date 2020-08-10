const { insert } = require('../repository');
const logger = require('../../../logger');

async function createItem(req, res) {
  let item = {};
  const createSuccessMessage = "El artículo se creó con éxito.";

  try {
    item = await insert(req.body);
  } catch (error) {
    logger.error(error);
    item = error;
  }

  if (item.id) {
    return res.send({
      success: true,
      item: { ...item },
      messages: { success: createSuccessMessage }
    });
  }

  const { code } = item;

  if(code === '23505') {
    const name = 'El nombre del artículo ya existe.';
    return res.status(500).send({ success: false, messages: { errors: { name }} });
  }

  const databaseError = 'Hubo un problema en la creación del artículo.';
  return res.status(500).send({ success: false, messages: { errors: { databaseError }} });
}

module.exports = createItem;
