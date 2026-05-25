import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Recipe } from '../../types/recipes.types';

@Component({
  selector: 'app-recipe-item',
  imports: [CardModule],
  templateUrl: './recipe-item.html',
  styleUrl: './recipe-item.scss',
})
export class RecipeItem {
  recipe = input<Recipe>();
}
