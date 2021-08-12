//  passport-jwt用来验证token
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
//  引入全局资源
const keys = require('../config/keys')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//  指向全局 secretOrKey
opts.secretOrKey = keys.secretOrKey
//  使用指定数据库资源
const mongoose = require('mongoose')
const User = mongoose.model('users')


module.exports = passport => {
    // console.log(passport)
    passport.use(
        new JwtStrategy(opts, async function(jwt_payload, done) {
            // console.log(jwt_payload)
            //  通过id查询用户
            const user = await User.findById(jwt_payload.id)
            //  逻辑处理
            if(user){
                //  根据调用路径返回用户信息
                return done(null, user)
            }else{
                //  根据调用路径返回false
                return done(null, false)
            }
        })
    );
} 