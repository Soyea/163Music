var searchInfo={
	condition:{},
	seperator:{
		total:0,
		curIndex:1,
		pageSize:20,
	}
}

var searchTab=Vue.extend({
	template:'#searchTab_Body',
	data:function(){
		return{
			config:[
				{title:'有声读物',logoUrl:'./images/radios/有声读物Logo.png'},
				{title:'知识技能',logoUrl:'./images/radios/知识技能Logo.png'},
				{title:'明星做主播',logoUrl:'./images/radios/明星做主播Logo.png'},
				{title:'人文历史',logoUrl:'./images/radios/人文历史Logo.png'},
				{title:'商业财经',logoUrl:'./images/radios/商业财经Logo.png'},
			],
			curTab:'有声读物',
		}
	},
	methods:{
		tabChange:function(name){
			if (!!name) {
				// console.log(name);
				this.curTab=name;
			}
			this.$emit('tab-change',this.curTab);
		},
		getAll:function(){
			this.$emit('tab-change');
		}
	}
});

var radioList=Vue.extend({
	template:'#radioList_Body',
	props:['loginInfo','radioData'],
	computed:{
		totalNum:function(){
			return '共 '+this.radioData.total+' ';
		},
		itemsL:function(){
			return this.radioData.data.slice(0,10);
		},
		itemsR:function(){
			return this.radioData.data.slice(10,20);
		}
	},
	methods:{
		addRadio:function(key){
			if (!this.loginInfo.flag) {
				alert('请先登录用户')
			}else{
				this.$http({
					url:'http://localhost:8080/usersFn/addRadio/',
					method:'POST',
					data:{
						key:key,
						username:cookieUtil.get('username'),
					},
					emulateJSON:true,
				}).then(function(res){
					if(res.data=='0'){
						alert('此电台已添加至我的电台');
					}else if(res.data=='1'){
						this.$emit('add-radio');					
						alert('添加成功');
					}
				},function(){});
			}
		},
		nextPage:function(){
			this.$emit('next-page')
		}
	}
})