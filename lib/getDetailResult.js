const get = require('./../util/get')
const path = require('path')

/**
 * 根据 keyword 以及选用的 cdn 获取详细的 cdn 列表
 * @param {String} cdnName 
 * @param {String} keyword 
 */
function getDetailResult(cdnName, keyword) {
  return new Promise(async resolve => {
    let result = []
    let url, cdnPrefix, iconPath

    if (cdnName === 'bootcdn') {
      url = `https://api.bootcdn.cn/libraries/${keyword}.min.json`
      cdnPrefix = 'cdn.bootcss.com'
      iconPath = path.join(__dirname, './../bootcdn.png')
    } else if (cdnName === 'cdnjs') {
      url = `https://api.cdnjs.com/libraries/${keyword}`
      cdnPrefix = `cdnjs.cloudflare.com/ajax/libs`
      iconPath = path.join(__dirname, './../cdnjs.png')
    }

    let jsonContent = await get(url)
    const { version, files } = jsonContent.assets[0]
    const urlPrefix = `${cdnPrefix}/${keyword}/${version}/`

    for (let file of files) {
      const name = `${urlPrefix}${file}`

      result.push({
        title: name, 
        icon: {
          path: iconPath
        },
        arg: name // 按回车后，alfred 会把这个变量传递给下个步骤
      })
    }

    resolve(result)
  })
}

module.exports = getDetailResult