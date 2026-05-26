import { Component, input, OnInit } from '@angular/core';
import { Recipe } from '../../types/recipes.types';
import { RecipeItem } from '../recipe-item/recipe-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes-list',
  imports: [RecipeItem, CommonModule],
  templateUrl: './recipes-list.html',
  styleUrl: './recipes-list.scss',
})
export class RecipesList implements OnInit {
  recipes = input<Recipe[]>();

  ngOnInit(): void {
    console.log('item list', this.recipes());
  }
}
