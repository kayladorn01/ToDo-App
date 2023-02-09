// Requiring Express.
const express = require('express');
// Requiring Router from Express.
const router = express.Router();
// Requiring controllers from todolist.controller.js.
const {
  createTodo,
  deleteTodo,
} = require('../controllers/todolist.controller.js');

router.post('/add', createTodo);
router.post('/delete', deleteTodo);

// Exporting controllers to server.js.
module.exports = router;