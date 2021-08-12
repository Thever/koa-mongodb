//  导入validator
const Validator = require('validator');
//  导入自己写的判断为空的方法
const isEmpty = require('./is-empty')

module.exports = function validateExperienceInput(data){
    let errors = {}

    //  判断内容
    data.title = !isEmpty(data.title)? data.title:''
    data.company = !isEmpty(data.company)? data.company:''
    data.from = !isEmpty(data.from)? data.from:''

    //  验证title不能为空
    if(data.title.toString().replace(/\s/g,"").length === 0){
        errors.title = 'title不能为空'
    }

    //  验证company不能为空
    if(data.company.toString().replace(/\s/g,"").length === 0){
        errors.company = 'company不能为空'
    }

    //  验证from不能为空
    if(data.from.toString().replace(/\s/g,"").length === 0){
        errors.from = 'from不能为空'
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}