const express = require('express');

const router = express.Router();

const registerRoutes = require('../features/register/routes');
const loginRoutes = require('../features/login/routes');
const logoutRoutes = require('../features/logout/routes');
const profileRoutes = require('../features/profile/routes');
const categoriesRoutes = require("../features/category/routes");
const itemsRoutes = require("../features/item/routes");
const customersRoutes = require("../features/customer/routes");
const employeesRoutes = require("../features/employee/routes");
const providersRoutes = require("../features/provider/routes");
const purchasesRoutes = require("../features/purchases/routes");

const logger = require('../logger');

function isAuthenticated(req, res, next) {
  if (req.user && req.isAuthenticated()) {
    return next();
  }

  return res.json({ success: false });
}

router.get('/get-session', (req, res) => {
  logger.info('get-session');
  logger.info(req);
  if (req.user && req.isAuthenticated()) {
    return res.json({ success: true, userInfo: req.user });
  }

  return res.json({ success: false });
});

router.use('/login', loginRoutes);
router.use('/profile', isAuthenticated, profileRoutes);
router.use('/logout', isAuthenticated, logoutRoutes);
router.use('/register', registerRoutes);
router.use('/categories', categoriesRoutes);
router.use('/items', itemsRoutes);
router.use('/customers', customersRoutes);
router.use('/employees', employeesRoutes);
router.use('/providers', providersRoutes);
router.use('/purchases', purchasesRoutes);

module.exports = router;
