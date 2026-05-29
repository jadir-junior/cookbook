import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Recipe } from '../../types/recipes.types';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-recipe-item',
  imports: [CardModule, ChipModule, CommonModule],
  templateUrl: './recipe-item.html',
  styleUrl: './recipe-item.scss',
})
export class RecipeItem {
  recipe = input<Recipe>();
  image = input<string>();
}
