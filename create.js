import { crud, models } from '@welbot/sdk';

//TODO: include this into '@welbot/sdk' as part of models
import customer from './customer';
models.customer = customer;
//END TODO

const { createBase, transferCallDataToDynamoRequestParameters } = crud.dynamoCreate;

const customerDefinition = models.customer;

const customerCreateParams = (baseParams, data, id) => {
  
  const params = transferCallDataToDynamoRequestParameters(baseParams, data, customerDefinition);
  params.TableName = 'customer';
  params.Item.id = id;

  console.log(params);
  return params;
};

// eslint-disable-next-line import/prefer-default-export
export const main = createBase(customerCreateParams, customerDefinition.validationSchema);