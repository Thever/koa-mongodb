//  导入validator
const Validator = require('validator');
//  导入自己写的判断为空的方法
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data){
    let errors = {}

    //  判断内容
    data.handle = !isEmpty(data.handle)? data.handle:''
    data.status = !isEmpty(data.status)? data.status:''
    data.skills = !isEmpty(data.skills)? data.skills:''

    //  验证handle长度
    if(data.handle.length < 2 || data.handle.length > 40){
        //  不通过过滤
        errors.handle = 'handle的长度不能小于2位且不能超过30位'
    }

    //  验证handle不能为空
    if(data.handle.toString().replace(/\s/g,"").length === 0){
        errors.handle = 'handle不能为空'
    }

    //  验证status不能为空
    if(data.status.toString().replace(/\s/g,"").length === 0){
        errors.status = 'status不能为空'
    }

    //  验证skills不能为空
    if(data.skills.toString().replace(/\s/g,"").length === 0){
        errors.skills = 'skills不能为空'
    }

    //  验证website
    if(data.website.toString().replace(/\s/g,"").length !== 0){
        let checkUrl = new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i')
        if(!checkUrl.test(data.website)){
            errors.website = 'website URL不合法'
        }
    }

    //  验证tengxunkt
    if(data.tengxunkt.toString().replace(/\s/g,"").length !== 0){
        let checkUrl = new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i')
        if(!checkUrl.test(data.tengxunkt)){
            errors.tengxunkt = 'tengxunkt URL不合法'
        }
    }

    //  验证wangyikt
    if(data.wangyikt.toString().replace(/\s/g,"").length !== 0){
        let checkUrl = new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i')
        if(!checkUrl.test(data.wangyikt)){
            errors.wangyikt = 'wangyikt URL不合法'
        }
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}