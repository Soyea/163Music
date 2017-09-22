var left_List=Vue.extend({
	template:'#left_List',
	data:function(){
		return{
			radioInfo:[
			],
			curLi:-1,
		}
	},
	created:function(){
		//此处发送请求获取数据
		this.getData();
	},
	methods:{
		addRadio:function(key){
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
					alert('此电台已添加');
				}else if(res.data=='1'){
					this.$emit('add-radio');					
					alert('添加成功');
				}
			},function(){});
		},
		getData:function(){
			this.$http({
				url:'http://localhost:8080/getRadios/dayRec/',
				method:'get',
				emulateJSON:true,
			}).then(function(res){
				this.radioInfo=res.data;
			},function(){});
		}
	}
})

var right_List=Vue.extend({
	template:'#right_List',
	props:['radioInfo'],
	computed:{
		totalNum:function(){
			return '（'+this.radioInfo.length+'）'
		}
	},
	methods:{
		delRadio:function(key){
			if (confirm('确定要删除吗？')) {
				this.$http({
					url:'http://localhost:8080/usersFn/delRadio/',
					method:'post',
					data:{
						key:key,
						username:cookieUtil.get('username'),
					},
					emulateJSON:true,
				}).then(function(res){
					if (res.data=='1') {
						this.$emit('del-radio');
						alert('删除成功');
					}else if(res.data=='0'){
						alert('请勿重复删除');
					}
				},function(){})					
			}
		}
	}
})

var radio_Body=Vue.extend({
	template:'#radio_Body',
	components:{leftlist:left_List,rightlist:right_List},
	data:function(){
		return {
			radioInfo:[],
		}
	},
	created:function(){
		this.getData();
	},
	methods:{
		getData:function(){
			if (!!cookieUtil.get('username')) {
				this.$http({
					url:'http://localhost:8080/getRadios/myRadio/'+cookieUtil.get('username'),
					method:'get',
					emulateJSON:true,
				}).then(function(res){
					this.radioInfo=res.data;			
				},function(){})					
			}
		},
	}
})