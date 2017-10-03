# 163Music
仿网易云音乐官网（小组项目）
这是一个算是小生入门参与的一个比较大的作品吧，主页面（包括登录注册页面）是由我们组长完成，小生负责的是子页面，即用户登录状态下的“我的音乐”和“我的电台”以及非登录状态下的“歌单”这三个页面，项目从始至终都是使用Vue框架。

小生负责的页面主要的功能是：

1.实现用户从“音乐商城”页面拿数据并添加到该页面，对拿到的数据能够进行删除操作；

2.用户的默认歌单和自定义歌单能够相互切换，且数据和歌单电台图片也会相应发生变化，一一对应；

怎么运行？

1.搭建环境，安装mongodb

2.连接mongodb数据库，输入存储过程代码（文件里有）

3.在cmd窗口运行node app.js

该作品涉及的技术：vue2.0+vue-resource+vuex+cookies+mongodb+node.js+组件化

首页
基本布局如下：
1. Logo 
2. 横向导航
3.banner图
4. 音乐top列表
5. 电台推荐
6. footer
7. 登录按钮，注册按钮

首页： 导航条激活，banner自动轮播等基本功能

首页导航：在未登录状态下，导航中可访问的有 ['首页','音乐商城','电台推荐']

首页导航：在登录状态下，导航中可访问的有['首页','音乐商城','电台推荐','我的音乐','我的电台']

首页的内容：从数据库获取

登录按钮：会跳转到登录界面

注册按钮：会跳转到注册界面

登录界面： 验证是否存在用户名，若存在验证成功，则在登录后跳转回首页，并且首页改为登录状态

注册界面： 验证要注册的用户名是否存在，注册成功后直接跳转回首页，并且改为已登录刚刚注册用户状态
（例如： 欢迎 ，XXX）

音乐商城界面 ： 每一首音乐有一个+符号，可以直接添加进入我的音乐，如果未登录则弹出请先登录提示框
电台推荐界面：每一个电台有一个+符号，可以直接添加进入我的音乐，如果未登录则弹出请先登录提示框

我的音乐界面：进入我的音乐界面会获取当前已登录用户的所有音乐列表信息并且显示，进行删除。
我的电台界面：进入我的电台界面会获取当前已登录用户的所有电台列表信息并且显示，进行删除。

关于我们界面：展示本项目小组的一些信息
