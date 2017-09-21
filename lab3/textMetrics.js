/**
 * Created by yangyang on 9/20/17.
 */
function simplify (text) {
  text = text.toLowerCase()
  text = text.replace(/[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '')
  text = text.replace(/[\n\t]/g, '')
  text = text.replace(/\s{2,}/g, ' ')
  return text
}

function createMetrics (text) {
  text = simplify(text)
  let metric = {}
  metric.totalLetters = text.length
  metric.totalWords = text.split(' ').length
  let vocabs = new Set()
  for (let v of text.split(' ')) {
    vocabs.add(v)
  }
  metric.uniqueWords = vocabs.size
  let count = 0
  for (let v of text.split(' ')) {
    if (v.length >= 6) {
      count++
    }
  }
  metric.longWords = count
  if (metric.totalWords) throw "Denominator cannot be zero."
  metric.averageWordLength = text.replace(/ /g, '').length / metric.totalWords
  let occur = {}
  for (let v of text.split(' ')) {
    if (occur[v]) {
      occur[v] += 1
    } else {
      occur[v] = 1
    }
  }
  metric.wordOccurrences = occur
  return metric
}

module.exports = {
  createMetrics,
  simplify
}

// console.log(createMetrics("Hello, my -! This is a great day to say hello.\n\n\tHello! 2 3 4 23"))