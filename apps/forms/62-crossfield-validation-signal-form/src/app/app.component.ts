import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  email,
  Field,
  form,
  min,
  required,
  validate,
} from '@angular/forms/signals';

interface IRegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-root',
  imports: [JsonPipe, Field],
  template: `
    <div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 class="mb-6 text-3xl font-bold text-gray-900">Registration Form</h1>
        <p class="mb-6 text-sm text-gray-600">
          This form demonstrates cross field validation with reactive forms
        </p>

        <form class="space-y-6">
          <div>
            <label
              for="email"
              class="mb-2 block text-sm font-medium text-gray-700">
              Email
              <span class="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              [field]="registerForm.email"
              placeholder="Enter your email"
              class="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                registerForm.email().invalid() && registerForm.email().touched()
              " />
            @if (
              registerForm.email().invalid() && registerForm.email().touched()
            ) {
              @for (error of registerForm.email().errors(); track $index) {
                <p class="mt-1 text-sm text-red-600">{{ error.message }}</p>
              }
            }
          </div>

          <div>
            <label
              for="password"
              class="mb-2 block text-sm font-medium text-gray-700">
              Password
              <span class="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              [field]="registerForm.password"
              placeholder="Enter your password"
              class="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                registerForm.password().invalid() &&
                registerForm.password().touched()
              " />
            @if (
              registerForm.password().invalid() &&
              registerForm.password().touched()
            ) {
              @for (error of registerForm.password().errors(); track $index) {
                <p class="mt-1 text-sm text-red-600">{{ error.message }}</p>
              }
            }
          </div>

          <div>
            <label
              for="confirmPassword"
              class="mb-2 block text-sm font-medium text-gray-700">
              Confirm Password
              <span class="text-red-500">*</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              [field]="registerForm.confirmPassword"
              placeholder="Confirm your password"
              class="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                registerForm.confirmPassword().invalid() &&
                registerForm.confirmPassword().touched()
              " />
            @if (
              registerForm.confirmPassword().invalid() &&
              registerForm.confirmPassword().touched()
            ) {
              @for (
                error of registerForm.confirmPassword().errors();
                track $index
              ) {
                <p class="mt-1 text-sm text-red-600">{{ error.message }}</p>
              }
            }
          </div>

          <div>
            <label
              for="startDate"
              class="mb-2 block text-sm font-medium text-gray-700">
              Start Date
              <span class="text-red-500">*</span>
            </label>
            <input
              id="startDate"
              type="date"
              [field]="registerForm.startDate"
              class="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                registerForm.startDate().invalid() &&
                registerForm.startDate().touched()
              " />
            @if (
              registerForm.startDate().invalid() &&
              registerForm.startDate().touched()
            ) {
              <p class="mt-1 text-sm text-red-600">Start date is required</p>
            }
          </div>

          <div>
            <label
              for="endDate"
              class="mb-2 block text-sm font-medium text-gray-700">
              End Date
              <span class="text-red-500">*</span>
            </label>
            <input
              id="endDate"
              type="date"
              [field]="registerForm.endDate"
              class="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                registerForm.endDate().invalid() &&
                registerForm.endDate().touched()
              " />
            @if (
              registerForm.endDate().invalid() &&
              registerForm.endDate().touched()
            ) {
              @for (error of registerForm.endDate().errors(); track $index) {
                <p class="mt-1 text-sm text-red-600">{{ error.message }}</p>
              }
            }
          </div>

          <div class="flex gap-4">
            <button
              (click)="onSubmit($event)"
              [disabled]="registerForm().invalid()"
              class="flex-1 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400">
              Submit
            </button>
            <button
              type="button"
              (click)="onReset()"
              class="flex-1 rounded-md bg-gray-300 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-400">
              Reset
            </button>
          </div>
        </form>

        <div class="mt-8 rounded-md bg-gray-50 p-4">
          <h2 class="mb-2 text-lg font-semibold text-gray-900">Form Status</h2>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="font-medium text-gray-700">Valid:</span>
              <span
                [class.text-green-600]="registerForm().valid()"
                [class.text-red-600]="registerForm().invalid()">
                {{ registerForm().valid() ? 'Yes' : 'No' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium text-gray-700">Touched:</span>
              <span>{{ registerForm().touched() ? 'Yes' : 'No' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium text-gray-700">Dirty:</span>
              <span>{{ registerForm().dirty() ? 'Yes' : 'No' }}</span>
            </div>
          </div>
          <div class="mt-4">
            <h3 class="mb-2 font-medium text-gray-700">Form Value:</h3>
            <pre
              class="overflow-x-auto rounded bg-gray-800 p-3 text-xs text-gray-100"
              >{{ registerForm().value() | json }}</pre
            >
          </div>
        </div>

        @if (isSubmitted()) {
          <div class="mt-6 rounded-md border border-green-300 bg-green-50 p-4">
            <h2 class="mb-2 text-lg font-semibold text-green-900">
              Form Submitted Successfully!
            </h2>
            <pre
              class="overflow-x-auto rounded bg-green-800 p-3 text-xs text-green-100"
              >{{ this.registerForm().value() | json }}</pre
            >
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public isSubmitted = signal(false);

  registerModel = signal<IRegisterData>({
    email: '',
    password: '',
    confirmPassword: '',
    startDate: '',
    endDate: '',
  });

  registerForm = form(this.registerModel, (fieldPath) => {
    (required(fieldPath.email, { message: 'Email is required' }),
      email(fieldPath.email, { message: 'Please enter a valid email address' }),
      required(fieldPath.password, { message: 'Password is required' }),
      min(fieldPath.password, 6, {
        message: 'Password must be at least 6 characters',
      }),
      required(fieldPath.confirmPassword, { message: 'Password is required' }),
      min(fieldPath.confirmPassword, 6, {
        message: 'Password must be at least 6 characters',
      }),
      required(fieldPath.startDate, { message: 'Start date is required' }),
      required(fieldPath.endDate, { message: 'End date is required' }),
      validate(fieldPath.confirmPassword, ({ value, valueOf }) => {
        const confirmPassword = value();
        const password = valueOf(fieldPath.password);

        if (!confirmPassword) {
          return null;
        }

        if (confirmPassword !== password) {
          return {
            kind: 'passwordMismatch',
            message: 'Passwords do not match',
          };
        }

        return null;
      }));

    validate(fieldPath.endDate, ({ value, valueOf }) => {
      const endDate = value();
      const startDate = valueOf(fieldPath.startDate);

      if (!endDate || !endDate) {
        return null;
      }

      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();

      if (end < start) {
        return {
          kind: 'endDateBeforeStart',
          message: 'Passwords do not match',
        };
      }

      return null;
    });
  });

  onSubmit(e: Event) {
    e.preventDefault();
    console.log('Submitting form...', this.registerForm());
    if (this.registerForm().valid()) {
      this.isSubmitted.set(true);
      console.log('Form submitted:', {
        ...this.registerForm().value(),
        startDate: new Date(
          this.registerForm().value().startDate,
        ).toISOString(),
        endDate: new Date(this.registerForm().value().endDate).toISOString(),
      });
    }
  }

  onReset() {
    this.registerForm().reset(this.registerModel());
    this.isSubmitted.set(false);
  }
}
