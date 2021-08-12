//  引入路由
const Router = require('koa-router')
const router = new Router()
//  引入加密库bcryptjs
var bcrypt = require('bcryptjs');
//  引入gravatar来自动生成头像
var gravatar = require('gravatar');
//  引入自己创建的同步加密密码方法
const tools = require('../../config/tools')
//  引入jsonwebtoken来生成token
const jwt = require('jsonwebtoken')
//  引入全局配置
const keys = require('../../config/keys')
//  引入koa-passport来调用方法
const passport = require('koa-passport')

//  引入User
const User = require('../../models/User')
//  引入input验证
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

/*
 * @route GET api/users/test
 * @desc 测试接口地址
 * @access 接口是公开的
*/
router.get('/test', async ctx => {
    ctx.status = 200
    ctx.body = { msg: 'users works'}
})

/*
 * @route POST api/users/register
 * @desc 注册接口地址
 * @access 接口是公开的
*/
router.post('/register', async ctx => {
    // console.log(ctx.request.body)

    // 验证前端数据
    const {errors, isValid} =  validateRegisterInput(ctx.request.body)
    
    // 判断是否验证通过
    if(!isValid){
        //  有错误返回报错
        ctx.status = 400
        ctx.body = errors
        return
    }

    // 将数据存储到数据库
    const findResult = await User.find({email:ctx.request.body.email})
    // console.log(findResult)
    if(findResult.length > 0){
        //  查到了，说明已经注册过了
        ctx.status = 500
        ctx.body = {email:'邮箱已被占用'}
    }else{
        //  没查到，进行用户创建
        //  生成用户头像    mm表示默认头像
        const avatar = gravatar.url(ctx.request.body.emali, {s: '200', r: 'pg', d: 'mm'});
        const newUser =  new User({
            name:ctx.request.body.name,
            email:ctx.request.body.email,
            avatar,
            // password:ctx.request.body.password
            // 使用同步加密方法加密秒
            password:tools.enbcrypt(ctx.request.body.password)
        })

        //  bcrypt hash加密
        // await bcrypt.genSalt(10, (err, salt) => {
        //     bcrypt.hash(newUser.password, salt, (err, hash) => {
        //         // Store hash in your password DB.
        //         // console.log(hash)
        //         if(err){
        //             throw err
        //         }
        //         newUser.password = hash
        //     });
        // });

        // console.log(newUser)
        // 存储到数据库
        await newUser.save().then(user => {
            ctx.body =  user
        }).catch(err => {
            console.log(err)
        })

        //  返回json数据
        ctx.body = newUser
    }
})

/*
 * @route POST api/users/login
 * @desc 登录接口地址 返回一个token
 * @access 接口是公开的
*/
router.post('/login',async ctx => {
    // 验证前端数据
    const {errors, isValid} =  validateLoginInput(ctx.request.body)

    // 判断是否验证通过
    if(!isValid){
        //  有错误返回报错
        ctx.status = 400
        ctx.body = errors
        return
    }

    //  查询
    const findResult = await User.find({email:ctx.request.body.email})
    const user = findResult[0]
    const password = ctx.request.body.password

    //  判断查没查到
    if(findResult.length == 0){
        //  没有查到
        ctx.status = 404
        ctx.body = {email:'用户不存在'}
    }else{
        //  查到了
        //  验证密码
        const result = await bcrypt.compareSync(password, user.password)
        
        //  验证通过
        if(result){
            //  返回token
            const payload ={
                id:user.id,
                name:user.name,
                avator:user.avator
            } 
            // jwt.sign(加密数据, 加密秘钥, {expiresIn:过期时间(秒)})
            const token = jwt.sign(payload, keys.secretOrKey, {expiresIn:3600})

            ctx.status = 200
            ctx.body = {
                success:true,
                //  注意这个token 带Bearer是固定的
                token:"Bearer " + token
            }
        }else{
            ctx.status = 400
            ctx.body = {
                password:'密码错误！'
            }
        }
    }
})

/*
 * @route GET api/users/current
 * @desc  用户信息接口地址 返回域用户信息
 * @access 接口是私密的
*/
//  路径，配置参数(启用passport.js的监听)，处理方法
router.get('/current',passport.authenticate('jwt', {session:false}), async ctx => {
    //  使用传递过来的信息
    ctx.body = {
        id:ctx.state.user.id,
        name:ctx.state.user.name,
        email:ctx.state.user.email,
        avatar:ctx.state.user.avatar
    }
})

module.exports = router.routes()