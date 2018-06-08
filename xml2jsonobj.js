var parseString = require('xml2js').parseString;
 
module.exports = xml2jsonobj;

function xml2jsonobj( xml )
{
	let jsonObj = new Object();

	parseString( xml, (err, result)=>{
	      //TODO: error checking
	      //console.log(err);
	      //console.log(JSON.stringify(result));
	      jsonObj = result;	            
	  });

	return jsonObj;
}


