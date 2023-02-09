// Requiring Express.
const express = require('express');
// Requiring Router from Express.
const router = express.Router();
// Requiring controllers from auth.controller.js.
const { auth } = require('../controllers/auth.controller.js');

router.post('/', auth);

// Exporting controllers to server.js.
module.exports = router;