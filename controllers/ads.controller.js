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
        const { title, description, price, location } = sanitize(req.body);
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

        //console.log(title, description, price, location, fileType );

        if (title && typeof title === 'string' && 
            description && typeof description === 'string' &&
            price && !isNaN(Number(price)) && 
            location && typeof location === 'string') {

              if (!req.session.user.id) {
                if (req.file) {
                  fs.unlinkSync(req.file.path)
                }
                return res.status(401).json({ message: 'You need to be logged in' });
              }

              if (!req.file || !['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
                if (req.file) {
                    fs.unlinkSync(req.file.path)
                }
                return res.status(400).json({ message: 'Please upload an image file' });
            }

            //validation
            const pattern = new RegExp(/([A-z\d\s.,!?$-*:]*)/, 'g');
            const titleMatched = title.match(pattern).join('');
            const descriptionMatched = description.match(pattern).join('');

            const locationPattern = new RegExp(/([A-z\s-]*)/, 'g');
            const locationMatched = location.match(locationPattern).join('');

            if (titleMatched.length < title.length || 
              descriptionMatched.length < description.length || 
              locationMatched.length < location.length ||
              price <= 0) {
              if (req.file) {
                fs.unlinkSync(req.file.path);
              }
              return res.status(400).json({ message: 'Invalid characters' });
            }

            const currentDate = new Date();

            //create new Ad
            const newAd = new Ad(
              { title: title, 
                description: description, 
                publicationDate: currentDate, 
                photo: req.file.filename,
                price: price, 
                location: location, 
                user: req.session.user.id }); 

            await newAd.save();
            res.status(201).json({ message: 'New ad added successfully' + newAd });

        } else {
          if (req.file) {
            fs.unlinkSync(req.file.path);
          }
          res.status(400).send({ message: 'Bad request ' });
        }

      } catch(err) {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: err.message });
      }
};


exports.updateAd = async (req, res) => {
    const { title, description, price, location } = sanitize(req.body);
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    try {
      const ad = await Ad.findById(req.params.id);

      if(ad && ad.user == req.session.user.id) {

        //validation
        const pattern = new RegExp(/([A-z\d\s.,!?$-*:]*)/, 'g');
        const locationPattern = new RegExp(/([A-z\s-]*)/, 'g');

        if (title && typeof title === 'string') {
          const titleMatched = title.match(pattern).join('');
          if (titleMatched.length < title.length) return res.status(400).json({ message: 'Invalid title' });
          ad.title = title
        };
        if (description && typeof description === 'string') {
          const descriptionMatched = description.match(pattern).join('');
          if (descriptionMatched.length < description.length) return res.status(400).json({ message: 'Invalid description' });
          ad.description = description;
        };
        if (price && !isNaN(Number(price))) ad.price = price;
        if (location && typeof location) {
          const locationMatched = location.match(locationPattern).join('');
          if (locationMatched.length < location.length) return res.status(400).json({ message: 'Invalid characters' });
          ad.location = location
        };
        if (req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
          fs.unlinkSync(path.join(__dirname,'..','public','uploads',ad.photo));
          ad.photo = req.file.filename;
        }

        await ad.save();
        res.status(201).json({ message: 'Ad updated'});

      } else {
        res.status(404).json({ message: 'Ad not found...'});
      }
      
    } catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.deleteAd = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);

        if(ad && ad.user == req.session.user.id) {
          await Ad.deleteOne({ _id: req.params.id });
          fs.unlinkSync(path.join(__dirname,'..','public','uploads',ad.photo));
          res.json({ message: 'Ad deleted' });
        }
        else res.status(404).json({ message: 'Ad not found...' });
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
};

