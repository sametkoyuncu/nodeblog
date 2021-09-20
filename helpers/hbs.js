const moment = require('moment')
moment.locale('tr')
module.exports = {
    generateDate: (date, format) => {
        return moment(date).format(format)
    },
    limit: (arr, limit) => {
        if (!Array.isArray(arr)) { return [] }
        return arr.slice(0, limit)
    },
    truncate: (str, length) => {
        if (str.length > length) {
            str = str.substring(0, length) + '...'
        }
        return str
    }
}