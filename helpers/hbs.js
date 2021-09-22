const moment = require('moment')
moment.locale('tr')
module.exports = {
  generateDate: (date, format) => {
    return moment(date).format(format)
  },
  limit: (arr, limit) => {
    if (!Array.isArray(arr)) {
      return []
    }
    return arr.slice(0, limit)
  },
  truncate: (str, length) => {
    if (str.length > length) {
      str = str.substring(0, length) + '...'
    }
    return str
  },
  paginate: (options) => {
    let outputHTML = ''

    if (options.hash.current === 1) {
      outputHTML += `<li class="page-item disabled"><a class="page-link" href="#">İlk Sayfa</a></li>`
    } else {
      outputHTML += `<li class="page-item"><a class="page-link" href="?page=1">İlk Sayfa</a></li>`
    }

    let i =
      Number(options.hash.current) > 5 ? Number(options.hash.current) - 3 : 1

    if (i !== 1) {
      outputHTML += `<li class="page-item"><a class="page-link">...</a></li>`
    }

    for (
      ;
      i <= Number(options.hash.current) + 3 && i <= options.hash.pages;
      i++
    ) {
      if (i === options.hash.current) {
        outputHTML += `<li class="page-item active"><a class="page-link" href="">${i}</a></li>`
      } else {
        outputHTML += `<li class="page-item"><a class="page-link" href="?page=${i}">${i}</a></li>`
      }

      if (i == Number(options.hash.current) + 3 && i < options.hash.pages) {
        outputHTML += `<li class="page-item disabled"><a class="page-link">...</a></li>`
      }
    }

    if (options.hash.current == options.hash.pages) {
      outputHTML += `<li class="page-item disabled"><a class="page-link">Son Sayfa</a></li>`
    } else {
      outputHTML += `<li class="page-item"><a class="page-link" href="?page=${options.hash.pages}">Son Sayfa</a></li>`
    }

    return outputHTML
  },
}
