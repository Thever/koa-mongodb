# 说明
整个demo链接的数据库是本地的mongoDB，使用mongose来操作,为了调试调试方便使用了nodemon,如果本地没有安装，请安装后使用。

# 一些插件的用法
koa koa-router
koa框架，起后台访问服务，处理接口逻辑，页面中app.js为入口

mongoose
用来连接操作 mogonDB 数据库

koa-bodyparser
用来获取前端接口传值

koa-passport
用来验证前端token

passport-jwt
用来处理前端token

bcryptjs
加密库，配合私钥来使用

gravatar
用来生成用户头像

jsonwebtoken
用来生成token

/congfig/xxx
全局使用的配置文件

/models/xxx
mongose 的 model 文件，用来声明结构类型，使用数据库

/router/api/xxx
koa应对前端接口的配置文件，用来处理请求接口
/router/api/abc.js  默认的前缀路径为 api/abc

/validation/xxx
匹配过滤接口数据，不合规就回返回错误。