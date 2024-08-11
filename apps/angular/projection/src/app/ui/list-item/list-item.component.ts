import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ label }}
      <button (click)="onDelete()">
        <img class="h-5" src="assets/svg/trash.svg"/>
      </button>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  @Input({required: true}) label!: string;

  @Output() delete: EventEmitter<void> = new EventEmitter<void>();

  onDelete() {
    this.delete.emit();
  }

}
