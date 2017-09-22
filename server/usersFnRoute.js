var querystring=require('querystring');
var url=require('url');
var MongoClient=require('mongodb').MongoClient;
var DB_STR="mongodb://localhost:27017/vue-data";

var usersFn={
	addMusic:function(req,res){
		var qStr='';
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		req.addListener('end',function(){
			var data=querystring.parse(qStr);
			// console.log(data);
			MongoClient.connect(DB_STR,function(err,db){ //�������ݿ�
				if (err) {console.log(err);res.end('����������δ֪����');db.close()}
				db.eval('userAddMusic(\''+JSON.stringify(data)+'\')',function(err,result){
					// console.log(result)
					res.end(result);
					db.close();
				});
			});
		});
	},
	delMusic:function(req,res){
		var qStr='';
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		req.addListener('end',function(){
			var data=querystring.parse(qStr);
			MongoClient.connect(DB_STR,function(err,db){ //�������ݿ�
				if (err) {console.log(err);res.end('����������δ֪����');db.close()}
				db.eval('userDelMusic(\''+JSON.stringify(data)+'\')',function(err,result){
					res.end(result);
					db.close();
				});
			});
		});
	},
	addRadio:function(req,res){
		var qStr='';
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		req.addListener('end',function(){
			var data=querystring.parse(qStr);
			// console.log(data);
			MongoClient.connect(DB_STR,function(err,db){ //�������ݿ�
				if (err) {console.log(err);res.end('����������δ֪����');db.close()}
				var collection=db.collection('users');
				collection.findOne({username:data.username},function(err,doc){
					var result=doc;
					for(var i=0;i<result.radios.length;i++){
						if(result.radios[i].id==data.key){
							res.end('0');
							db.close();
							return;
						}
					}
					var temp={id:data.key}
					result.radios.push(temp);
					collection.update({username:data.username},{$set:{radios:result.radios}});
					res.end('1');
					db.close();
				})
			});
		});
	},
	delRadio:function(req,res){
		var qStr='';
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		req.addListener('end',function(){
			var data=querystring.parse(qStr);
			MongoClient.connect(DB_STR,function(err,db){ //�������ݿ�
				if (err) {console.log(err);res.end('����������δ֪����');db.close()}
				db.eval('userDelRadio(\''+JSON.stringify(data)+'\')',function(err,result){
					res.end(result);
					db.close();
				});
			});
		});
	},
	userSetUpdate:function(req,res){
		var qStr='';
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		req.addListener('end',function(){
			var data=JSON.parse(querystring.parse(qStr).data);
			var key=querystring.parse(qStr).username;
			console.log(key);
			console.log(data);
			MongoClient.connect(DB_STR,function(err,db){ //�������ݿ�
				if (err) {console.log(err);res.end('����������δ֪����');db.close()}
				var collection=db.collection('users');
				collection.update({username:key},{$set:data},true,false);
				res.end('1');
				db.close();
			});
		});
	},
	userSetGet:function(req,res){
		var qStr='';
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		req.addListener('end',function(){
			var key=querystring.parse(qStr).username;
			MongoClient.connect(DB_STR,function(err,db){ //�������ݿ�
				if (err) {console.log(err);res.end('����������δ֪����');db.close()}
				var collection=db.collection('users');
				collection.findOne({username:key},{_id:0,password:0,radios:0,musicList:0,isAgree:0},function(err,doc){
					res.end(JSON.stringify(doc));
					db.close();
				});
			});
		});
	}
}
module.exports=usersFn;