import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ICard } from '../../data-access/card';
import { CityStore } from '../../data-access/city.store';
import { randomCity } from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      [type]="cardType"
      (newItemEvent)="addNewItem()"
      class="bg-light-green">
      <img src="assets/img/city.png" width="200px" />

      <ng-template card-list-item let-city>
        <app-list-item (delete)="deleteItem(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [
    CardComponent,
    NgIf,
    AsyncPipe,
    CardListItemDirective,
    ListItemComponent,
  ],
})
export class CityCardComponent implements ICard {
  private store: CityStore = inject(CityStore);
  cities = toSignal(this.store.cities$, { initialValue: [] });
  cardType = CardType.CITY;

  addNewItem() {
    this.store.addOne(randomCity());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
