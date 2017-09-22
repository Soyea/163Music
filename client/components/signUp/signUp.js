var signUp=Vue.extend({
	template:'#signUp',
	data:function(){
		return{
			isShowAd:true,
			fields:[
				{name: 'username'},
				{name:'password'},
				{
					name:'sex',
					type:'radio',
					options:[
						{name:'男',value:'male'},
						{name:'女',value:'female'},
					]
				},
				{name:'telnumber'}
			],
			signUpData:{},
			testError:{
				username:{msg:'',msgA:'* 用户名只能是英文或者数字4-10个字符',msgB:'* 用户名未填写',show:false},
				password:{msg:'',msgA:'* 密码要求6-18位',msgB:'* 密码未填写',show:false},
				sex:{msg:'',msgA:'',msgB:'* 性别未填写',show:false},
				isAgree:{msg:'',msgA:'',msgB:'* 用户协议未接受',show:false},
				telnumber:{msg:'',msgA:'手机号码不正确',msgB:'* 手机号码未填写',show:false}
			},
			cookieData:['username','password'],
			url:'http://localhost:8080/signUp/',
			adUrl:'images/signUp_ad.png',
			testInfoFlag:false,
		}
	},
	created:function(){
		for(var i in this.fields){
			this.signUpData[this.fields[i].name]='';
		}
		this.signUpData.isAgree='true';
	},
	methods:{
		signUp:function(){
			this.testInfo(this.signUpData);
			if (this.testInfoFlag) {
				// console.log('可以注册');
				// 把注册的用户名存在cookie中
				for(var i in this.cookieData){
					cookieUtil.set(this.cookieData[i],this.signUpData[this.cookieData[i]]);
				}
				this.$http({
					url:this.url,
					method:'post',
					data:this.signUpData,
					emulateJSON:true,
				}).then(function(res){
					if(!res.data){
						alert('此用户名已存在');
					}else{
						if(confirm('是否自动跳转到首页')){
							
							window.location.replace("index.html");
						}else{
							window.location.reload();
						}
						// alert(res.data);
						//跳转页面
					}
				},function(){})
			}else{
				console.log('不可以注册');
			}

		},
		closeAD:function(){
			if (confirm('广告做了很久的，别关掉好不好？')) {
				this.isShowAd=!this.isShowAd;
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
		//验证信息函数
		testInfo:function(data){
			//验证是否为空，为空则出现验证错误信息
			for(var p in data){
				if (!data[p]) {
					this.testError[p].msg=this.testError[p].msgB;
					this.testError[p].show=true;					
				}else{
					this.testError[p].show=false;
				}
			}
			//信息为空返回false，不可注册
			for(var p in data){
				if (!data[p]) {
					this.testInfoFlag=false;
					return;
				}else{
					if (p=='username'||p=='password'||p=="telnumber") {
						switch(p){
							case 'username':
								if(!this.checkUserName(data[p])){
									this.testError[p].msg=this.testError[p].msgA;
									this.testError[p].show=true;
									this.testInfoFlag=false;
									return;
								};
								break;
							case 'password':
								if(!this.checkPassword(data[p])){
									this.testError[p].msg=this.testError[p].msgA;
									this.testError[p].show=true;
									this.testInfoFlag=false;
									return;
						 		};
								break;
							case 'telnumber':
								if(!this.checkTel(data[p])){
									this.testError[p].msg=this.testError[p].msgA;
									this.testError[p].show=true;
									this.testInfoFlag=false;
									return;
								};
								break;
							default:
								break;
						}
					}
				}
			}
			this.testInfoFlag=true;
		},
		//验证手机号
		checkTel:function (value){
			var re = /^1[3|4|5|7|8]\d{9}$/;//手机号码正则表达式
			return re.test(value);
		},
		//验证密码 (6-18位，字母、数字、特殊符)
		checkPassword:function (value){
			var re=/^.{6,18}$/;
			return re.test(value);
		},
		//验证用户名只能是英文或者数字 (4-10位)
		checkUserName:function (value){
			var re=/^[A-Za-z0-9]{4,10}$/;
			return re.test(value);
		},
	}
});