var querystring=require('querystring');
var MongoClient=require('mongodb').MongoClient;
var DB_STR="mongodb://localhost:27017/vue-data";

var getMusicData={
	store:function(req,res){
		var qStr='';
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		req.addListener('end',function(){
			var searchInfo=querystring.parse(qStr).data;
			//分析searchInfo
			// console.log(searchInfo);
			MongoClient.connect(DB_STR,function(err,db){ //连接数据库
				if (err) {console.log(err);res.end('服务器出现未知错误');db.close()}
				db.eval('getMusicData(\''+searchInfo+'\')',function(err,result){
					res.end(JSON.stringify(result));
					db.close();
				});
			});
		});		
	},
	users:function(req,res){
		var key=req.url.match(/[^\/]+$/)[0];
		// console.log(key);
		MongoClient.connect(DB_STR,function(err,db){ //连接数据库
			if (err) {console.log(err);res.end('服务器出现未知错误');db.close()}
			db.eval('getUserList("'+key+'")',function(err,result){
				res.end(JSON.stringify(result));
				db.close();
			});
		});
	},
}
module.exports=getMusicData;

