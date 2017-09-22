var MongoClient=require('mongodb').MongoClient;
var DB_STR="mongodb://localhost:27017/vue-data";

function getMusicRankList(req,res){
	var key=req.url.match(/[^\/]+$/)[0];
	MongoClient.connect(DB_STR,function(err,db){
		if (err) {console.log(err);res.end('服务器出现未知错误');db.close()}
		var data={};
		var collection=db.collection('musicRankList');
		collection.find({name:key}).toArray(function(err,result){
			data=result[0];
		});
		db.eval('getmusicRankList("'+key+'")',function(err,result){
			data.list=result;
			res.end(JSON.stringify(data));
			db.close();
		});
	})
}
module.exports=getMusicRankList;