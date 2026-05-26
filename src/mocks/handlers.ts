import { http, HttpResponse } from 'msw';
import { recipes, details } from './mock.json';

export const handlers = [
  http.get('https://super-recipes.com/api/recipes', async ({ request }) => {
    const url = new URL(request.url);
    const recipeName = url.searchParams.get('name');
    const recipeIngredient = url.searchParams.get('ingredient');
    const recipeId = url.searchParams.get('id') || '';
    let filteredRecipes = recipes;

    if (!recipeId) {
      if (recipeName) {
        filteredRecipes = filteredRecipes.filter((recipe) =>
          recipe.name.toLowerCase().includes(recipeName.toLowerCase()),
        );
      }

      if (recipeIngredient) {
        filteredRecipes = filteredRecipes.filter((recipe) =>
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().startsWith(recipeIngredient.toLowerCase()),
          ),
        );
      }

      return HttpResponse.json(filteredRecipes);
    }

    const recipe = recipes.find((recipe) => recipe.id === +recipeId);

    if (!recipe) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(recipe);
  }),
  http.get('https://super-recipes.com/api/recipes/details', async ({ request }) => {
    const url = new URL(request.url);

    const recipeId = url.searchParams.get('id') || '';
    const recipe = details.find((recipe) => recipe.id === +recipeId);

    if (!recipeId || !recipe) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(recipe);
  }),
];
