const Ad = require('../models/ad.model');
const getImageFileType = require('../utils/getImageFileType');
const sanitize = require("mongo-sanitize");
const fs = require('fs');

exports.getAllAds = async (req, res) => {
    try {
        res.json(await Ad.find().populate({ path: 'user', select: '-password' }));
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.getAdById = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id).populate({ path: 'user', select: '-password' });
        if(!ad) res.status(404).json({ message: 'Ad not found' });
        else res.json(ad);
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.getAdsBySerchPhrase = async (req, res) => {
  try {
    const searchPhrase = req.params.searchPhrase

    const sanitizedSearchPhrase = searchPhrase.replace(/\+/g, ' ');
    const searchResults = await Ad.find({
        $or: [
          { title: { $regex: new RegExp(sanitizedSearchPhrase, 'i') } },
          { description: { $regex: new RegExp(sanitizedSearchPhrase, 'i') } },
          { location: { $regex: new RegExp(sanitizedSearchPhrase, 'i') } },
        ],
    }).populate({ path: 'user', select: '-password' });

    if (searchResults.length > 0) {
        res.json(searchResults);
    } else {
        res.json({ message: 'No search results...' });
    }

  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postNewAd = async (req, res) => {
    try {
        const { title, description, publicationDate, price, location } = sanitize(req.body);
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

        if (title && typeof title === 'string' && 
            description && typeof description === 'string' && 
            publicationDate && !isNaN(Date.parse(publicationDate)) &&
            price && !isNaN(price) && 
            location && typeof location === 'string' &&
            req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {

            const newAd = new Ad(
              { title: title, 
                description: description, 
                publicationDate: publicationDate, 
                photo: req.file.filename,
                price: price, 
                location: location, 
                user: req.session.user.id }); 

            await newAd.save();
            res.json({ message: 'New ad added successfully', ad: newAd });

        } else {
          const path = req.file ? req.file.path : null;
          fs.unlinkSync(req.file.path);
          res.status(409).send({ message: 'Bad request' });
        }

      } catch(err) {
        const path = req.file ? req.file.path : null;
        fs.unlinkSync(req.file.path);
        res.status(500).json({ message: err.message });
      }
};

exports.updateAd = async (req, res) => {
    const { title, description, publicationDate, price, location } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    try {

      if ( title && typeof title === 'string' && 
          description && typeof description === 'string' && 
          publicationDate && !isNaN(Date.parse(publicationDate)) &&
          price && !isNaN(price) && 
          location && typeof location === 'string') {

          const ad = await Ad.findById(req.params.id);

          if(ad && ad.user == req.session.user.id) {
            ad.title = title;
            ad.description = description;
            ad.publicationDate = publicationDate;
            ad.price = price;
            ad.location = location;

            if (req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
              fs.unlinkSync(req.file.path);
              ad.photo = req.file.filename;
            }

            await ad.save();
            res.json({ message: 'Ad updated', ad });

          } else {
            res.status(404).json({ message: 'Ad not found...' + ad.user + ' ' + req.session.user.id});
          }
      } else {
        res.status(409).send({ message: 'Invalid data added' });
      }
    } catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.deleteAd = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);

        if(ad) {
          await Ad.deleteOne({ _id: req.params.id });
          fs.unlinkSync(req.file.path);
          res.json({ message: 'Ad deleted', ad });
        }
        else res.status(404).json({ message: 'Ad not found...' });
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
};

