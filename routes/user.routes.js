// Requiring Express.
const express = require('express');
// Requiring Router from Express.
const router = express.Router();
// Requiring controllers from user.controller.js.
const { createUser, getTodo } = require('../controllers/user.controller.js');

router.post('/add', createUser);
router.get('/todo', getTodo);

// Exporting controllers to server.js.
module.exports = router;