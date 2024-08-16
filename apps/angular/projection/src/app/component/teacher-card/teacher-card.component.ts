import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ICard } from '../../data-access/card';
import { randTeacher } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      [type]="cardType"
      (newItemEvent)="addNewItem()"
      class="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" />

      <ng-template card-list-item let-teacher>
        <app-list-item (delete)="deleteItem(teacher.id)">
          {{ teacher.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [
    CardComponent,
    AsyncPipe,
    NgIf,
    ListItemComponent,
    CardListItemDirective,
  ],
})
export class TeacherCardComponent implements ICard {
  private store: TeacherStore = inject(TeacherStore);
  teachers = toSignal(this.store.teachers$, { initialValue: [] });
  cardType = CardType.TEACHER;

  addNewItem() {
    this.store.addOne(randTeacher());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
