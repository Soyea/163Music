var mainbody=Vue.extend({
	template:"#mainbody",
	data:function(){
		return{
			titleH:"全部",
			liCount:35,
			songListdata:[
				{describeA:"『影视奇幻』漫漫长路远，冷冷幽梦清",describeP:"谍影丛虫",url:"images/Dyh2/musicList (1).jpg"},
				{describeA:"极致深情 | 音律入耳 我仿佛又失恋了千百次",describeP:"KillBunny",url:"images/Dyh2/musicList (2).jpg"},
				{describeA:"『华语篇』此生一定要去演唱会哭一次",describeP:"名侦探-柯北",url:"images/Dyh2/musicList (3).jpg"},
				{describeA:"消暑|| 夏日海滩复古趴",describeP:"虫虫虫虫砸",url:"images/Dyh2/musicList (4).jpg"},
				{describeA:"【日系/清唱】脱离伴奏，享受人声的动听",describeP:"ROBOT-3000B",url:"images/Dyh2/musicList (5).jpg"},
				{describeA:"100位爵士萨克斯乐手精选单曲",describeP:"坚果-",url:"images/Dyh2/musicList (6).jpg"},
				{describeA:"『Tropical House』夏日海风般的 清新旋律",describeP:"炮女_",url:"images/Dyh2/musicList (7).jpg"},
				{describeA:"因为一首歌，记住一部视觉小说",describeP:"PurionPurion",url:"images/Dyh2/musicList (8).jpg"},
				{describeA:"那些在你酩酊大醉后嘶吼出来的心事",describeP:"-武姜儿-",url:"images/Dyh2/musicList (9).jpg"},
				{describeA:"说以情搓以理: 说唱中画龙点睛的搓碟部分",describeP:"年代佬",url:"images/Dyh2/musicList (10).jpg"},
				{describeA:"EDM精选-跃动电音与人声的听觉盛宴",describeP:"一只野生的呆头狸",url:"images/Dyh2/musicList (11).jpg"},
				{describeA:"我知道风里有诗，那正是民谣的歌。",describeP:"情思天鹅",url:"images/Dyh2/musicList (12).jpg"},
				{describeA:"有一种单身，叫只为等某个人。",describeP:"流年忧光影",url:"images/Dyh2/musicList (13).jpg"},
				{describeA:"[秘封幻想世界] 轻歌曼舞 舞燕歌莺",describeP:"Shanghai-Alice",url:"images/Dyh2/musicList (14).jpg"},
				{describeA:"『异域幻想』妖精乡 · 骑士的放浪冒险谭",describeP:"猫耳赫萝",url:"images/Dyh2/musicList (15).jpg"},
				{describeA:"百部动画原声｜百首治愈良药",describeP:"阿卡琳",url:"images/Dyh2/musicList (16).jpg"},
				{describeA:"想拥有你眼中的繁星点点",describeP:"釜山的厚比花开了",url:"images/Dyh2/musicList (17).jpg"},
				{describeA:"若拿歌比喻人的所有心情，这刚好合适",describeP:"眼袋以为是卧蚕",url:"images/Dyh2/musicList (18).jpg"},
				{describeA:"倒叙年华‖时光漫步之1997～2006",describeP:"谷歌之露",url:"images/Dyh2/musicList (19).jpg"},
				{describeA:"岁月如歌 ‖ 心如大海，从此美丽。",describeP:"情思天鹅",url:"images/Dyh2/musicList (20).jpg"},
				{describeA:"我爱二次元 第一季",describeP:"呀恬恬_Tiffany",url:"images/Dyh2/musicList (21).jpg"},
				{describeA:"说唱里的小情歌",describeP:"丁蛮",url:"images/Dyh2/musicList (22).jpg"},
				{describeA:"倒叙年华‖时光漫步之2007～2016",describeP:"谷歌之露",url:"images/Dyh2/musicList (23).jpg"},
				{describeA:"「合唱团歌集」独乐乐不如众乐乐",describeP:"蛙鱼先森",url:"images/Dyh2/musicList (24).jpg"},
				{describeA:"Post-rock 周期表",describeP:"陈北及",url:"images/Dyh2/musicList (25).jpg"},
				{describeA:"「电子•男声」入耳倾心，渐入佳境",describeP:"炮女_",url:"images/Dyh2/musicList (26).jpg"},
				{describeA:"「精选」百首好听电音 带你走进另一个世界",describeP:"Quanjfic",url:"images/Dyh2/musicList (27).jpg"},
				{describeA:"后现代主义音乐思潮下审美转向",describeP:"夕阳下的盛宴",url:"images/Dyh2/musicList (28).jpg"},
				{describeA:"17年7月新热电音推送",describeP:"大小姐不高兴",url:"images/Dyh2/musicList (29).jpg"},
				{describeA:"重温华语老歌，这些专辑今年20岁。",describeP:"徊梦",url:"images/Dyh2/musicList (30).jpg"},
				{describeA:"有哪些好听的歌会让你感同身受",describeP:"子瞻大魔王",url:"images/Dyh2/musicList (31).jpg"},
				{describeA:"「韩综」三时三餐海洋牧场篇BGM",describeP:"去爱吧像没有受过伤一样",url:"images/Dyh2/musicList (32).jpg"},
				{describeA:"唯美纯音｜一个小小的青春故事。",describeP:"羊驼idol",url:"images/Dyh2/musicList (33).jpg"},
				{describeA:"你需要一首BGM，来撑起你的内心戏！",describeP:"浩子Joe",url:"images/Dyh2/musicList (34).jpg"},
				{describeA:"【综艺】中餐厅背景音乐BGM合集",describeP:"Tomorrow唐某睿",url:"images/Dyh2/musicList (35).jpg"}
			]
		};
	}
});
Vue.component("mainbody",mainbody);