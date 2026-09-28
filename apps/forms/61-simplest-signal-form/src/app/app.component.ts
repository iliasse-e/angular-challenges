import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import { form, FormField, max, min, required } from '@angular/forms/signals';

interface SimpleData {
  name: string;
  lastname: string;
  age: number | null;
  note: string;
}

@Component({
  selector: 'app-root',
  imports: [FormField, JsonPipe],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 class="mb-6 text-3xl font-bold text-gray-900">Simple Form</h1>

        <form (submit)="onSubmit($event)" class="space-y-6">
          <div>
            <label
              for="name"
              class="mb-2 block text-sm font-medium text-gray-700">
              Name
              <span class="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              class="w-full rounded-md border border-gray-300 px-4 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                simpleForm.name().invalid() && simpleForm.name().touched()
              "
              [formField]="simpleForm.name" />
            @if (simpleForm.name().invalid() && simpleForm.name().touched()) {
              <p class="mt-1 text-sm text-red-600">
                {{ simpleForm.name().errors().find(e => e.kind === 'required')?.message }}
              </p>
            }
          </div>

          <div>
            <label
              for="lastname"
              class="mb-2 block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastname"
              type="text"
              placeholder="Enter your last name"
              class="w-full rounded-md border border-gray-300 px-4 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [formField]="simpleForm.lastname" />
          </div>

          <div>
            <label
              for="age"
              class="mb-2 block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              id="age"
              type="number"
              placeholder="Enter your age (1-99)"
              class="w-full rounded-md border border-gray-300 px-4 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                simpleForm.age().invalid() && simpleForm.age().touched()
              "
              [formField]="simpleForm.age" />
            @if (simpleForm.age().invalid() && simpleForm.age().touched()) {
              <p class="mt-1 text-sm text-red-600">
                @if (simpleForm.age().errors().some(e => e.kind === 'min')) {
                  {{simpleForm.age().errors().find(e => e.kind === 'min')?.message}}
                }
                @if (simpleForm.age().errors().some(e => e.kind === 'max')) {
                  {{simpleForm.age().errors().find(e => e.kind === 'max')?.message}}
                }
              </p>
            }
          </div>

          <div>
            <label
              for="note"
              class="mb-2 block text-sm font-medium text-gray-700">
              Note
            </label>
            <input
              id="note"
              type="text"
              placeholder="Enter a note"
              class="w-full rounded-md border border-gray-300 px-4 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [formField]="simpleForm.note" />
          </div>

          <div class="flex gap-4">
            <button
              type="submit"
              [disabled]="simpleForm().invalid()"
              class="flex-1 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400">
              Submit
            </button>
            <button
              type="button"
              (click)="onReset()"
              class="flex-1 rounded-md bg-gray-600 px-4 py-2 font-medium text-white transition hover:bg-gray-700">
              Reset
            </button>
          </div>
        </form>

        @if (submittedData()) {
          <div class="mt-8 rounded-lg border border-green-200 bg-green-50 p-4">
            <h2 class="mb-2 text-lg font-semibold text-green-900">
              Submitted Data:
            </h2>
            <pre
              class="overflow-x-auto rounded border border-green-200 bg-white p-4 text-sm"
              >{{ submittedData() | json }}</pre
            >
          </div>
        }
      </div>
    </div>
  `,
})
export class AppComponent {
  // Form model
  simpleModel = signal<SimpleData>({
    name: '',
    lastname: '',
    age: null,
    note: '',
  });

  // Init form and creates a form wrapped around the given model data
  simpleForm = form(this.simpleModel, (field) => {
    required(field.name, { message: 'Name is required' });
    min(field.age, 1, { message: 'Age must be at least 1' });
    max(field.age, 99, { message: 'Age must be at most 99' });
  });

  submittedData: WritableSignal<SimpleData | null> = signal(null);

  onSubmit(e: Event): void {
    e.preventDefault();
    if (this.simpleForm().valid()) {
      this.submittedData.set(this.simpleModel());
      console.log('Form submitted:', this.submittedData());
    }
  }

  onReset(): void {
    this.simpleModel.set({
      name: '',
      lastname: '',
      age: null,
      note: '',
    });
    this.submittedData.set(null);
  }
}
