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
	  return( (0, objectSchema)().keys({
	    	salutation: (0, stringSchema)().optional(),
	    	firstName: (0, stringSchema)().required(),
	    	lastName: (0, stringSchema)().required(),
			email: (0, emailSchema)().required()
	    }).required() ); 
	};

	const discountSchema = ()=> {
		return( (0, objectSchema)().keys({
				discountType: (0, stringSchema)(),
				discountPercentage: (0, numberSchema)()
				}).optional() ); 
		};

	//TODO: is id here a uuid??	gateway-id??							  			
	const paymentSchema = ()=> {
		return( (0, objectSchema)().keys({
				id: (0, stringSchema)(),
				gatewayId: (0, stringSchema)(),
				object: (0, stringSchema)()
				}).required() ); 
		};	

	const affiliateDiscountSchema = ()=> {
		return( (0, objectSchema)().keys({
				affiliateCode: (0, stringSchema)(),
				discountId: (0, stringSchema)(),
				discountPercentage: (0, numberSchema)()
				}).optional() ); 
		};									 				

	const affiliateSchema = ()=> {
		return( (0, objectSchema)().keys({
				affiliateType: (0, stringSchema)(),
				affiliateId: (0, stringSchema)(),
				discount: (0, affiliateDiscountSchema)()
				}).optional() ); 
		};	

	const accountSchema = ()=> {
		return( (0, objectSchema)().keys({

				accountNumber: (0, stringSchema)().required(),
				accountType: (0, stringSchema)().required(),
				accountStart: (0, dateSchema)().required(),
				pricePerSeat: (0, numberSchema)().required(),
				monthlyPayment: (0, numberSchema)().required(),
				yearlyPayment: (0, numberSchema)().required(),
				discount: (0, discountSchema)().optional(),
				affiliateCode: (0, stringSchema)().optional(),
				licences: (0, numberSchema)().required(),
				subscriptionPeriod: (0, stringSchema)().required(),
				customerType: (0, stringSchema)().required(),
				cancellation: (0, stringSchema)().required(),
				refund: (0, stringSchema)().optional(),
				refundAmount:(0, numberSchema)().optional(),	
				payment: (0, paymentSchema)().required(),	
				affiliate: (0, affiliateSchema)().optional()						

			}).required() ); 
	};	

	const customerValidationSchema = {
		  body: {
					id: (0, uuidSchema)(), 
					details: (0,detailsSchema)().required(),
					userId: (0, uuidSchema)().required(),
					organisationId: (0, uuidSchema)().optional(),
					account: (0,accountSchema)().required()
		  }
	};

	const customerRequiredKeys = ["details","userId","account"];
	const customerOptionalKeys = ["organisationId"];

	return(
	{
	  validationSchema: customerValidationSchema,
	  requiredKeys: customerRequiredKeys,
	  optionalKeys: customerOptionalKeys
	});

}
