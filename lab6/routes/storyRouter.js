/**
 * Created by yangyang on 10/13/17.
 */
const router = require('express').Router()

async function getData () {
  const data = {
    'storyTitle': 'The day I god like in DOTA',
    'story': 'That was a sunny night, I lighted a cigar and opened  my newly bought macbook pro 2012.'
  }
  return data
}

router.get('*', async (req, res) => {
  const data = await getData()
  res.render('contents/story', {data: data})
})

module.exports = router