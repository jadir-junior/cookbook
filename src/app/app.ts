import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { Recipes } from './services/recipes';
import { Recipe } from './types/recipes.types';
import { RecipesList } from './components/recipes-list/recipes-list';

@Component({
  selector: 'app-root',
  imports: [RecipesList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('cookbook');
  recipes: Recipe[] = [];
  protected loading = signal(true);

  constructor(private recipesService: Recipes) {}

  ngOnInit(): void {
    this.recipesService.getRecipes$().subscribe((recipes) => {
      console.log(recipes);
      this.recipes = recipes;
      this.loading.set(false);
    });
  }
}
