const express = require('express');
const router = express.Router();
const AdController = require('../controllers/ads.controller');

router.get('/api/ads', AdController.getAllAds);
router.get('/api/ads/:id', AdController.getAdById);
router.get('/api/ads/search/:searchPhrase', AdController.getAdsBySerchPhrase);
router.post('/api/ads', AdController.postNewAd);
router.put('/api/ads/:id', AdController.updateAd);
router.delete('/api/ads/:id', AdController.deleteAd); 

module.exports = router;