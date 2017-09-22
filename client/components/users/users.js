var user_Set=Vue.extend({
	template:'#user_Set',
	data:function(){
		return {
			options:[
				{name:'基本设置',config:[
					{name:'username'},
					{name:'name'},
					{
						name:'sex',
						type:'radio',
						default:'male',
						options:[
							{name:'男',value:'male'},
							{name:'女',value:'female'}
						]
					},
					{name:'telnumber'},
					{
						name:'area',
						type:'select',
						default:'',
						options:[
							[
								{name:'江西省',value:"江西省"},
								{name:'广东省',value:"广东省"}
							],
							[
								{name:'南昌市',value:"南昌市"},
								{name:'深圳市',value:"深圳市"}
							]
						]
					}
				]},
				{name:'更多设置',config:[]},
				{name:'略略略略',config:[]}
			],
			curTab:0,
			userBaseInfo:{
				username:'',
				name:'',
				telnumber:'',
				sex:'',
				area:{province:'',city:''}
			},
			isDisabled:'false',
		}
	},
	created:function(){
		this.getUserSet();
	},
	methods:{
		filterPro:function(p){
			switch(p){
				case 'username':return '用户名'
				case 'name': return '昵称'
				case 'sex': return '性别'
				case 'area' : return '地区'
				case 'telnumber':return '手机号'
				default : return p
			}
		},
		submitSet:function(type){
			var key=type.toString()
			switch(key){
				case '0': //设置基本信息
					console.log(this.userBaseInfo);
					this.$http({
						url:'http://localhost:8080/usersFn/userSetUpdate',
						data:{
							username:cookieUtil.get('username'),
							data:JSON.stringify(this.userBaseInfo),
						},
						method:'post',
						emulateJSON:true,
					}).then(function(res){
						cookieUtil.set('name',this.userBaseInfo.name);
						if(res.data=='1') {
							window.location.reload();
						};
					},function(){});
					break;
				default: return;
			}
		},
		getUserSet:function(){
			this.$http({
				url:'http://localhost:8080/usersFn/userSetGet',
				data:{
					username:cookieUtil.get('username'),
				},
				method:'post',
				emulateJSON:true,
			}).then(function(res){
				for(var p in res.data){
					this.userBaseInfo[p]=res.data[p];
				}
			},function(){});
		},
	}
})