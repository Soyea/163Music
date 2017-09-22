var hot_Musiclist=Vue.extend({
	template:'#hot_Musiclist',
	props:['loginInfo'],
	data:function(){
		return {
			title:'榜单', //标题
			titleMore:'更换榜单', //标题里箭头左方的文本内容
			curLi:-1, //鼠标滑过当前激活的Li
			listItems:[{},{},{},{},{},{},{},{},{},{}], //列表内容
			url:'http://localhost:8080/getMusicRankList/',
			listname:'UpfastList',
			listArr:['UpfastList','NewList','OriginalList','HottestList','TWHitoList','BeatPortList','NRJVosHitsList','HitFMTopList'],
			onOff:0,
		}
	},
	computed:{
		listLogo:function(){//计算logo的路径
			return "images/ListLogo/"+this.listname+"LogoB.png";
		}
	},
	created:function(){
		//此处发送请求获取数据
		this.changeList();
	},
	methods:{
		getData:function(){
			//此处发送请求获取数据
			this.$http({
				url:this.url+this.listname,
				method:'get',
				emulateJSON:true,
			}).then(function(res){
				var data=res.data.list;
				this.listItems=data.slice(0,10);
			},function(){});
		},
		filterPro:function(p){
			switch(p){
				case 'UpfastList':
					return "云音乐飙升榜"
				case 'NewList':
					return "云音乐新歌榜"
				case 'OriginalList':
					return "云音乐原创榜"
				case 'HottestList':
					return "云音乐热歌榜"
				case 'TWHitoList':
					return "台湾Hito排行榜"
				case 'HitFMTopList':
					return "Hit FM Top榜"
				case 'NRJVosHitsList':
					return "NRJ Vos Hits榜"
				case 'BeatPortList':
					return "全球电子舞曲榜"
				default:
					return p
					break;
			}
		},
		useFn:function(value,key){
			switch(value){
				case 'add':
					if (this.$store.state.loginFlag) {
						//发送ajax请求 添加音乐,key为添加的音乐id
						this.$http({
							url:'http://localhost:8080/usersFn/addMusic/',
							method:'post',
							data:{
								username:cookieUtil.get('username'),
								key:key,
								listName:'default',
							},
							emulateJSON:true,
						}).then(function(res){
							if (res.data=='0') {
								alert('歌曲已存在收藏列表');
							}else if(res.data=='1'){
								alert('添加成功')
							}
						},function(){});
					}else{
						alert('请先登录');
					}
					break;
				default :
					alert('此功能暂未添加');
					break
			}
		},
		changeList:function(){
			this.listname=this.listArr[Math.floor(Math.random()*this.listArr.length)];
			this.getData();
		},
		addAll:function(){
			if(!this.$store.state.loginFlag){
				alert('请先登录');
				return;
			}
			for(var item in this.listItems){
				//发送ajax请求 添加音乐,key为添加的音乐id
				this.$http({
					url:'http://localhost:8080/usersFn/addMusic/',
					method:'post',
					data:{
						username:cookieUtil.get('username'),
						key:this.listItems[item].id,
						listName:'default',
					},
					emulateJSON:true,
				}).then(function(res){
					if (res.data=='0') {//此歌曲已存在

					}else if(res.data=='1'){//添加成功

					}
				},function(){});
			}
		}
	},
});