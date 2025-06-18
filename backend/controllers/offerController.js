const { getAllOffers, addOffer } = require('../models/offerModel');
const { validateOffer } = require('../utils/validate');

exports.getOffers = (req, res) => {
  res.json(getAllOffers());
};

exports.createOffer = (req, res) => {
  const offer = req.body;
  const error = validateOffer(offer);
  if (error) return res.status(400).json({ error });

  const newOffer = addOffer(offer);
  res.status(201).json(newOffer);
};