var grid=Vue.extend({
	template:"#grid",
	props:["data"],
	data:function(){
		return{
			id:"id",
			headers:["编号","歌曲","歌手","时长","风格"],
			fields:["id","name","singer","time","type"]
		};
	},
	methods:{
		del:function(e,key){
			if(!confirm('你要删除这首歌曲吗？')) return;
			this.$emit('user-del',key);
		},
		filterPro:function(p){
			switch(p){
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
		}
	}
});
Vue.component("grid",grid);