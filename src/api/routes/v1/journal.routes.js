const express = require('express');
const controller = require('../../controllers/journal.controller');
const router = express.Router();

router
    .route('/')
    .get(controller.all)
    .post(controller.create);


router
    .route('/:id')
    .get(controller.id)

module.exports = router;
