import { NgFor, NgIf } from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
      <ng-content select="img"></ng-content>

      <section>
        <app-list-item
          *ngFor="let item of list"
          [label]="item.firstName || item.name"
          (delete)="deleteEvent.emit(item.id)"
        ></app-list-item>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="newItemEvent.emit()">
        Add
      </button>
  `,
  standalone: true,
  host: {
    class: "flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4",
  },
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent {

  @Input({required: true}) list!: any;

  @Input({required: true}) type!: CardType;

  @Output() newItemEvent: EventEmitter<void> = new EventEmitter<void>();

  @Output() deleteEvent: EventEmitter<number> = new EventEmitter<number>();

}
