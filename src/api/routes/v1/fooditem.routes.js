const express = require('express');
const controller = require('../../controllers/fooditem.controller');
const multer = require('../../middlewares/multer.middleware')
const router = express.Router();

router
    .route('/')
    .get(controller.all)
    .post(multer.single('ImageSrc'), controller.create);

router
    .route('/notificationDates/:id')
    .get(controller.notificationDates)

// router
//     .route('/nonexpired/:id')
//     .get(controller.allNonExpiredItems)


router
    .route('/categoryid/')
    .get(controller.itemsByCategoryId)


router
    .route('/userid/:id')
    .get(controller.itemsByUserId)


router
    .route('/:id')
    .get(controller.id)
    .patch(controller.delete)
    .put(multer.single('ImageSrc'), controller.update)

module.exports = router;
