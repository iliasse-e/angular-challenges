import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodoStore } from './data-access/todo.store';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos()">
      {{ todo.title }}
      <button (click)="store.update(todo)">Update</button>
      <button (click)="store.delete(todo.id)">Delete</button>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  todos = this.store.todos;

  constructor(public store: TodoStore) {}
}
