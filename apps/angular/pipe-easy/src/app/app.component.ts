import { NgFor } from '@angular/common';
import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'index', standalone: true })
export class IndexPipe implements PipeTransform {
  transform(value: string, index: number): string {
    return `${value} - ${index}`;
  }
}

@Component({
  standalone: true,
  imports: [NgFor, IndexPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | index: index }}
    </div>
  `,
})
export class AppComponent {
  persons: string[] = ['toto', 'jack'];
}
