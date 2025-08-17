import { CanDeactivateFn, MaybeAsync } from '@angular/router';

export interface CanDeactivatedComponent {
  canDeactivate(): MaybeAsync<boolean>;
}

export const FormDeactivatedGuard: CanDeactivateFn<CanDeactivatedComponent> = (
  component: CanDeactivatedComponent,
) => component.canDeactivate();
