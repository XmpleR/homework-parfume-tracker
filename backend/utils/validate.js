const Ajv = require('ajv');
const ajv = new Ajv();
const { productSchema, offerSchema } = require('./schemas');

const validateProductSchema = ajv.compile(productSchema);
const validateOfferSchema = ajv.compile(offerSchema);

exports.validateProduct = (product) => {
  const valid = validateProductSchema(product);
  return valid ? null : validateProductSchema.errors;
};

exports.validateOffer = (offer) => {
  const valid = validateOfferSchema(offer);
  return valid ? null : validateOfferSchema.errors;
};