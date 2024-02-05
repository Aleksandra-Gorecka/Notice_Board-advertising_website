const express = require('express');
const router = express.Router();
const AdController = require('../controllers/ads.controller');

router.get('/ads', AdController.getAllAds);
router.get('/ads/:id', AdController.getAdById);
router.get('/ads/search/:searchPhrase', AdController.getAdsBySerchPhrase);
router.post('/ads', AdController.postNewAd);
router.put('/ads/:id', AdController.updateAd);
router.delete('/ads/:id', AdController.deleteAd); 

module.exports = router;