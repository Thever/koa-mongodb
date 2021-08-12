//  导入validator
const Validator = require('validator');
//  导入自己写的判断为空的方法
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data){
    let errors = {}

    //  判断内容
    data.name = !isEmpty(data.name)? data.name:''
    data.email = !isEmpty(data.email)? data.email:''
    data.password = !isEmpty(data.password)? data.password:''
    data.password2 = !isEmpty(data.password2)? data.password2:''

    //  验证名字长度
    // if(!Validator.isLength(data.name, {min:2,max:30})){
        //  不通过过滤
    if(data.name.length < 2 || data.name.length > 30){
        errors.name = '名字的长度不能小于2位且不能超过30位'
    }

    //  验证名字不能为空
    // if(Validator.isEmpty(data.name)){
    if(data.name.toString().replace(/\s/g,"").length === 0){
        errors.name = '名字不能为空'
    }

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

    //  验证重复密码不能为空
    // if(Validator.isEmpty(data.password2)){
    if(data.password2.toString().replace(/\s/g,"").length === 0){
        errors.password2 = '重复密码不能为空'
    }

    //  验证重复密码长度
    // if(!Validator.isLength(data.password, {min:6,max:30})){
    if(data.password2.length < 6 || data.password2.length > 30){
        //  不通过过滤
        errors.password2 = '重复密码的长度不能小于6位且不能超过30位'
    }
    
    //  两次密码一致
    if(data.password !== data.password2){
        errors.password3 = '两次输入的密码不一致'
    }
    return {
        errors,
        isValid:isEmpty(errors)
    }
}