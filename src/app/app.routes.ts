import { Routes } from '@angular/router';
import { RecipesList } from './components/recipes-list/recipes-list';
import { RecipeDetails } from './components/recipe-details/recipe-details';

export const routes: Routes = [
  { path: '', component: RecipesList },
  { path: 'recipes/:id', component: RecipeDetails },
];
