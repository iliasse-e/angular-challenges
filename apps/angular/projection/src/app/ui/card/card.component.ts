import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CardType } from '../../model/card.model';

@Directive({
  selector: 'ng-template [card-list-item]',
  standalone: true,
})
export class CardListItemDirective {}

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img"></ng-content>

    <section>
      <ng-template
        *ngFor="let item of list"
        [ngTemplateOutlet]="rowTemplate"
        [ngTemplateOutletContext]="{ $implicit: item }" />
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="newItemEvent.emit()">
      Add
    </button>
  `,
  standalone: true,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  imports: [NgFor, NgTemplateOutlet],
})
export class CardComponent<T> {
  @Input({ required: true }) list!: T[];

  @Input({ required: true }) type!: CardType;

  @Output() newItemEvent: EventEmitter<void> = new EventEmitter<void>();

  @ContentChild(CardListItemDirective, { read: TemplateRef })
  rowTemplate!: TemplateRef<CardListItemDirective>;
}
