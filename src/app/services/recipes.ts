import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../types/recipes.types';

@Injectable({
  providedIn: 'root',
})
export class Recipes {
  constructor(private httpClient: HttpClient) {}

  getRecipes$(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>('https://super-recipes.com/api/recipes');
  }

  searchRecipes$(searchTerm: string, searchIngredient: string): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(
      `https://super-recipes.com/api/recipes?name=${searchTerm}&ingredient=${searchIngredient}`,
    );
  }
}
