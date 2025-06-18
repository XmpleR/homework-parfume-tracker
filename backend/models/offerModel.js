const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/offers.json');

function getAllOffers() {
  return JSON.parse(fs.readFileSync(dataPath));
}

function addOffer(offer) {
  const offers = getAllOffers();
  const newOffer = { id: Date.now().toString(), ...offer };

  offers.push(newOffer);
  try {
    fs.writeFileSync(dataPath, JSON.stringify(offers, null, 2));
  } catch (err) {
    console.error('Failed to write offer data:', err);
    throw new Error('Could not save offer data.');
  }

  return newOffer;
}

module.exports = { getAllOffers, addOffer };

function deleteOffer(id) {
  const offers = getAllOffers();
  const updated = offers.filter(o => o.id !== id);
  fs.writeFileSync(dataPath, JSON.stringify(updated, null, 2));
}

module.exports.deleteOffer = deleteOffer;
