export const apiGatewayEventForTest = () => ({
  path: '/customer',
  resource: '/{proxy+}',
  queryStringParameters: {},

  requestContext: {
    apiId: 'id',
  },
  resourcePath: '/{proxy+}',
  apiId: 'xxxxxxxxxx',
});

export const contextForTest = () => ({
  awsRequestId: 'id',
  invokeid: 'id',
  logStreamName: '2015/09/22/[HEAD]13370a84ca4ed8b77c427af260',
  functionVersion: 'HEAD',
  isDefaultFunctionVersion: true,
  memoryLimitInMB: '1024',
  getRemainingTimeInMillis: () => 5997,
});

export function basiccustomerBody() {

  const customer = {

          /*id:"31a9923b-9ee1-4e9e-a3d4-8f800fabce54",*/
            details:{
                salutation:"Mr",
                firstName:"Sam",
                lastName:"Deere",
                email:"sam@welbot.io"
                 },
          userId:"31a9923b-9ee1-4e9e-a3d4-8f800fabce54",
          organisationId:"31a9923b-9ee1-4e9e-a3d4-8f800fabce54",
          account:{
                accountNumber:"STU0001",
                accountType:"D2C/B2B/Affiliate",
                accountStart:"2018-03-21",
                pricePerSeat:"5.50",
                monthlyPayment:"19.99",
                yearlyPayment:"2000.00",
                discount:{
                      discountType:"yearly",
                      discountPercentage:"10"
                      },              
                 affiliateCode:"",
                 licences:"20",
                 subscriptionPeriod:"24 months",
                 customerType:"Paid Beta",
                 cancellation:"True",
                 refund:"0",
                 refundAmount:"0",
                 payment:{
                        id:"SDFSD",
                        gatewayId:"SDFSD",
                        object:"card/bank transfer/cheque"
                        },                      
                 affiliate:{
                        affiliateType:"SDFSD",
                        affiliateId:"234ERW",
                        discount:{
                              affiliateCode:"SERFSF",
                              discountId:"SDFSD",
                              discountPercentage:"10"
                                 }
                        }

                  
                
                } //END "account"

        };


  return customer;
}
