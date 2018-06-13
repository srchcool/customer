import vandium from 'vandium';

module.exports  = customer();

function customer(){

/********DATA SPECS**********************


{
		  id:"uuid",
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
                 affiliateCode:"ASDARRE",
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
	  return( objectSchema().keys({
	    	salutation: stringSchema().optional(),
	    	firstName: stringSchema().required(),
	    	lastName: stringSchema().required(),
			email: emailSchema().required()
	    }).required() ); 
	};

	const discountSchema = ()=> {
		return( objectSchema().keys({
				discountType: stringSchema(),
				discountPercentage: numberSchema()
				}).optional() ); 
		};

	//TODO: is id here a uuid??	gateway-id??							  			
	const paymentSchema = ()=> {
		return( objectSchema().keys({
				id: stringSchema(),
				gatewayId: stringSchema(),
				object: stringSchema()
				}).required() ); 
		};	

	const affiliateDiscountSchema = ()=> {
		return( objectSchema().keys({
				affiliateCode: stringSchema(),
				discountId: stringSchema(),
				discountPercentage: numberSchema()
				}).optional() ); 
		};									 				

	const affiliateSchema = ()=> {
		return( objectSchema().keys({
				affiliateType: stringSchema(),
				affiliateId: stringSchema(),
				discount: affiliateDiscountSchema()
				}).optional() ); 
		};	

	const accountSchema = ()=> {
		return( objectSchema().keys({

				accountNumber: stringSchema().required(),
				accountType: stringSchema().required(),
				accountStart: dateSchema().required(),
				pricePerSeat: numberSchema().required(),
				monthlyPayment: numberSchema().required(),
				yearlyPayment: numberSchema().required(),
				discount: discountSchema().optional(),
				affiliateCode: stringSchema().optional(),
				licences: numberSchema().required(),
				subscriptionPeriod: stringSchema().required(),
				customerType: stringSchema().required(),
				cancellation: stringSchema().required(),
				refund: stringSchema().optional(),
				refundAmount:numberSchema().optional(),	
				payment: paymentSchema().required(),	
				affiliate: affiliateSchema().optional()						

			}).required() ); 
	};	

	const customerValidationSchema = {
		  body: {
					id: uuidSchema(), 
					details: detailsSchema().required(),
					userId: uuidSchema().required(),
					organisationId: uuidSchema().required(),
					account: accountSchema().required()
		  }
	};

	const customerRequiredKeys = ["details","userId","organisationId","account"];
	const customerOptionalKeys = [];

	return(
	{
	  validationSchema: customerValidationSchema,
	  requiredKeys: customerRequiredKeys,
	  optionalKeys: customerOptionalKeys
	});

}
