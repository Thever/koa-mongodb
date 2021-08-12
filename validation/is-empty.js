//  判断是否为空
const isEmpty = value => {
    return value == undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0)
}

//  输出
module.exports = isEmpty