const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    publicationDate: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    seller: { type: String, required: true },
  });

module.exports = mongoose.model('Ad', adSchema);