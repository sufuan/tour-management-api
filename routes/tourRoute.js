const express = require('express');
const router = express.Router()
const tourController = require('../controllers/tourController');
const viewCount = require('../middleware/viewCount');




router.route('/tours')
    .get(tourController.getall)
    .post(tourController.createTour)

router.route('/tours/:id').get(viewCount, tourController.singleTour)


router.route('/tour/:id').patch(tourController.updateTour)


// router.route('/tour/trending').get('/')
router.route('/tour/cheapest').get(tourController.cheap)


module.exports = router