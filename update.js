import { crud, models } from '@welbot/sdk';

//TODO: include this into '@welbot/sdk' as part of models
var customer = require('./customer');
models.customer = customer;
//END TODO

const { updateBase, getUpdateExpressionWithAttributeValues } = crud.dynamoUpdate;
const customerDefinition = models.customer;

const customerUpdateParams = (baseParams, data, id) => {
  const params = JSON.parse(JSON.stringify(baseParams));
  params.TableName = 'customer';
  params.Key = { id };

  const updateExpressionWithAttributeValues = getUpdateExpressionWithAttributeValues(
    params.UpdateExpression,
    data,
    customerDefinition,
  );
  console.log(updateExpressionWithAttributeValues.updateExpression);

  params.UpdateExpression = updateExpressionWithAttributeValues.updateExpression;
  Object.assign(
    params.ExpressionAttributeValues,
    updateExpressionWithAttributeValues.newExpressionAttributeValues,
  );

  return params;
};

// eslint-disable-next-line import/prefer-default-export
export const main = updateBase(customerUpdateParams, customerDefinition.validationSchema);
