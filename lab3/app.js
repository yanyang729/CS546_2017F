/**
 * Created by yangyang on 9/20/17.
 */

const fileData = require('./fileData.js')
const textMetrics = require('./textMetrics.js')
const fs = require('fs')

async function main (file) {
  const fileName = file.split('.')[0]
  const resultFileName = `${fileName}.result.json`
  const filesCurtFolder = fs.readdirSync(process.env.PWD)
  if (filesCurtFolder.includes(resultFileName)) {
     console.log(await fileData.getFileAsJSON(resultFileName))
  } else {
    const text = await fileData.getFileAsString(file)
    await fileData.saveStringToFile(
      file.split('.')[0] + '.debug.txt',
      textMetrics.simplify(text)
    )

    await fileData.saveJSONToFile(
      file.split('.')[0] + '.result.json',
      textMetrics.createMetrics(text)
    )

    console.log(await fileData.getFileAsJSON(`${file.split('.')[0]}.result.json`))
  }
}

main('chapter3.txt')