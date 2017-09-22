var querystring=require('querystring');
var MongoClient=require('mongodb').MongoClient;
var DB_STR="mongodb://localhost:27017/vue-data";

function userTest(req,res){
	var qStr='';
	req.addListener('data',function(dataPart){
		qStr+=dataPart;
	});
	req.addListener('end',function(){
		var userInfo=querystring.parse(qStr);
		// console.log(userInfo);
		MongoClient.connect(DB_STR,function(err,db){ //连接数据库
			if (err) {console.log(err);res.end('服务器出现未知错误');db.close()}
			var collection=db.collection('users');
			//判断是否存在用户名
			collection.find({username:userInfo.username,password:userInfo.password}).toArray(function(err,result){
				if (!result[0]) { //不存在用户名
					var temp={
						flag:'0',
						name:'',
					}					
					res.end(JSON.stringify(temp)); //返回用户名不存在
					db.close();
				}else{
					var temp={
						flag:'1',
						name:result[0].name,
					}
					res.end(JSON.stringify(temp));//验证通过
					db.close();
				}
			});
		});
	});
}
module.exports=userTest;