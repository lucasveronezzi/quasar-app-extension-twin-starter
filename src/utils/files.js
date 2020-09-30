const fs = require('fs')

const path = require('path')

const { log } = require('./logger')

const helper = {
  fromDir (startPath, filter = null) {
    if (!fs.existsSync(startPath)) {
      log('no dir ', startPath)
      return []
    }

    var acc = []

    var files = fs.readdirSync(startPath)
    for (var i = 0; i < files.length; i++) {
      var filename = path.join(startPath, files[i])
      var stat = fs.lstatSync(filename)

      if (stat.isDirectory()) {
        acc.push(...(this.fromDir(filename, filter))) // recurse
      } else if (!filter || filter.test(filename)) acc.push(filename)
    };

    return acc
  },

  appendTemplateToFile (api, file) {
    const targetFile = api.resolve.app(path.join('src/', file))

    var sourceData = fs.readFileSync(path.join(__dirname, '../templates/', file), 'utf8')

    var targetData = fs.readFileSync(targetFile, 'utf8')

    if (!targetData.includes(sourceData.trim())) {
      fs.appendFileSync(targetFile, '\r\n')

      fs.appendFileSync(targetFile, sourceData)
    }
  },

  renderIfNotExist (api, file, regex = null) {
    const filePath = path.dirname(file)

    file = path.basename(file)

    const targetPath = path.join('src', filePath)

    const targetFile = path.join(targetPath, file)

    const sourceFile = path.join('../templates', filePath, file)

    if (regex) {
      const files = this.fromDir(api.resolve.app(path.join('src', filePath)), regex)

      if (files.length > 0) {
        return path.basename(files[0])
      }
    } else {
      if (fs.existsSync(targetFile)) {
        return file
      }
    }

    api.renderFile(sourceFile, targetFile, {
      prompts: api.prompts
    })

    return null
  }

}

module.exports = helper
