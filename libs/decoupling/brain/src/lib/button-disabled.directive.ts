/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive, inject } from '@angular/core';
import {
  BUTTON_DISABLED_STATE,
  ButtonDisabledState,
} from 'libs/decoupling/core/src/lib/button-disabled.service';

@Directive({
  selector: 'button[btnDisabled]',
  standalone: true,
  providers: [
    {
      provide: BUTTON_DISABLED_STATE,
      useClass: ButtonDisabledState,
    },
  ],
  host: {
    '(click)': 'toggleState()',
  },
})
export class BtnDisabledDirective {
  state = inject(BUTTON_DISABLED_STATE).state;

  toggleState() {
    this.state.set(this.state() === 'enabled' ? 'disabled' : 'enabled');
  }
}
