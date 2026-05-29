import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import { Recipes } from './services/recipes';
import { Recipe } from './types/recipes.types';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  startWith,
  switchMap,
} from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-root',
  imports: [IconFieldModule, InputIconModule, InputTextModule, RouterOutlet, ToolbarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  protected readonly title = signal('cookbook');
  protected loading = signal(true);
  protected searchNameInputElement = viewChild<ElementRef>('searchNameInput');
  protected searchIngredientInputElement = viewChild<ElementRef>('searchIngredientInput');
  recipes: Recipe[] = [];

  constructor(private recipesService: Recipes) {}

  ngAfterViewInit(): void {
    const searchNameInputValue$ = fromEvent<InputEvent>(
      this.searchNameInputElement()?.nativeElement,
      'input',
    ).pipe(
      map((searchInput: InputEvent) => (searchInput.target as HTMLInputElement).value),
      startWith(''),
    );

    const searchIngredientInputValue$ = fromEvent<InputEvent>(
      this.searchIngredientInputElement()?.nativeElement,
      'input',
    ).pipe(
      map((searchInput: InputEvent) => (searchInput.target as HTMLInputElement).value),
      startWith(''),
    );

    combineLatest({
      searchName: searchNameInputValue$,
      searchIngredient: searchIngredientInputValue$,
    })
      .pipe(
        debounceTime(500),
        distinctUntilChanged(
          (prev, curr) =>
            prev.searchName === curr.searchName && prev.searchIngredient === curr.searchIngredient,
        ),
        switchMap(({ searchName, searchIngredient }) =>
          this.recipesService.searchRecipes$(searchName, searchIngredient),
        ),
      )
      .subscribe((recipes) => {
        this.recipes = recipes;
        this.loading.set(false);
      });
  }
}
