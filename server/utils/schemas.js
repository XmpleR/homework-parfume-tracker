exports.productSchema = {
  type: 'object',
  required: ['name', 'producer', 'size'],
  properties: {
    name: { type: 'string', minLength: 2 },
    producer: { type: 'string', minLength: 2 },
    size: { type: 'string', pattern: '^\\d+\\s?ml$' }
  },
  additionalProperties: false
};

exports.offerSchema = {
  type: 'object',
  required: ['productId', 'company', 'price', 'date'],
  properties: {
    productId: { type: 'string', minLength: 1 },
    company: { type: 'string', minLength: 2 },
    price: { type: 'number', minimum: 0.01 },
    date: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
    note: { type: 'string' }
  },
  additionalProperties: false
};