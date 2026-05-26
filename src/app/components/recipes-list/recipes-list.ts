import { Component, input, OnInit, signal } from '@angular/core';
import { Recipe } from '../../types/recipes.types';
import { RecipeItem } from '../recipe-item/recipe-item';
import { CommonModule } from '@angular/common';
import { Recipes } from '../../services/recipes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  imports: [RecipeItem, CommonModule],
  templateUrl: './recipes-list.html',
  styleUrl: './recipes-list.scss',
})
export class RecipesList implements OnInit {
  recipes: Recipe[] = [];
  error: Error | undefined;
  loading = signal(false);

  constructor(
    private recipesService: Recipes,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.recipesService.getRecipes$().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        this.loading.set(true);
        console.log(this.recipes);
      },
      error: (error) => {
        this.error = error;
      },
    });
  }

  goToDetailsPage(id: number) {
    this.router.navigate(['recipes', id]);
  }
}
