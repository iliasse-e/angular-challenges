import { NgFor } from '@angular/common';
import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'compute', standalone: true })
export class IndexPipe implements PipeTransform {
  transform(value: string, index: number): string {
    return `${value} - ${index}`;
  }
}

@Pipe({ name: 'allowance', standalone: true })
export class AllowedPipe implements PipeTransform {
  transform(age: number, isFirst: boolean) {
    if (isFirst) {
      return ' always allowed';
    } else {
      return age > 25 ? ' allowed' : ' declined';
    }
  }
}

@Component({
  standalone: true,
  imports: [NgFor, IndexPipe, AllowedPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index; let isFirst = first">
      {{ person.name | compute: index }}
      {{ person.age | allowance: isFirst }}
    </div>
  `,
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];
}
