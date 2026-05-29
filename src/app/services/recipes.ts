import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { ImageUrl, Recipe, RecipeDetails } from '../types/recipes.types';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class Recipes {
  private readonly url = 'https://super-recipes.com/api/recipes';

  recipes = new BehaviorSubject<Recipe[]>([]);

  private messageService = inject(MessageService);

  constructor(private httpClient: HttpClient) {}

  getRecipes$(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>('https://super-recipes.com/api/recipes').pipe(
      catchError((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Recipes could not be fetched.',
        });
        // return EMPTY;
        return throwError(() => new Error('Recipes cloud not be fetched.'));
      }),
    );
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

  getRecipesWithImageInParallel$(): Observable<ImageUrl[]> {
    return this.getRecipes$().pipe(
      tap((recipes: Recipe[]) => this.recipes.next(recipes)),
      switchMap((recipes: Recipe[]) => {
        const imageRequests = recipes.map((recipe) =>
          this.httpClient.get<ImageUrl>(`${this.url}/images?id=${recipe.id}`),
        );
        return forkJoin(imageRequests);
      }),
    );
  }

  getRecipesWithConcurrentImage$(): Observable<ImageUrl> {
    return this.getRecipes$().pipe(
      tap((recipes: Recipe[]) => this.recipes.next(recipes)),
      switchMap((recipes: Recipe[]) => {
        const imageIds = recipes.map((recipe) => recipe.id);

        return from(imageIds).pipe(
          mergeMap((id) => this.httpClient.get<ImageUrl>(`${this.url}/images?id=${id}`), 3),
        );
      }),
    );
  }
}
