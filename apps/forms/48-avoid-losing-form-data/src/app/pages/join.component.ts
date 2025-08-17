import {
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaybeAsync } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertDialogComponent } from '../ui/dialog.component';
import { FormComponent } from '../ui/form.component';

@Component({
  imports: [FormComponent],
  template: `
    <section class="mx-auto	max-w-screen-sm">
      <div class="rounded-lg bg-white p-8 shadow-lg lg:p-12">
        <app-form />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinComponent {
  #dialog = inject(MatDialog);

  private formComponent = viewChild(FormComponent);

  private hasUnsavedChanges(): boolean {
    // We could use a signal that would be set by a form component ouput
    return this.formComponent()?.isFormFilled === true;
  }

  private openAlertDialog(): Observable<boolean> {
    let dialogRef = this.#dialog.open(AlertDialogComponent, {
      disableClose: true,
    });
    return dialogRef.afterClosed();
  }

  canDeactivate(): MaybeAsync<boolean> {
    if (this.hasUnsavedChanges()) {
      return this.openAlertDialog();
    }
    return true;
  }
}
