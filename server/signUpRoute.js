var querystring=require('querystring');
var MongoClient=require('mongodb').MongoClient;
var DB_STR="mongodb://localhost:27017/vue-data";

function signUp(req,res){
	var qStr='';
	req.addListener('data',function(dataPart){
		qStr+=dataPart;
	});
	req.addListener('end',function(){
		var userInfo=querystring.parse(qStr);
		userInfo.musicList=[{name:'default',listImg:'images/Dyh/defaultListLogo.png',list:[]}],
		userInfo.radios=[],
		userInfo.name='',
		MongoClient.connect(DB_STR,function(err,db){ //连接数据库
			if (err) {console.log(err);res.end('服务器出现未知错误');db.close()}
			var collection=db.collection('users');
			//判断是否存在相同用户名
			collection.find({username:userInfo.username}).toArray(function(err,result){
				if (!result[0]) { //不存在用户名即可注册新用户
					collection.insert(userInfo);
					res.end('注册成功'); //返回注册成功
					db.close();
				}else{
					res.end(false);//返回一个false表示用户名已存在
					db.close();
				}
			});
		});
	});
}
module.exports=signUp;