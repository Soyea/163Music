var querystring=require('querystring');
var MongoClient=require('mongodb').MongoClient;
var DB_STR="mongodb://localhost:27017/vue-data";

var getRadios={
	//获取今日推荐的电台数据
	dayRec:function(req,res){
		MongoClient.connect(DB_STR,function(err,db){ //连接数据库
			if (err) {console.log(err);res.end('服务器出现未知错误');db.close()}
			var collection=db.collection('radios');
			var data=[]
			collection.find({},{_id:0}).toArray(function(err,result){
				for(var i=0;i<10;i++){
					data.push(result[Math.floor(Math.random()*40)]);
				}
				res.end(JSON.stringify(data));
			})
		});
	},
	//获取我的电台数据
	myRadio:function(req,res){
		var key=req.url.match(/[^\/]+$/)[0];
		MongoClient.connect(DB_STR,function(err,db){ //连接数据库
			if (err) {console.log(err);res.end('服务器出现未知错误');db.close()}
			db.eval('getUserRadios("'+key+'")',function(err,result){
				res.end(JSON.stringify(result));
				db.close();
			});
		});
	},
	getRadiosData:function(req,res){
		var qStr='';
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		})
		req.addListener('end',function(){
			var searchInfo=JSON.parse(querystring.parse(qStr).data);
			// console.log(JSON.parse(searchInfo));
			var condition=searchInfo.condition;
			var seperator=searchInfo.seperator;
			var pageSize=parseInt(seperator.pageSize);
			var skip=(seperator.curIndex-1)*pageSize;
			var radioData={
				total:0,
				data:[]
			}
			MongoClient.connect(DB_STR,function(err,db){
				if (err) {console.log(err),res.end('服务器出现未知错误');db.close()}
				var collection=db.collection('radios');
				collection.find(condition).count(function(err,result){
					radioData.total=result;
				});
				collection.find(condition,{_id:0,}).skip(skip).limit(pageSize).toArray(function(err,result){
					radioData.data=result;
					res.end(JSON.stringify(radioData));
					db.close();
				});
			});
		});
	}
}
module.exports=getRadios;