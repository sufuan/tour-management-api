const express = require('express');
const router = express.Router()
const tourController = require('../controllers/tourController')




router.route('/tours')
    .get(tourController.getall)
    .post(tourController.createTour)

router.route('/tours/:id').get(tourController.singleTour)


router.route('/tour/:id').patch(tourController.updateTour)


// router.route('/tour/trending').get('/')
router.route('/tour/cheapest').get(tourController.cheap)


module.exports = router