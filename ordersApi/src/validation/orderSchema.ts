export const orderSchema = {
  type: 'object',
  required: ['user', 'items'],
  additionalProperties: false,
  properties: {
    user: {
      type: 'object',
      required: ['name', 'email', 'address'],
      additionalProperties: false,
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        address: { type: 'string' }
      }
    },
    items: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name', 'quantity', 'categoryId'],
        additionalProperties: false,
        properties: {
                categoryId: { type: 'number' },
                name: { type: 'string' },
                quantity: { type: 'integer', minimum: 1 }
         }
        }
      }
    }
};

