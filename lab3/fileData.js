/**
 * Created by yangyang on 9/20/17.
 */
const bluebird = require('bluebird')
const Promise = bluebird.Promise

const fs = bluebird.promisifyAll(require('fs'))

async function getFileAsString (path) {
  if (!path) throw 'No path provided'
  try {
    const stringData = await fs.readFileAsync(path, 'utf-8')
    return stringData
  } catch (e) {
    throw e
  }
}

async function getFileAsJSON (path) {
  if (!path) throw 'No path provided'
  try {
    const stringFiles = await fs.readFileAsync(path, 'utf-8')
    const jsonData = JSON.parse(stringFiles)
    return jsonData
  } catch (e) {
    throw e
  }
}

async function saveStringToFile (path, text) {
  if ((!path) || (!text)) throw 'No path or text supplied'
  try {
    await fs.writeFileAsync(path, text)
    return true
  } catch (e) {
    throw e
  }
}

async function saveJSONToFile (path, obj) {
  if ((!path) || (!obj)) throw 'No path or text supplied'
  try {
    await fs.writeFileAsync(path, JSON.stringify(obj))
    return true
  } catch (e) {
    throw e
  }
}

module.exports = {
  getFileAsString,
  getFileAsJSON,
  saveStringToFile,
  saveJSONToFile
}