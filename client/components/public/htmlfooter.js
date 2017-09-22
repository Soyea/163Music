var htm_footer=Vue.extend({
	template:'#htm_footer',
	data:function(){
		return {
			footA:['音乐推荐','客户服务','音乐商城','关于我们','意见反馈'],
			footContent:'传习教育H5-年薪百万小组版权所有©2014-2017',
		}
	},
});
Vue.component('htmlfooter',htm_footer);