//  导入validator
const Validator = require('validator');
//  导入自己写的判断为空的方法
const isEmpty = require('./is-empty')

module.exports = function validateEducationInput(data){
    let errors = {}
    //  判断内容
    data.school = !isEmpty(data.school)? data.school:''
    data.degree = !isEmpty(data.degree)? data.degree:''
    data.from = !isEmpty(data.from)? data.from:''
    data.fieldofstudy = !isEmpty(data.fieldofstudy)? data.fieldofstudy:''

    //  验证school不能为空
    if(data.school.toString().replace(/\s/g,"").length === 0){
        errors.school = 'school不能为空'
    }

    //  验证degree不能为空
    if(data.degree.toString().replace(/\s/g,"").length === 0){
        errors.degree = 'degree不能为空'
    }

    //  验证from不能为空
    if(data.from.toString().replace(/\s/g,"").length === 0){
        errors.from = 'from不能为空'
    }

    //  验证fieldofstudy不能为空
    if(data.fieldofstudy.toString().replace(/\s/g,"").length === 0){
        errors.fieldofstudy = 'from不能为空'
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}