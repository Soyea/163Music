var loginFrame=Vue.extend({
	template:'#loginFrame',
	data:function(){
		return {
			logoUrl:'images/logo.png',
			titleMsg:{ //判断登录状态显示信息
				isLogin:{msg:'亲爱的，',name:'用户'},
				noLogin:{msg:'登录云音乐'}
			},
		}
	},
	created:function(){
			if(!!cookieUtil.get('name')){
				this.titleMsg.isLogin.name=cookieUtil.get('name');
			}else{
				this.titleMsg.isLogin.name=cookieUtil.get('username');
			}
	},
	methods:{
		//按钮点击转到登录页面
		toLoginIn:function(){
			window.location.replace('../../loginIn.html');
		},
		toMyMusic:function(){
			window.location.replace('../../myMusic.html');
		}
	}
});