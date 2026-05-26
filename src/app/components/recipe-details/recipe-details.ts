import { Component, OnInit, signal } from '@angular/core';
import { Recipe, RecipeDetails as RecipeDetailsType } from '../../types/recipes.types';
import { ActivatedRoute } from '@angular/router';
import { Recipes } from '../../services/recipes';
import { ChipModule } from 'primeng/chip';
import { NutritionDetails } from '../nutrition-details/nutrition-details';

@Component({
  selector: 'app-recipe-details',
  imports: [ChipModule, NutritionDetails],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.scss',
})
export class RecipeDetails implements OnInit {
  private id = '';
  recipe: Recipe | null = null;
  details: RecipeDetailsType | null = null;
  prepTime: string = '';
  loading = signal(false);

  constructor(
    private route: ActivatedRoute,
    private recipesService: Recipes,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.recipesService.getRecipeDetails$(+this.id).subscribe({
      next: ({ recipe, details }) => {
        this.recipe = recipe;
        this.details = details;
        this.prepTime = this.getHoursPrepTime(this.details.prepTime);
        this.loading.set(true);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getHoursPrepTime(prepTime: number): string {
    const prep = prepTime / 1000 / 60 / 60;
    return `${prep} h`;
  }
}
