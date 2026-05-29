import { Component, input, OnDestroy, OnInit, signal } from '@angular/core';
import { ImageUrl, Recipe } from '../../types/recipes.types';
import { RecipeItem } from '../recipe-item/recipe-item';
import { CommonModule } from '@angular/common';
import { Recipes } from '../../services/recipes';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  imports: [RecipeItem, CommonModule],
  templateUrl: './recipes-list.html',
  styleUrl: './recipes-list.scss',
})
export class RecipesList implements OnInit, OnDestroy {
  private recipesSubscription: Subscription | undefined;

  images: ImageUrl[] = [];
  recipes: Recipe[] = [];
  error: Error | undefined;
  loading = signal(true);

  constructor(
    private recipesService: Recipes,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.recipesService.recipes.subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        this.loading.set(false);
      },
      error: (error) => {
        this.error = error;
        this.loading.set(false);
      },
    });

    this.recipesSubscription = this.recipesService.getRecipesWithConcurrentImage$().subscribe({
      next: (images) => {
        if (Array.isArray(images)) {
          this.images = images;
        } else {
          this.images.push(images);
        }
      },
      error: (error) => {
        this.error = error;
      },
    });
  }

  goToDetailsPage(id: number) {
    this.router.navigate(['recipes', id]);
  }

  findRecipeImage(recipeId: number): string {
    const image = this.images.find((image) => image.id === recipeId);

    return image ? image.url : '';
  }

  ngOnDestroy(): void {
    this.recipesSubscription?.unsubscribe();
  }
}
