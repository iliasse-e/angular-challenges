import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  InputSignalWithTransform,
  Signal,
} from '@angular/core';

type Category = 'Youth' | 'Junior' | 'Open' | 'Senior';
const ageToCategory = (age: number): Category => {
  if (age < 10) return 'Youth';
  else if (age < 18) return 'Junior';
  else if (age < 35) return 'Open';
  return 'Senior';
};

@Component({
  selector: 'app-user',
  imports: [TitleCasePipe],
  template: `
    {{ fullName() | titlecase }} plays tennis in the
    {{ category() || 'Junior' }} category!!
  `,
  host: {
    class: 'text-xl text-green-800',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  name: InputSignal<string> = input.required();

  lastName: InputSignal<unknown> = input();

  age: InputSignalWithTransform<number, string> = input(0, {
    transform: (v: string) => Number(v), // numberAttribute could be use
  });

  fullName = computed(() => `${this.name()} ${this.lastName() ?? ''}`);

  category: Signal<Category> = computed(() => ageToCategory(this.age()));
}
