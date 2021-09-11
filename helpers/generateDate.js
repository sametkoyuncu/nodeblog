const moment = require('moment')
moment.locale('tr')
module.exports = {
    generateDate: (date, format) => {
        return moment(date).format(format)
    }
}