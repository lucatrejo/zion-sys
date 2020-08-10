const { insert } = require('../repository');

async function createCategory(req, res) {
  let category = {};
  const createSuccessMessage = 'La categoría se creó con éxito.';

  try {
    category = await insert(req.body);
  } catch (error) {
    category = error;
  }

  if (category.id) {
    return res.send({
      success: true,
      category: { ...category },
      messages: { success: createSuccessMessage }
    });
  }

  const { code } = category;

  if(code === '23505') {
    const name = 'El nombre de la categoría ya existe.';
    return res.status(500).send({ success: false, messages: { errors: { name }} });
  }

  const databaseError = 'Hubo un problema en la creación de la categoría.';
  return res.status(500).send({ success: false, messages: { errors: { databaseError }} });
}

module.exports = createCategory;
