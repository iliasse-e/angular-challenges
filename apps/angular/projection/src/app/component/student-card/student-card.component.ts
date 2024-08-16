import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ICard } from '../../data-access/card';
import { randStudent } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      [type]="cardType"
      (newItemEvent)="addNewItem()"
      class="bg-light-green">
      <img src="assets/img/student.webp" width="200px" />

      <ng-template card-list-item let-student>
        <app-list-item (delete)="deleteItem(student.id)">
          {{ student.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [
    CardComponent,
    AsyncPipe,
    NgIf,
    CardListItemDirective,
    ListItemComponent,
  ],
})
export class StudentCardComponent implements ICard {
  private store: StudentStore = inject(StudentStore);
  students = toSignal(this.store.students$, { initialValue: [] });
  cardType = CardType.STUDENT;

  addNewItem() {
    this.store.addOne(randStudent());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
