import Ajv from 'ajv';
import orderSchema from './schemas/create-order+v1';

export const handler = (order, _, callback) => {

  const schemaValidator = new Ajv();

  schemaValidator.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

  schemaValidator.addSchema(orderSchema);

  const isOrderValid = schemaValidator.validate('http://localhost/create-order+v1.json', order);

  if (!isOrderValid) {
    console.log(schemaValidator.errorsText());

    callback(schemaValidator.errorsText());
  }
 
  callback(null, order);
};
