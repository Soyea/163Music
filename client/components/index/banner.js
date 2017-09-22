var banner=Vue.extend({
	template:'#index_banner',
	data:function(){
		return{
			curBanner:0,
			curBannerBg:'',
			bannerImgsInfo:[
				{url:'images/banners/banner1.jpg',bgUrl:'images/banners/banner1_bg.jpg'},
				{url:'images/banners/banner2.jpg',bgUrl:'images/banners/banner2_bg.jpg'},
				{url:'images/banners/banner3.jpg',bgUrl:'images/banners/banner3_bg.jpg'},
				{url:'images/banners/banner4.jpg',bgUrl:'images/banners/banner4_bg.jpg'},
				{url:'images/banners/banner5.jpg',bgUrl:'images/banners/banner5_bg.jpg'},
				{url:'images/banners/banner6.jpg',bgUrl:'images/banners/banner6_bg.jpg'},
				{url:'images/banners/banner7.jpg',bgUrl:'images/banners/banner7_bg.jpg'},
			],
			timer:null
		}
	},
	created:function(){
		this.curBannerBg=this.bannerImgsInfo[this.curBanner].bgUrl;
		this.startAutoTab();
	},
	watch:{
		curBanner:function(){
			var that=this;
			setTimeout(function(){
				that.curBannerBg=that.bannerImgsInfo[that.curBanner].bgUrl
			},400);
		},
	},
	methods:{
		stopAutoTab:function(){
			clearInterval(this.timer);
		},
		startAutoTab:function(){
			this.timer=setInterval(this.nextBanner,3000);
		},
		bannerTab:function(i){
			this.curBanner=i;
		},
		nextBanner:function(){
			if (this.curBanner==this.bannerImgsInfo.length-1) {
				this.curBanner=0;
			}else{
				this.curBanner++;
			}
		},
		preBanner:function(){
			if (this.curBanner==0) {
				this.curBanner=this.bannerImgsInfo.length-1;
			}else{
				this.curBanner--;
			}
		}
	},
})