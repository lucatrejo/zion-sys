const { getById, getAll, getDetailById } = require('../repository');
const logger = require('../../../logger');

async function getPurchase(req, res) {
  let purchase = {};
  const id = req.params.id;
  
  try {
    purchase = await getById({ id });
  } catch (error) {
    return res.status(500).send({ success: false, message: 'error getting purchase' });
  }

  if (purchase.id) {
    return res.send(purchase);
  }
}

async function getPurchasesWithDetail(req, res) {
  let purchases = [];
  
  try {
    purchases = await getAll();

    for (let purchase of purchases) {
      let details = [];
      details = await getDetailById(purchase.id);
      purchase.details = details;
    }

  } catch (error) {
    logger.error(error);
    return res.status(500).send({ success: false, message: 'error getting purchases' });
  }

  if (purchases) {
    return res.send({ purchases });
  }
}

async function getPurchases(req, res) {
  let purchases = [];
  
  try {
    purchases = await getAll();
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ success: false, message: 'error getting purchases' });
  }

  if (purchases) {
    return res.send({ purchases });
  }
}

async function getPurchaseDetail(req, res) {
  let details = [];
  const id = req.params.id;

  try {
    details = await getDetailById(id);
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ success: false, message: 'error getting purchases detail' });
  }

  if (details) {
    return res.send({ details });
  }
}

module.exports = {
  getPurchase,
  getPurchases,
  getPurchasesWithDetail,
  getPurchaseDetail,
};