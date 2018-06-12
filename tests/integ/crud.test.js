import { utilities } from '@welbot/sdk';
import * as create from '../../create';
import * as get from '../../get';
import * as list from '../../list';
import * as update from '../../update';

import { apiGatewayEventForTest, contextForTest, basiccustomerBody } from '../test-shared';

const { isoStringRegex } = utilities;

let customerId;
const customerBody = basiccustomerBody();
const updatedcustomerBody = basiccustomerBody(true);
updatedcustomerBody.adminTitle = 'updated_test_customer';
updatedcustomerBody.description = 'updated customer is updated';


test('create customer', async (done) => {
  console.log('create.');

  const event = apiGatewayEventForTest();
  event.httpMethod = 'POST';
  event.body = JSON.stringify(customerBody);

  const context = contextForTest();
  context.logGroupName = '/aws/lambda/customer-prod-create';
  context.functionName = 'customer-prod-create';

  const callback = (error, response) => {
    console.log(response);
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('string');
    const responseBody = JSON.parse(response.body);
    expect(typeof responseBody.id).toBe('string');
    expect(typeof responseBody.createdAt).toBe('string');
    customerId = responseBody.id;
    Object.keys(customerBody).forEach((key) => {
      console.log(`key is checking: ${key}`);
      expect(responseBody[key]).toBeTruthy();
      expect(responseBody[key]).toEqual(customerBody[key]);
    });
    done();
  };
  await create.main(event, context, callback);
});

test('get created customer', async (done) => {
  console.log('get.');
  const event = apiGatewayEventForTest();
  event.pathParameters = { id: customerId };
  event.httpMethod = 'GET';
  const context = contextForTest();
  context.logGroupName = '/aws/lambda/customer-prod-get';
  context.functionName = 'customer-prod-get';

  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('string');
    const responseBody = JSON.parse(response.body);
    expect(JSON.parse(response.body).id).toBe(customerId);
    console.log('customerId checked.');
    Object.keys(customerBody).forEach((key) => {
      console.log(`key is checking: ${key}`);
      expect(responseBody[key]).toBeTruthy();
      console.log(` equal checking: ${key}, value: ${customerBody[key]}`);
      expect(responseBody[key]).toEqual(customerBody[key]);
    });
    done();
  };

  await get.main(event, context, callback);
});

test('list succeeds', async (done) => {
  console.log('list.');
  const event = apiGatewayEventForTest();
  event.httpMethod = 'GET';

  const context = contextForTest();
  context.logGroupName = '/aws/lambda/customer-group-service-prod-list';
  context.functionName = 'customer-group-service-prod-list';

  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('string');

 
    expect(typeof JSON.parse(response.body)[0].details).toBe('object');
    expect(typeof JSON.parse(response.body)[0].details["firstName"]).toBe('string');
    expect(typeof JSON.parse(response.body)[0].details["lastName"]).toBe('string');
    expect(typeof JSON.parse(response.body)[0].details["email"]).toBe('string');

    expect(typeof JSON.parse(response.body)[0]["user-id"]).toBe('uuid');

    expect(typeof JSON.parse(response.body)[0].account).toBe('object');
    expect(typeof JSON.parse(response.body)[0].account["accountNumber"]).toBe('string');
    expect(typeof JSON.parse(response.body)[0].account["accountType"]).toBe('string');
    expect(typeof JSON.parse(response.body)[0].account["accountStart"]).toBe('date');
    expect(typeof JSON.parse(response.body)[0].account["pricePerSeat"]).toBe('number');
    expect(typeof JSON.parse(response.body)[0].account["licences"]).toBe('number');
    expect(typeof JSON.parse(response.body)[0].account["subscriptionPeriod"]).toBe('string');
    done();
  };

  await list.main(event, context, callback);
});

test('update customer content', async (done) => {
  console.log('update.');
  const event = apiGatewayEventForTest();
  event.pathParameters = { id: customerId };
  event.httpMethod = 'PUT';
  event.body = JSON.stringify(updatedcustomerBody);

  event.pathParameters = { id: customerId };
  const context = contextForTest();
  context.logGroupName = '/aws/lambda/customer-prod-update';
  context.functionName = 'customer-prod-update';

  const callback = (error, response) => {
    console.log(response);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBe('{"status":true}');
    done();
  };

  await update.main(event, context, callback);
});

test('get updated customer', async (done) => {
  console.log('get.');
  const event = apiGatewayEventForTest();
  event.pathParameters = { id: customerId };
  event.httpMethod = 'GET';
  const context = contextForTest();
  context.logGroupName = '/aws/lambda/customer-prod-get';
  context.functionName = 'customer-prod-get';
  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('string');
    const responseBody = JSON.parse(response.body);
    expect(JSON.parse(response.body).id).toBe(customerId);
    Object.keys(updatedcustomerBody).forEach((key) => {
      console.log(`key is checking: ${key}`);
      expect(responseBody[key]).toBeTruthy();
      console.log(` equal checking: ${key}, value: ${customerBody[key]}`);
      expect(responseBody[key]).toEqual(updatedcustomerBody[key]);
    });
    done();
  };

  await get.main(event, context, callback);
});


test('get fails on deleted customer', async (done) => {
  console.log('get.');
  const event = apiGatewayEventForTest();
  event.pathParameters = { id: customerId };
  event.httpMethod = 'GET';
  const context = contextForTest();
  context.logGroupName = '/aws/lambda/customer-prod-get';
  context.functionName = 'customer-prod-get';

  const callback = (error, response) => {
    expect(response.statusCode).toEqual(500);
    expect(response.body).toBe('{"type":"Error","message":"Item not found."}');
    done();
  };

  await get.main(event, context, callback);
});
