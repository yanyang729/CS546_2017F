/**
 * Created by yangyang on 10/13/17.
 */
const router = require('express').Router()

async function getData () {
  const data = {
    'name': 'Yang',
    'biography': 'Nice to meet you guys. Hope you will like me.',
    'favoriteShows': ['Game of Throne', 'West World', 'Broken sisters'],
    'hobbies': ['Shut in', 'Gym', 'Swim']
  }
  return data
}

router.get('*', async (req, res) => {
  const data = await getData()
  res.render('contents/about', {data: data})
})

module.exports = router