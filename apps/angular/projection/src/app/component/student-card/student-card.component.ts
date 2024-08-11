import {Component, inject} from '@angular/core';
import {randStudent} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import {Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {ICard} from "../../data-access/card";

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students$ | async"
      [type]="cardType"
      (newItemEvent)="addNewItem()"
      (deleteEvent)="deleteItem($event)"
      class="bg-light-green">
      <img
        src="assets/img/student.webp"
        width="200px" />
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, AsyncPipe, NgIf],
})
export class StudentCardComponent implements ICard {
  private store: StudentStore = inject(StudentStore);
  students$: Observable<Student[]> = this.store.students$;
  cardType = CardType.STUDENT;

  addNewItem() {
    this.store.addOne(randStudent());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
