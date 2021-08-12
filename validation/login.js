//  导入validator
const Validator = require('validator');
//  导入自己写的判断为空的方法
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data){
    let errors = {}

    //  判断内容
    data.email = !isEmpty(data.email)? data.email:''
    data.password = !isEmpty(data.password)? data.password:''

    //  验证邮箱不能为空
    // if(Validator.isEmpty(data.email)){
    if(data.email.toString().replace(/\s/g,"").length === 0){
        errors.email = '邮箱不能为空'
    }

    //  验证邮箱是否合法
    // if(Validator.isEmail(data.email)){
    const testEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if(!testEmail.test(data.email)){
        errors.email = '邮箱不合法'
    }

    //  验证密码不能为空
    // if(Validator.isEmpty(data.password)){
    if(data.password.toString().replace(/\s/g,"").length === 0){
        errors.password = '密码不能为空'
    }

    //  验证密码长度
    // if(!Validator.isLength(data.password, {min:6,max:30})){
    if(data.password.length < 6 || data.password.length > 30){
        //  不通过过滤
        errors.password = '密码的长度不能小于6位且不能超过30位'
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}