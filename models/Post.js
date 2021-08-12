const mongoose = require('mongoose')
const Schema = mongoose.Schema

//  实例化数据模板
const PostSchema = new Schema({
    user:{
        type:String,
        //  关联数据表
        ref:"users",
        required:true
    },
    text:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    likes:[
        {
            user:{
                //  其实就是获取 user 的 id
                type:Schema.Types.ObjectId,
                //  关联 users 表
                ref:'users'
            }
        }
    ],
    comments:[
        {
            user:{
                //  其实就是获取 user 的 id
                type:Schema.Types.ObjectId,
                //  关联 users 表
                ref:'users'
            },
            text:{
                type:String,
                required:true
            },
            name:{
                type:String,
                required:true
            },
            avatar:{
                type:String
            },
            date:{
                type:Date,
                default:Date.now
            }
        },
    ],
    date:{
        type:Date,
        default:Date.now
    }
})

const Post = mongoose.model('users', PostSchema)
module.exports = Post 