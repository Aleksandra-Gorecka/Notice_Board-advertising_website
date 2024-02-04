const Ad = require('../models/ad.model');

exports.getAllAds = async (req, res) => {
    try {
        res.json(await Ad.find());
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.getAdById = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);
        if(!ad) res.status(404).json({ message: 'Ad not found' });
        else res.json(ad);
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.getAdsBySerchPhrase = async (req, res) => {
    
};

exports.postNewAd = async (req, res) => {
    try {
        const { title, description, publicationDate, image, price, location, seller } = req.body;
        const newAd = new Ad(
            {   title: title, 
                description: description, 
                publicationDate: publicationDate, 
                image: image,
                price: price, 
                location: location, 
                seller: seller });
        await newAd.save();
        res.json({ message: 'OK' });
      } catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.updateAd = async (req, res) => {
    const { title, description, publicationDate, image, price, location, seller } = req.body;
    try {
      const ad = await Ad.findById(req.params.id);
      if(ad) {
        ad.title = title;
        ad.description = description;
        ad.publicationDate = publicationDate;
        ad.image = image;
        ad.price = price;
        ad.location = location;
        ad.seller = seller

        await ad.save();
        res.json({ message: 'OK'})
    }
      else res.status(404).json({ message: 'Ad not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.deleteAd = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);
        if(ad) {
          await Ad.deleteOne({ _id: req.params.id });
          res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Ad not found...' });
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
};

