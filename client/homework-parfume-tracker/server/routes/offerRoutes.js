const express = require('express');
const router = express.Router();
const { getOffers, createOffer } = require('../controllers/offerController');

router.get('/', getOffers);
router.post('/', createOffer);

module.exports = router;