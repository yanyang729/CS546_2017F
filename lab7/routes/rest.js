/**
 * Created by yangyang on 10/21/17.
 */
const express = require('express')
const router = express.Router()

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const mongoService = require('../services/mongoService')

// GET	/recipes
router.get('/recipes', jsonParser, (req, res) => {
  mongoService.getRecipes().then(
    recipes => res.json(recipes),
    err => res.status(400).send('Found error when getting recipes \n' + err)
  )
})

// GET	/recipes/:id
router.get('/recipes/:id', jsonParser, (req, res) => {
  mongoService.getRecipe(req.params.id).then(
    recipe => res.json(recipe),
    err => res.status(400).send('Found error when getting recipe \n' + err)
  )
})

// POST	/recipes
router.post('/recipes', jsonParser, (req, res) => {
  mongoService.addRecipe(req.body).then(
    recipe => res.json(recipe),
    err => res.status(400).send('Found error when adding recipe \n' + err)
  )
})

// PUT	/recipes/:id
router.put('/recipes/:id', jsonParser, (req, res) => {
  mongoService.updateRecipe(req.body,req.params.id).then
  (
    recipe => res.json(recipe),
    err => res.status(400).send('Found error when updating recipe \n' + err)
  )
})

// DELETE	/recipes/:id
router.delete('/recipes/:id', jsonParser, (req, res) => {
  mongoService.delRecipe(req.params.id).then(
    fullFill => res.status(200).send('Successfully deleted recipe'),
    err => res.status(400).send('Found error when deleting recipe \n' + err)
  )
})

// GET	/comments/recipe/:recipeId
router.get('/comments/recipe/:recipeId', jsonParser, (req, res) => {
  mongoService.getCommentsByRecipeId(req.params.recipeId).then(
    comments => res.json(comments),
    err => res.status(400).send('Found error when getting comments \n' + err)
  )
})

// GET	/comments/:commentId
router.get('/comments/:commentId', jsonParser, (req, res) => {
  mongoService.getCommentByCommentId(req.params.commentId).then(
    comment => res.json(comment),
    err => res.status(400).send('Found error when getting comment \n' + err)
  )
})

// POST	/comments/:recipeId/
router.post('/comments/:recipeId', jsonParser, (req, res) => {
  mongoService.addComment(req.body,req.params.recipeId).then(
    comment => res.json(comment),
    err => res.status(400).send('Found error when adding comment \n' + err)
  )
})

// PUT	/comments/:recipeId/:commentId
router.put('/comments/:recipeId/:commentId', jsonParser, (req, res) => {
  mongoService.updateComment(req.body, req.params.recipeId, req.params.commentId).then(
    comment => res.json(comment),
    err => res.status(400).send('Found error when updating comment \n' + err)
  )
})

// DELETE	/comments/:id
router.delete('/comments/:id', (req,res) => {
  mongoService.delCommentByCommentId(req.params.id).then(
    fullFill => res.status(200).send('Successfully deleted comment'),
    err => res.status(400).send('Found error when deleting comment \n' + err)
  )
})

module.exports = router

