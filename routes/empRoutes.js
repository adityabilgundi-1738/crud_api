const express = require('express');
const router = express.Router();
const emsController = require('../controllers/emsController');

router.get('/create',emsController.emp_create_get);

router.get('/',emsController.emp_index);

router.post('/',emsController.emp_create_post);

router.get('/:id',emsController.emp_get_details );

router.delete('/:id', emsController.emp_delete);

module.exports = router;