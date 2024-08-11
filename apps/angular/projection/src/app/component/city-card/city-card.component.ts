import {Component, inject} from '@angular/core';
import {City} from "../../model/city.model";
import {CardType} from "../../model/card.model";
import {CityStore} from "../../data-access/city.store";
import {CardComponent} from "../../ui/card/card.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {randomCity} from "../../data-access/fake-http.service";
import {ICard} from "../../data-access/card";

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="list$ | async"
      [type]="cardType"
      (newItemEvent)="addNewItem()"
      (deleteEvent)="deleteItem($event)"
      class="bg-light-green">
      <img src="assets/img/city.png" width="200px" />
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, NgIf, AsyncPipe],
})
export class CityCardComponent implements ICard {
  private store: CityStore = inject(CityStore);
  list$: Observable<City[]> = this.store.cities$;
  cardType = CardType.CITY;

  addNewItem() {
    this.store.addOne(randomCity());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
