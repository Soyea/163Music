var htm_mainbody=Vue.extend({
	template:"#htm_mainbody",
	data:function(){
		return{
			userName:"",
			leftH:"创建的歌单",
			allData:[],
			btns:["播放","下载"],
			songList:"歌曲列表",
			data:{list:[]},
			span:"",
		};
	},
	computed:{
		pSmall:function(){
			return "共 "+this.data.list.length+" 首";
		}
	},
	created:function(){
		this.getData();
	},
	methods:{
		getData:function(){
			this.$http({
				url:'http://localhost:8080/getMusicData/users/'+cookieUtil.get('username'),
				method:'get',
				emulateJSON:true,
			}).then(function(res){
				this.allData=res.data;
				this.data=this.allData[0];
				this.span=this.allData[0].name;
				this.userName=cookieUtil.get("username");			
			},function(){})			
		},
		filterPro:function(p){
			switch(p){
				case 'default':
					return '我喜欢的音乐';
				default:
					return p;
			}
		},
		changeList:function(name){
			for(var i=0;i<this.allData.length;i++){
				if(this.allData[i].name==name){
					ths.data=this.allData[i];
					this.span=this.allData[i].name;
				}
			}
		},
		userDelMusic:function(key){
			this.$http({
				url:'http://localhost:8080/usersFn/delMusic/',
				method:'post',
				data:{
					key:key,
					username:cookieUtil.get('username'),
					listName:this.span
				},
				emulateJSON:true,
			}).then(function(res){
				this.getData()
				if (res.data=='1') {
					alert('删除成功');
				}
			},function(){})	
		}
	}
});
Vue.component("htmlmainbody",htm_mainbody);