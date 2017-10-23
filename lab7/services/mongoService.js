/**
 * Created by yangyang on 10/21/17.
 */
const RecipetModel = require('../models/recipeModel')

module.exports = {
  getRecipes: async () => {
    try {
      const recipes = await RecipetModel.find({})
      if (recipes.length <= 0) throw 'No recipes in database'
      let recipe_return = []
      for (let obj of recipes) {
        recipe_return.push({_id: obj._id, title: obj.title})
      }
      return recipe_return

    } catch (e) {
      throw e
    }
  },

  getRecipe: async (id) => {
    try {
      const recipe = await RecipetModel.findById({_id: id})
      if (Object.keys(recipe).length <= 0) throw  'No recipe returned'
      return recipe
    } catch (e) {
      throw e
    }
  },

  addRecipe: async (jsonBody) => {
    try {
      const newRecipe = new RecipetModel(jsonBody)
      await newRecipe.save()
      return await RecipetModel.findById({_id: jsonBody._id})
    } catch (e) {
      throw e
    }
  },

  delRecipe: async (id) => {
    try {
      await RecipetModel.remove({_id: id})
      return true
    } catch (e) {
      throw e
    }
  },

  updateRecipe: async (jsonBody, id) => {
    try {
      const data = {}
      if (jsonBody.title) data.title = jsonBody.title
      if (jsonBody.steps) data.steps = jsonBody.steps
      if (jsonBody.comments) data.comments = jsonBody.comments
      if (jsonBody.ingredients) data.ingredients = jsonBody.ingredients

      await RecipetModel.update({_id: id}, data)

      return await RecipetModel.findById({_id: id})
    } catch (e) {
      throw e
    }
  },

  getCommentsByRecipeId: async (recipeId) => {
    try {
      const recipe = await RecipetModel.findById({_id: recipeId})
      const comments = recipe.comments
      const returnedComments = []
      for (let c of comments) {
        returnedComments.push({
          _id: c._id,
          recipeId: recipeId,
          recipeTitle: recipe.title,
          poster: c.poster,
          comment: c.comment
        })
      }
      return returnedComments

    } catch (e) {
      throw  e
    }
  },

  addComment: async (jsonBody, recipeId) => {
    try {
      const recipe = await RecipetModel.findById({_id: recipeId})
      recipe.comments.push(jsonBody)
      await RecipetModel.update({_id: recipeId}, recipe)
      return jsonBody

    } catch (e) {
      throw e
    }
  },

  getCommentByCommentId: async (commentId) => {
    try {
      const recipe = await RecipetModel.findOne({'comments._id': commentId})
      console.log(recipe.comments)
      let comment = null
      for (let c of recipe.comments) {
        if (c._id === commentId) {
          comment = c
          break
        }
      }
      return {
        _id: comment._id,
        recipeId: recipe._id,
        recipeTitle: recipe.title,
        poster: comment.poster,
        comment: comment.comment
      }
    } catch (e) {
      throw e
    }
  },

  updateComment: async (jsonBody, recipeId, commentId) => {
    try {
      const recipe = await RecipetModel.findOne({_id: recipeId, 'comments._id': commentId})
      let updatedComments = []
      let updatedComment = undefined
      for (let c of recipe.comments) {
        if (c._id === commentId) {
          if (jsonBody.poster) c.poster = jsonBody.poster
          if (jsonBody.comment) c.comment = jsonBody.comment
          updatedComment = c
        }
        updatedComments.push(c)
      }
      recipe.comments = updatedComments
      await RecipetModel.update({_id: recipeId, 'comments._id': commentId}, recipe)
      return updatedComment

    } catch (e) {
      throw e
    }
  },

  delCommentByCommentId: async (commentId) => {
    try {
      const recipe = await RecipetModel.findOne({'comments._id': commentId})
      recipe.comments = recipe.comments.filter(c => c._id !== commentId)
      await RecipetModel.update({'comments._id': commentId}, recipe)
      return true
    } catch (e) {
      throw e
    }
  }

}