/**
 * Created by yangyang on 10/13/17.
 */
const router = require('express').Router()

async function getData () {
  const data = [
    {
      'schoolName': 'Stevens',
      'degree': 'Master',
      'favoriteClass': 'cs546ws',
      'favoriteMemory': 'built google'
    },
    {
      'schoolName': 'SCUT',
      'degree': 'Bachelor',
      'favoriteClass': 'web programming',
      'favoriteMemory': 'built facebook'
    }
  ]
  return data
}

router.get('*', async (req, res) => {
  const data = await getData()
  res.render('contents/edu', {data: data})
})

module.exports = router