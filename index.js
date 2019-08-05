const loaderUtils = require("loader-utils")

module.exports = function (content) {
  const options = loaderUtils.getOptions(this);
  const resourcePath = this.resourcePath
  const fileName = resourcePath.split('/').pop()

  let isExclude = false

  isExclude = judgeIsExclude(resourcePath, options.exclude)

  if (!isExclude) {
    let isInclude = true

    isInclude = judgeIsInclude(resourcePath, options.include)

    if (isInclude) {
      if (typeof options.data === 'function') {
        const replaceCode = '/* warning css-code-insert */'
        let data = options.data({
          filePath: resourcePath
        })
    
        // 判断是否存在替换标识
        if (content.indexOf(replaceCode) > -1) {
          content = content.replace(replaceCode, data)
        } else {
          content = data + '\n' + content
        }
      } else if (typeof options.data === 'string') {
        content = options.data + '\n' + content
      }
    }
  }
  this.callback(null, content)
}

function judgeIsExclude (resourcePath, exclude) {
  if (exclude !== undefined) {
    if (Array.isArray(exclude)) {
      return exclude.some(it => {
        return resourcePath.indexOf(it) === 0
      })
    } else if (typeof exclude === 'string') {
      return resourcePath.indexOf(exclude) === 0
    } else {
      throw new error('exclude只能传Array,String')
    }
  } else {
    return false
  }
}

function judgeIsInclude (resourcePath, include) {
  if (include !== undefined) {
    if (Array.isArray(include)) {
      return include.some(it => {
        return resourcePath.indexOf(it) === 0
      })
    } else if (typeof include === 'string') {
      return resourcePath.indexOf(include) === 0
    } else {
      throw new error('include只能传Array,String')
    }
  } else {
    return true
  }
}