const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');
const AdController = require('../controllers/ads.controller');

router.get('/ads', AdController.getAllAds);
router.get('/ads/:id', AdController.getAdById);
router.get('/ads/search/:searchPhrase', AdController.getAdsBySerchPhrase);
router.post('/ads', authMiddleware, imageUpload.single('photo'), AdController.postNewAd);
router.put('/ads/:id', authMiddleware, imageUpload.single('photo'), AdController.updateAd);
router.delete('/ads/:id', authMiddleware, AdController.deleteAd); 

module.exports = router;