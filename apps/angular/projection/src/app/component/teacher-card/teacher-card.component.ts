import {Component, inject} from '@angular/core';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import {AsyncPipe, NgIf} from "@angular/common";
import {randTeacher} from "../../data-access/fake-http.service";
import {ICard} from "../../data-access/card";

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers$ | async"
      [type]="cardType"
      (newItemEvent)="addNewItem()"
      (deleteEvent)="deleteItem($event)"
      class="bg-light-red">
      <img
        src="assets/img/teacher.png"
        width="200px" />
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, AsyncPipe, NgIf],
})
export class TeacherCardComponent implements ICard {
  private store: TeacherStore = inject(TeacherStore);
  teachers$ = this.store.teachers$;
  cardType = CardType.TEACHER;

  addNewItem() {
    this.store.addOne(randTeacher());
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
