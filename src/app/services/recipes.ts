import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Recipe, RecipeDetails } from '../types/recipes.types';

@Injectable({
  providedIn: 'root',
})
export class Recipes {
  private readonly url = 'https://super-recipes.com/api/recipes';

  constructor(private httpClient: HttpClient) {}

  getRecipes$(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>('https://super-recipes.com/api/recipes');
  }

  searchRecipes$(searchTerm: string, searchIngredient: string): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(
      `${this.url}?name=${searchTerm}&ingredient=${searchIngredient}`,
    );
  }

  getRecipeById$(id: number): Observable<Recipe> {
    return this.httpClient.get<Recipe>(`${this.url}?id=${id}`);
  }

  getRecipeDetails$(id: number): Observable<{ recipe: Recipe; details: RecipeDetails }> {
    return this.getRecipeById$(id).pipe(
      switchMap((recipe: Recipe) => {
        return this.httpClient.get<RecipeDetails>(`${this.url}/details?id=${id}`).pipe(
          map((details) => ({
            recipe,
            details,
          })),
        );
      }),
    );
  }
}
