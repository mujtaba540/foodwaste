const express = require('express');
const controller = require('../../controllers/appointment.controller');
const router = express.Router();

router
    .route('/')
    .get(controller.all)
    .post(controller.create);


router
    .route('/:id')
    .get(controller.id)
    .delete(controller.delete)


router
    .route('/checkAvailabilty')
    .post(controller.checkAvailability)
module.exports = router;
