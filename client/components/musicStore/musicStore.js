var searchTab=Vue.extend({
	template:'#searchTab_Body',
	data:function(){
		return{
			config:[
				{title:'language',tabs:['all','chinese','english','cantonese','french']},
				{title:'type',tabs:['all','pop','classic','rap']},
				{title:'creatYear',tabs:['all','2014','2015','2016','2017']},
			],
			curTab:{
				key:'',
				language:'all',
				type:'all',
				creatYear:'all',
			},
		}
	},
	created:function(){
		this.tabChange();
	},
	methods:{
		filterPro:function(p){
			switch(p){
				case 'language': return '语种';
				case 'type': return '类型';
				case 'creatYear': return '年份';
				case 'chinese': return '华语';
				case 'english': return '英语';
				case 'cantonese': return '粤语';
				case 'french': return '法语';
				case 'pop': return '流行';
				case 'classic': return '古典';
				case 'rap': return '说唱';
				case 'all': return '全部';
				default : return p;
			}
		},
		tabChange:function(title,tab){
			if (!!title&&!!tab) {
				this.curTab[title]=tab;
			}
			var info={}
			for(var p in this.curTab){
				info[p]=this.curTab[p]
			}
			this.$emit('tab-change',info);
			this.curTab.key='';
		},
	}
});

var musicGrid=Vue.extend({
	template:'#musicGrid',
	props:['listData','loginInfo','totalNum'],
	data:function(){
		return{
			config:{
				headers:['','name','creatYear','type','time','singer'],
			},
			curTr:-1,
			listFn:{
				add:{fnName:'add',src:'./images/addLogo.png',img:'./images/addLogo.png',hover:'./images/addLogo_hover.png'},
				play:{fnName:'play',src:'./images/playLogo.png',img:'./images/playLogo.png',hover:'./images/playLogo_hover.png'},
			},
		}
	},
	methods:{
		filterPro:function(p){
			switch(p){
				case 'creatYear':
					return "发布时间"
				case 'name':
					return "标题"
				case 'time':
					return "时长"
				case 'singer':
					return "歌手"
				case 'type':
					return "类型"
				case 'pop':
					return '流行';
				case 'folk':
					return '民谣';
				case 'rap':
					return '说唱';
				case 'mood':
					return '心情';
				case 'blue':
					return '蓝调';
				case 'hipop':
					return '嘻哈';
				case 'classic':
					return '古典';
				case 'rock':
					return '摇滚';
				default:
					return p;
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
	}
});
var page=Vue.extend({
	template:'#page',
	computed:{
		totalPages:function(){
			return Math.ceil(this.seperator.total/this.seperator.pageSize);
		}
	},
	data:function(){
		return {
			pagesNum:8,
			skipPage:1,
			pageTabN:0,
			seperator:searchInfo.seperator,
		}
	},
	methods:{
		change:function(i){
			var i=parseInt(i);
			// console.log(this.seperator);
			if(i==0) return;
			if(i>this.totalPages) return;
			if (i==this.totalPages) {
				this.seperator.curIndex=i;
				this.$emit('change-page');
				return;
			}
			if (i>this.pagesNum+this.pageTabN) {
				this.pageTabN=i-this.pagesNum;
			}else if(i<this.pageTabN+1){
				this.pageTabN=i-1;
			}
			this.seperator.curIndex=i;
			console.log(this.seperator);
			this.$emit('change-page');
			// console.log("pegeTabM:"+this.pageTabN);
			// console.log("当前页:"+this.seperator.curIndex);
		}
	}
})