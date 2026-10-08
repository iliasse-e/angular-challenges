import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  email,
  FieldTree,
  form,
  FormField,
  FormRoot,
  required,
  schema,
  validate,
} from '@angular/forms/signals';

type Model = {
  email: string;
  password: string;
  confirmPassword: string;
  startDate: string;
  endDate: string;
};

const INIT_VALUE: Model = {
  email: '',
  password: '',
  confirmPassword: '',
  startDate: '',
  endDate: '',
};

@Component({
  selector: 'app-root',
  imports: [JsonPipe, FormField, FormRoot],
  template: `
    <div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 class="mb-6 text-3xl font-bold text-gray-900">Registration Form</h1>
        <p class="mb-6 text-sm text-gray-600">
          This form demonstrates cross field validation with reactive forms
        </p>

        <form [formRoot]="form" class="space-y-6">
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
              [formField]="form.email"
              placeholder="Enter your email"
              class="w-full rounded-md border border-gray-300 px-4 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                form.email().invalid() && form.email().touched()
              " />
            @if (form.email().invalid() && form.email().touched()) {
              <p class="mt-1 text-sm text-red-600">
                @if (
                  form.email().errors()?.some((error) => error.kind === 'required')
                ) {
                  Email is required
                } @else if (
                  form.email().errors()?.some((error) => error.kind === 'email')
                ) {
                  Please enter a valid email address
                }
              </p>
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
              [formField]="form.password"
              placeholder="Enter your password"
              class="w-full rounded-md border border-gray-300 px-4 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                form.password().invalid() && form.password().touched()
              " />
            @if (form.password().invalid() && form.password().touched()) {
              <p class="mt-1 text-sm text-red-600">
                @if (
                  form.password().errors()?.some((error) => error.kind === 'required')
                ) {
                  Password is required
                } @else if (
                  form.password().errors()?.some((error) => error.kind === 'minlength')
                ) {
                  Password must be at least 6 characters
                }
              </p>
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
              [formField]="form.confirmPassword"
              placeholder="Confirm your password"
              class="w-full rounded-md border border-gray-300 px-4 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                form.confirmPassword().invalid() &&
                form.confirmPassword().touched()
              " />
            @if (
              form.confirmPassword().invalid() &&
              form.confirmPassword().touched()
            ) {
              <p class="mt-1 text-sm text-red-600">
                @if (
                  form.confirmPassword().errors()?.some((error) => error.kind === 'required')
                ) {
                  Password is required
                } @else if (
                  form.confirmPassword().errors()?.some((error) => error.kind === 'passwordMismatch')
                ) {
                  Passwords do not match
                }
              </p>
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
              [formField]="form.startDate"
              class="w-full rounded-md border border-gray-300 px-4 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                form.startDate().invalid() && form.startDate().touched()
              " />
            @if (form.startDate().invalid() && form.startDate().touched()) {
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
              [formField]="form.endDate"
              class="w-full rounded-md border border-gray-300 px-4 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                form.endDate().invalid() && form.endDate().touched()
              " />
            @if (form.endDate().invalid() && form.endDate().touched()) {
              <p class="mt-1 text-sm text-red-600">
                @if (
                  form.endDate().errors()?.some((error) => error.kind === 'required')
                ) {
                  End date is required
                } @else if (
                  form.endDate().errors()?.some((error) => error.kind === 'endDateBeforeStart')
                ) {
                  End date must be after start date
                }
              </p>
            }
          </div>

          <div class="flex gap-4">
            <button
              type="submit"
              [disabled]="form().invalid()"
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
                [class.text-green-600]="form().valid()"
                [class.text-red-600]="form().invalid()">
                {{ form().valid() ? 'Yes' : 'No' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium text-gray-700">Touched:</span>
              <span>{{ form().touched() ? 'Yes' : 'No' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium text-gray-700">Dirty:</span>
              <span>{{ form().dirty() ? 'Yes' : 'No' }}</span>
            </div>
          </div>
          <div class="mt-4">
            <h3 class="mb-2 font-medium text-gray-700">Form Value:</h3>
            <pre
              class="overflow-x-auto rounded bg-gray-800 p-3 text-xs text-gray-100"
              >{{ form().value() | json }}</pre
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
              >{{ this.form().value() | json }}</pre
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

  data = signal(INIT_VALUE);

  form = form(
    this.data,
    schema<Model>((path) => {
      (required(path.email, { message: 'Email is required' }),
        email(path.email, { message: 'Enter a valid email adress' }),
        required(path.password, { message: 'Password is required' }),
        required(path.confirmPassword, {
          message: 'Password confirmation is required',
        }),
        required(path.startDate, { message: 'Start date is required' }),
        required(path.endDate, { message: 'End date is required' }),
        // validate() permet le custom validation
        validate(path.confirmPassword, ({ value, valueOf }) => {
          if (value() !== valueOf(path.password)) {
            return {
              kind: 'passwordMismatch',
              message: 'Passwords do not match',
            };
          }
          return null;
        }),
        validate(path.endDate, ({ value, valueOf }) => {
          if (value() <= valueOf(path.startDate)) {
            return {
              kind: 'endDateBeforeStart',
              message: 'End date must be after start date',
            };
          }
          return null;
        }),
        {
          // submission permet de gérer l'envoie du formulaire et de supprimer la methode onSubmit() (il faut ajouter [formRoot]="form" dans le template)
          submission: {
            action: async (
              f: FieldTree<Model, string | number, 'writable'>,
            ) => {
              if (f().valid()) {
                console.log('Submitting form...', f().value());
                this.isSubmitted.set(true);
              }
              // Ici c'est dans le cas ou on a une réponse d'un serveur
              return { kind: 'serverError', message: 'Failed to submit form' };
            },
          },
        });
    }),
  );

  onReset() {
    this.form().reset(INIT_VALUE);
    this.isSubmitted.set(false);
  }
}
