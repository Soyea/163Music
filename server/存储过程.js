// // 榜单歌曲获取
// //调用getListMusic传入需要获取的榜单名字
// //
// //musicRankList
// // db.system.js.insert({
// // 	_id:'getmusicRankList',
// // 	value:function(key){
// // 		var list=db.musicRankList.find({name:key}).toArray()[0];
// // 		var arr=[]
// // 		for(var i in list.list){
// // 			var temp=db.musics.find({id:list.list[i].id}).toArray()[0];
// // 			arr.push(temp);
// // 		}
// // 		return arr;
// // 	}
// // });
// // //测试代码
// // db.eval('getmusicRankList("newList")');


// // 获取所有音乐数据并筛选
// // db.system.js.insert({
// // 	_id:'getMusicData',
// // 	value:function(searchInfo){
// // 		var data=JSON.parse(searchInfo);
// // 		var condition=data.condition;
// // 		var seperator=data.seperator;
// // 		var pageSize=parseInt(seperator.pageSize);
// // 		var skip=(seperator.curIndex-1)*pageSize;
// // 		var searchInfo={};
// // 		if (!!condition.key) {
// // 			searchInfo={"$or":[{"name":{$regex:condition.key}},{"singer":{$regex:condition.key}}]};
// // 		}
// // 		for(var p in condition){
// // 			if (p!='key'&&condition[p]!='all')  {
// // 				searchInfo[p]={$regex:condition[p]}
// // 			}
// // 		}
// // 		return {
// // 			total:db.musics.count(searchInfo),
// // 			data:db.musics.find(searchInfo,{_id:0}).skip(skip).limit(pageSize).toArray()
// // 		}
// // 	}
// // });

// // 测试代码
// // var data={
// // 		condition:{
// // 			key:'',
// // 			language:'all',
// // 			type:'all',
// // 			creatYear:'all',
// // 		},
// // 		seperator:{
// // 			total:0,
// // 			curIndex:1,
// // 			pageSize:10,
// // 		}
// // }
// // db.eval('getMusicData(\''+JSON.stringify(data)+'\')');

// // db.system.js.find()
// // db.system.js.remove({_id:'getMusicData'});
// // 
// // 获取用户歌单
// // getUserList
// // db.system.js.insert({
// // 	_id:'getUserList',
// // 	value:function(key){
// // 		var userInfo=db.users.find({username:key}).toArray()[0];
// // 		var allData=userInfo.musicList;
// // 		for(var i=0;i<userInfo.musicList.length;i++){
// // 			var arr=[];
// // 			for(var j=0;j<userInfo.musicList[i].list.length;j++){
// // 				var temp=db.musics.find({id:userInfo.musicList[i].list[j]}).toArray()[0];
// // 				arr.push(temp);
// // 			}
// // 			allData[i].list=arr;
// // 		}
// // 		return allData;
// // 	}
// // });
// // //测试代码
// // db.eval('getUserList("jeodeng")');
// // 
// // 
// // 用户功能：
// // 添加音乐
// db.system.js.remove({_id:'userAddMusic'})

// var temp={
// 	username:'jeodeng',
// 	key:'0129',
// 	listName:'default'
// }
// db.eval('userAddMusic(\''+JSON.stringify(temp)+'\')')

// db.system.js.insert({
// 	_id:'userAddMusic',
// 	value:function(qStr){
// 		var data=JSON.parse(qStr);
// 		var userInfo=db.users.find({username:data.username}).toArray()[0];
// 		for(var i=0;i<userInfo.musicList.length;i++){
// 			if (userInfo.musicList[i].name==data.listName) {
// 				for(var j=0;j<userInfo.musicList[i].list.length;j++){
// 					if (userInfo.musicList[i].list[j]==data.key) {
// 						return '0';
// 					}
// 				}
// 				userInfo.musicList[i].list.push(data.key);
// 				db.users.update({username:data.username},userInfo);
// 				return '1';
// 			}
// 		}
// 	}
// })
// //删除音乐
// var temp={
// 	username:'jeodeng',
// 	key:'0129',
// 	listName:'default'
// }
// db.eval('userDelMusic(\''+JSON.stringify(temp)+'\')')

// db.system.js.remove({_id:'userDelMusic'})
// db.system.js.insert({
// 	_id:'userDelMusic',
// 	value:function(qStr){
// 		var data=JSON.parse(qStr);
// 		var userInfo=db.users.find({username:data.username}).toArray()[0];
// 		for(var i=0;i<userInfo.musicList.length;i++){
// 			if (userInfo.musicList[i].name==data.listName) {
// 				for(var j=0;j<userInfo.musicList[i].list.length;j++){
// 					if (userInfo.musicList[i].list[j]==data.key) {
// 						userInfo.musicList[i].list.splice(j,1);
//                         db.users.update({username:data.username},userInfo);	
// 						return '1';
// 					}
// 				}
// 				return '0';
// 			}
// 		}
// 	}
// })

//删除电台
// var temp={
// 	username:'jeodeng',
// 	key:'20170005',
// }
// db.eval('userDelRadio(\''+JSON.stringify(temp)+'\')')

// db.system.js.remove({_id:'userDelRadio'})
// db.system.js.insert({
// 	_id:'userDelRadio',
// 	value:function(qStr){
// 		var data=JSON.parse(qStr);
// 		var userInfo=db.users.find({username:data.username}).toArray()[0];
// 		var radios=userInfo.radios
// 		for(var i=0;i<radios.length;i++){
// 			if (radios[i].id==data.key) {
// 					radios.splice(i,1);
//                     db.users.update({username:data.username},{$set:{radios:radios}})
// 					return '1';
// 			}
// 		}
// 		return '0';
// 	}
// })


//获取用户电台数据
// getUserRadios
// db.system.js.insert({
// 	_id:'getUserRadios',
// 	value:function(key){
// 		var userInfo=db.users.find({username:key}).toArray()[0];
// 		var data=[]
// 		for(var j=0;j<userInfo.radios.length;j++){
// 			var temp=db.radios.find({id:userInfo.radios[j].id},{_id:0}).toArray()[0];
// 			data.push(temp);
// 		}
// 		return data;
// 	}
// });
//测试代码
// db.eval('getUserRadios("jeodeng")');
// 
// 
// 获取所有音乐数据并筛选
db.system.js.insert({
	_id:'getMusicData',
	value:function(searchInfo){
		var data=JSON.parse(searchInfo);
		var condition=data.condition;
		var seperator=data.seperator;
		var pageSize=parseInt(seperator.pageSize);
		var skip=(seperator.curIndex-1)*pageSize;
		if (!!condition.key) {
			searchInfo={"$or":[{"name":{$regex:condition.key}},{"singer":{$regex:condition.key}}]};
		}
		for(var p in condition){
			if (p!='key'&&condition[p]!='all')  {
				searchInfo[p]={$regex:condition[p]}
			}
		}
		return {
			total:db.musics.count(searchInfo),
			data:db.musics.find(searchInfo,{_id:0}).skip(skip).limit(pageSize).toArray()
		}
	}
});