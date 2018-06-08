import vandium from 'vandium';

module.exports  = customer();

function customer(){

/********DATA SPECS**********************


	"customer":{
					"id":"GUID",
					"details":{
								"salutation":"Mr",
								"first-name":"Sam",
								"last-name":"Deere",
								"email":"sam@welbot.io"
							   },
					"user-id":"GUID",
					"organisation-id":"",
					"account":{
								"account-number":"STU0001",
								"account-type":"D2C/B2B/Affiliate",
								"account-start":"2018-03-21",
								"price-per-seat":"5.50",
								"monthly-payment":"",
								"yearly-payment":"2000.00",
								"discount":{
											"discount-type":"yearly",
											"discount-percentage":"10"
											},							
								 "affiliate-code":"",
								 "licences":"20",
								 "subscription-period":"24 months",
								 "customer-type":"Paid Beta",
								 "cancellation":"True",
								 "refund":"",
								 "refund-amount":"",
								 "payment":{
								  			"id":"",
								  			"gateway-id":"",
								  			"object":"card/bank transfer/cheque"
								  			},							  			
								 "affiliate":{
								 				"affiliate-type":"",
								 				"affiliate-id":"",
								 				"discount":{
								 							"affiliate-code":"",
								 							"discount-id":"",
								 							"discount-percentage":"10"
								 						     }
								 				}

					 				
								
								} //END "account"


				}


*/


	const uuidSchema = ()=>{
	  return vandium.types.uuid();
	};

	const stringSchema = ()=>{
	  return vandium.types.string();
	};

	const emailSchema = ()=>{

	  let emailRegEx = new RegExp( 
	  	"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");	  
	  
	  return vandium.types.string().regex(emailRegEx,'string');

	};

	const numberSchema = ()=>{
	  return vandium.types.number();
	};

	const dateSchema = ()=>{
	  return vandium.types.date();
	};	

	const objectSchema = ()=>{
	  return vandium.types.object();
	};	

	const detailsSchema = ()=> {
	  return( (0, objectSchema)().keys({
	    	salutation: (0, stringSchema)(),
	    	'first-name': (0, stringSchema)().required(),
	    	'last-name': (0, stringSchema)().required(),
			email: (0, emailSchema)().required()
	    }).required() ); 
	};

	const discountSchema = ()=> {
		return( (0, objectSchema)().keys({
				"discount-type": (0, stringSchema)(),
				"discount-percentage": (0, numberSchema)()
				}) ); 
		};

	//TODO: is id here a uuid??	gateway-id??							  			
	const paymentSchema = ()=> {
		return( (0, objectSchema)().keys({
				"id": (0, stringSchema)(),
				"gateway-id": (0, stringSchema)(),
				"object": (0, stringSchema)()
				}).required() ); 
		};	

	const affiliateDiscountSchema = ()=> {
		return( (0, objectSchema)().keys({
				"affiliate-code": (0, stringSchema)(),
				"discount-id": (0, stringSchema)(),
				"discount-percentage": (0, numberSchema)()
				}) ); 
		};									 				

	const affiliateSchema = ()=> {
		return( (0, objectSchema)().keys({
				"affiliate-type": (0, stringSchema)(),
				"affiliate-id": (0, stringSchema)(),
				"discount": (0, affiliateDiscountSchema)()
				}) ); 
		};	

	const accountSchema = ()=> {
		return( (0, objectSchema)().keys({

				"account-number": (0, stringSchema)().required(),
				"account-type": (0, stringSchema)().required(),
				"account-start": (0, dateSchema)().required(),
				"price-per-seat": (0, numberSchema)().required(),
				"monthly-payment": (0, numberSchema)().required(),
				"yearly-payment": (0, numberSchema)().required(),
				"discount": (0, discountSchema)(),
				"affiliate-code": (0, stringSchema)(),
				"licences": (0, numberSchema)().required(),
				"subscription-period": (0, stringSchema)().required(),
				"customer-type": (0, stringSchema)().required(),
				"cancellation": (0, stringSchema)().required(),
				"refund": (0, stringSchema)(),
				"refund-amount":(0, numberSchema)(),	
				"payment": (0, paymentSchema)(),	
				"affiliate": (0, affiliateSchema)()						

			}).required() ); 
	};		

	//TODO: Go one-by-one property and verify all match!

	const customerValidationSchema = {
		
		customer:{
					id: (0, uuidSchema)(),
					"details": (0,detailsSchema)().required(),
					"user-id": (0, uuidSchema)().required(),
					"organisation-id": (0, stringSchema)(),
					"account": (0,accountSchema)().required()
				}

	};

	//TODO: What are the required keys?
	const customerRequiredKeys = [];
	const customerOptionalKeys = [];

	return(
	{
	  validationSchema: customerValidationSchema,
	  requiredKeys: customerRequiredKeys,
	  optionalKeys: customerOptionalKeys
	});

}
