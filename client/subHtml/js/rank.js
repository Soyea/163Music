var listConfig=[
	{
		title:'云音乐特色榜',
		ranklistInfo:[
			{
				name:'UpfastList',
				imgUrl:'images/ListLogo/UpfastListLogoB.png',
				updateTime:'defaultDate',
			},
			{
				name:'NewList',
				imgUrl:'images/ListLogo/NewListLogoB.png',
				updateTime:'defaultDate',
			},
			{
				name:'OriginalList',
				imgUrl:'images/ListLogo/OriginalListLogoB.png',
				updateTime:'thursday',							
			},
			{
				name:'HottestList',
				imgUrl:'images/ListLogo/HottestListLogoB.png',
				updateTime:'friday'
			},				
		],				
	},
	{
		title:'全球媒体榜',
		ranklistInfo:[
			{
				name:'TWHitoList',
				imgUrl:'images/ListLogo/TWHitoListLogoB.png',
				updateTime:'friday',
			},
			{
				name:'BeatPortList',
				imgUrl:'images/ListLogo/BeatPortListLogoB.png',
				updateTime:'monday',
			},
			{
				name:'NRJVosHitsList',
				imgUrl:'images/ListLogo/NRJVosHitsListLogoB.png',
				updateTime:'wednesday',							
			},
			{
				name:'HitFMTopList',
				imgUrl:'images/ListLogo/HitFMTopListLogoB.png',
				updateTime:'saturday'
			},	
		],				
	},
]
var leftlist=Vue.extend({
	template:'#leftlist',
	props:['curRankList','fields'],
	data:function(){
		return{
			curLi:'',
		}
	},
	created:function(){
		if (!!this.curRankList) {
			this.curLi=this.curRankList;
		}
		for(var field in this.fields){
			for(var item in this.fields[field].ranklistInfo){
				if (this.fields[field].ranklistInfo[item].name==this.curRankList) {
					this.liTab(this.fields[field].ranklistInfo[item].name,this.fields[field].ranklistInfo[item].imgUrl,this.fields[field].ranklistInfo[item].updateTime);
					return;
				}
			}
		}
	},
	methods:{
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
					return "法国 NRJ Vos Hits周榜"
				case 'BeatPortList':
					return "Beatport全球电子舞曲榜"
				case 'defaultDate':
					return "每天更新"
				case 'sunday':
					return "每周日更新"
				case 'monday':
					return "每周一更新"
				case 'tuesday':
					return "每周二更新"
				case 'wednesday':
					return "每周三更新"
				case 'thursday':
					return "每周四更新"
				case 'friday':
					return "每周五更新"
				case 'saturday':
					return "每周六更新"
				default:
					return p;
			}
		},
		liTab:function(name,url,time){
			this.curLi=name;
			var obj={
				name:name,
				title:this.filterPro(name),
				imgUrl:url,
				updateTime:time,
			}
			this.$emit('list-change',obj);
		}
	},
});

var rightcon=Vue.extend({
	template:"#rightcon",
	props:['listInfo','listData','loginInfo'],
	data:function(){
		return {
			config:{
				headers:['','name','time','singer'],
			},
			curTr:-1,
			listFn:{
				add:{fnName:'add',src:'../images/addLogo.png',img:'../images/addLogo.png',hover:'../images/addLogo_hover.png'},
				play:{fnName:'play',src:'../images/playLogo.png',img:'../images/playLogo.png',hover:'../images/playLogo_hover.png'},
			}
		}
	},
	methods:{
		getTime:function(time){
			var weeks={
				sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6,
			}
			var d=new Date();
			var month=d.getMonth()+1+'月';
			var date=parseInt(d.getDate());
			var week=d.getDay();
			var str=month+date+'日';
			if (time=='defaultDate') {return str}
			if (weeks[time]<=week) {
				str=month+(date-(week-weeks[time]))+'日';
				return str;
			}
			if (weeks[time]>week) {
				str=month+(date-((week-weeks[time])+7))+'日';
				return str;
			}
			return '';
		},
		filterPro:function(p){
			switch(p){
				case 'defaultDate':
					return "每天更新"
				case 'sunday':
					return "每周日更新"
				case 'monday':
					return "每周一更新"
				case 'tuesday':
					return "每周二更新"
				case 'wednesday':
					return "每周三更新"
				case 'thursday':
					return "每周四更新"
				case 'friday':
					return "每周五更新"
				case 'saturday':
					return "每周六更新"
				case 'name':
					return "标题"
				case 'time':
					return "时长"
				case 'singer':
					return "歌手"
				default:
					return p;
			}
		},
		showData:function(list){
			if (!!list) {
				return list
			}else{
				return ''
			}
		},
		filterTime:function(p){
			var time=parseInt(p);
			var m=Math.floor(time/60);
			var s=time%60;
			var str=m+'分'+s+'秒';
			return str;
		},
		useFn:function(value,key){
			switch(value){
				case 'add':
					if (this.loginInfo.flag) {
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
	},
})