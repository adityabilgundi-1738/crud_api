const express = require('express');
const router = express.Router();
const emsController = require('../controllers/emsController');

router.get('/',emsController.emp_index);

router.get('/create',emsController.emp_create_page);

router.post('/',emsController.emp_create_post);

router.get('/details/:id',emsController.emp_get_details );

router.delete('/delete/:id', emsController.emp_delete);

router.get('/edit/:id',emsController.emp_get_update_form);

router.patch('/edit/:id',emsController.emp_update_post);

module.exports = router;