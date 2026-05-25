import { AfterViewInit, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Recipes } from './services/recipes';
import { Recipe } from './types/recipes.types';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  protected readonly title = signal('cookbook');
  recipes: Recipe[] = [];

  constructor(private recipesService: Recipes) {}

  ngAfterViewInit(): void {
    this.recipesService.getRecipes$().subscribe((recipes) => {
      console.log(recipes);
    });
  }
}
