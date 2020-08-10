const { insert } = require('../repository');
const logger = require('../../../logger');

async function createProvider(req, res) {
  let provider = {};
  const createSuccessMessage = "El proveedor se creó con éxito.";

  try {
    provider = await insert(req.body);
  } catch (error) {
    logger.error(error);
    provider = error;
  }

  if (provider.id) {
    return res.send({
      success: true,
      provider: { ...provider },
      messages: { success: createSuccessMessage }
    });
  }

  const { code } = provider;

  if(code === '23505') {
    const name = 'El nombre del proveedor ya existe.';
    return res.status(500).send({ success: false, messages: { errors: { name }} });
  }

  const databaseError = 'Hubo un problema en la creación del proveedor.';
  return res.status(500).send({ success: false, messages: { errors: { databaseError }} });
}

module.exports = createProvider;
