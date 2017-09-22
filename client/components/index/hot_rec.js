var hot_rec=Vue.extend({
	template:'#hot_rec',
	data:function(){
		return{
			titleMore:'更多',
			title:'热门推荐',
			curCase:'chinese',
			selCases:['chinese','popular','rock'],
			images:{},
		}
	},
	created:function(){
		//此处发送ajax请求获取热门推荐的数据
		this.images=testHotRec;
	},
	methods:{
		filterPro:function(p){
			switch(p){
				case 'chinese':
					return '华语';
					break;
				case 'popular':
					return '流行';
					break;
				case 'rock':
					return '摇滚';
					break;
				default:
					return p;
					break;
			}
		},
	},
})