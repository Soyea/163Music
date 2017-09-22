function route(req,res){
	var reg=/^\/(\w+)\/(\w*)/;
	var result=req.url.match(reg);
	switch(result[1]){
		case 'signUp':
			var signUp=require('./signUpRoute.js');
			signUp(req,res);
			break;
		case 'userTest':
			var userTest=require('./userTestRoute.js');
			userTest(req,res);
			break;
		case 'getMusicRankList':
			var getMusicRankList=require('./getMusicRankListRoute.js');
			getMusicRankList(req,res);
			break;
		case 'usersFn':
			var usersFn=require('./usersFnRoute.js');
			usersFn[result[2]](req,res);
			break;
		case 'getMusicData':
			var getMusicData=require('./getMusicDataRoute.js');
			getMusicData[result[2]](req,res);
			break;
		case 'getRadios':
			var getRadios=require('./getRadiosRoute.js');
			getRadios[result[2]](req,res);
			break;
		default:
			res.end();
			break;
	}
}
module.exports=route