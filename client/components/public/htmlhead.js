var htm_head=Vue.extend({
	template:'#htm_head',
	props:['curhtml'],
	data:function(){
		return {
			logoUrl:'images/logo.png',//logo图片路径
			mainMenu:[
				{name:'发现音乐',url:'../../index.html'},
				{name:'音乐库',url:'../../musicStore.html'},
				{name:'我的音乐',url:'../../myMusic.html'},
				{name:'我的电台',url:'../../myRadio.html'},
				{name:'关于我们',url:'../../aboutUs.html'},
			],//主菜单标题
			subMenu:[
				{name:'推荐',url:'../../index.html'},
				{name:'排行榜',url:'../../subHtml/rank.html'},
				{name:'主播电台',url:'../../subHtml/radio.html'},
				{name:'歌单',url:'../..//subHtml/musiclist.html'},
			],//子菜单标题
			loginInUrl:'../../loginIn.html',
			signUpUrl:'../../signUp.html',
			userUrl:'../../users.html',
			attitudeMsg:{
				isFlag:{msg:'欢迎，'},//登录状态下
				noFlag:{msg:'登录'},//未登录状态下
			},//登录状态显示信息
			attitudeFlag:false, // 记录登录状态
			loginInShow:false, //登录按钮处的下拉
			curMainMenu:0, //当前主菜单激活索引
			curSubMenu:0, // 当前子菜单激活索引
			cookieData:{username:'',password:'',},//用来保存当前的cookie用户数据
			url:"http://localhost:8080/userTest/",
		}
	},
	watch:{
		attitudeFlag:function(){
			this.$emit('login-change',this.attitudeFlag);
		},
		curMainMenu:function(){
			this.$emit('menu-change',{curMainMenu:this.curMainMenu,curSubMenu:this.curSubMenu,});
		},
		curSubMenu:function(){
			this.$emit('menu-change',{curMainMenu:this.curMainMenu,curSubMenu:this.curSubMenu,});			
		}
	},
	created:function(){
		if (!!this.curhtml) {
			this.curMainMenu=this.curhtml.curMainMenu;
			this.curSubMenu=this.curhtml.curSubMenu;			
		}
		//加载之前 获取cookie并存起来
		for(var p in this.cookieData){
			this.cookieData[p]=cookieUtil.get(p);
		}
		//验证用户名
		this.userTest();
		//发送给父组件当前登录状态,因为在页面上退出登录会刷新页面，但是不会触发watch，所以在加载的时候也发送一次
		this.$emit('login-change',this.attitudeFlag);
		this.$emit('menu-change',{curMainMenu:this.curMainMenu,curSubMenu:this.curSubMenu,});
	},
	methods:{
		//验证用户
		userTest:function(){
			//此处要发送ajax请求，获取testItem，来验证用户名
			this.$http({
				url:this.url,
				method:"post",
				data:this.cookieData,
				emulateJSON:true,
			}).then(function(res){
				if (res.data.flag=='1') {//返回1 验证成功
					if(!!res.data.name){
						this.attitudeMsg.isFlag.msg+=res.data.name;
						cookieUtil.set('name',res.data.name);
					}else{
						this.attitudeMsg.isFlag.msg+=this.cookieData.username;
					}
					this.attitudeFlag=true;
				}else if(res.data.flag=='0'){ //返回0 验证失败
					this.attitudeFlag=false;
					return;
				}
			},function(){});
		},
		//退出登录清空cookie
		loginOut:function(){
			cookieUtil.del('username');
			cookieUtil.del('password');
		},
		mainMenuTab:function(index){
			this.curMainMenu=index;
			window.location.replace(this.mainMenu[index].url);
		},
		subMenuTab:function(index){
			this.curSubMenu=index;
			window.location.replace(this.subMenu[index].url);
		}
	},
})
Vue.component('htmlhead',htm_head);