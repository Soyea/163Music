var back_TopBtn=Vue.extend({
	template:'#back_TopBtn',
	data:function(){
		return{
			isShow:false,
		}
	},
	created:function(){
		var that=this;
		document.onscroll=function(){
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			that.isShow=scrollTop==0?false:true;
		}
	}
});
Vue.component('backtop',back_TopBtn);