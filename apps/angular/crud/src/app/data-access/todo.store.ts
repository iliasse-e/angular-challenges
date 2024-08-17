import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { tap } from 'rxjs';

export interface ITodo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

const URL = 'https://jsonplaceholder.typicode.com/todos';

@Injectable({ providedIn: 'root' })
export class TodoStore {
  todos: WritableSignal<ITodo[]> = signal<ITodo[]>([]);

  constructor(private http: HttpClient) {
    this.retrieveAll();
  }

  retrieveAll(): void {
    this.http.get<ITodo[]>(URL).subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  update(todo: ITodo): void {
    this.http
      .put<ITodo>(
        `${URL}/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          compeleted: todo.completed,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .pipe(
        tap((updatedTodo) => {
          this.todos.update((currentTodos) =>
            currentTodos.map((todo) =>
              todo.id === updatedTodo.id ? updatedTodo : todo,
            ),
          );
        }),
      )
      .subscribe();
  }

  delete(id: number): void {
    this.http
      .delete(`${URL}/${id}`)
      .pipe(
        tap(() =>
          this.todos.update((todos) => todos.filter((todo) => todo.id !== id)),
        ),
      )
      .subscribe();
  }
}
