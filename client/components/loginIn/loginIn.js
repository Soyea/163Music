var loginIn=Vue.extend({
	template:'#loginIn',
	data:function(){
		return{
			fields:[
				{name: 'username'},
				{name:'password'},
			],
			loginInData:{},
			testError:{
				username:{msg:'用户名未填写'},
				password:{msg:'密码未填写'},
				isAgree:{msg:'用户协议未接受'},
			},
			cookieData:['username','password'],
			url:"http://localhost:8080/userTest/",
		}
	},
	created:function(){
		for(var i in this.fields){
			this.loginInData[this.fields[i].name]='';
		}
		this.loginInData.isAgree='true';
	},
	methods:{
		loginIn:function(){
			if (!!this.testInfo(this.loginInData)) {
				// console.log('可以登录');
				//把注册的用户名存在cookie中
				for(var i in this.cookieData){
					cookieUtil.set(this.cookieData[i],this.loginInData[this.cookieData[i]]);
				}
				this.$http({
					url:this.url,
					method:'post',
					data:this.loginInData,
					emulateJSON:true,
				}).then(function(res){
					if (res.data.flag=='1') {
						// 返回1 验证成功 跳转界面
						cookieUtil.set('name',res.data.name);
						window.location.replace("index.html");
					}else if(res.data.flag=='0'){ //返回0 验证失败
						alert('用户名或密码错误');
						return;
					}
				},function(){})
			}
		},
		showProp:function(p){
			//在页面中不显示esername，一个过滤函数
			switch(p){
				case 'username':
					return '用户名';
					break;
				case 'password':
					return '密码';
					break;
				case 'sex':
					return '性别';
					break;
				case 'telnumber':
					return '手机号';
					break;
				default:
					return p;
					break;
			}
		},
		testInfo:function(data){
			//验证是否为空，为空则出现验证错误信息
			//信息验证失败返回false，不可登录
			for(var p in data){
				if (!data[p]) {
					alert(this.testError[p].msg)
					return false;
				}
			}
			//通过验证可以注册返回true
			return true;
		}
	}
});