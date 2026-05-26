import { Component, input } from '@angular/core';
import { Nutrition } from '../../types/recipes.types';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-nutrition-details',
  imports: [CardModule],
  templateUrl: './nutrition-details.html',
  styleUrl: './nutrition-details.scss',
})
export class NutritionDetails {
  nutrition = input<Nutrition>();
}
