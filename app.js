// koa
const koa = require('koa')
// koa路由
const Router = require('koa-router')
// mongoose连接数据库
const mongoose = require('mongoose')
// koa-bodyparser 获取前端接口传值
const bodyParser = require('koa-bodyparser')
// koa-passport 验证token
const passport = require('koa-passport')

// 实例化koa
const app = new koa()
const router = new Router()

// 使用中间件 koa-bodyparser
app.use(bodyParser())

// 引入users.js
const users = require('./routes/api/users')
// 引入profile.js
const profile = require('./routes/api/profile')

// 路由
router.get("/", async ctx => {
    ctx.body = {msg : 'Hello Koa Interfaces'}
})

// config
const db = require('./config/keys').mongoURI

// 链接数据库
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then( () => {
    console.log('Mongodb Connected...')
}).catch(err => {
    console.log(err)
})

//  koa-passport初始化
app.use(passport.initialize())
app.use(passport.session())

//  回调到config文件中 passport.js
require('./config/passport')(passport)

//  配置路由地址指定使用users.js
router.use('/api/users', users)
//  配置路由地址指定使用profile.js
router.use('/api/profile', profile)

//  配置路由
app.use(router.routes()).use(router.allowedMethods)

//  设置端口号
const port = process.env.PORT || 5000

//  监听
app.listen(port, () => {
    console.log(`server started on ${port}`)
})