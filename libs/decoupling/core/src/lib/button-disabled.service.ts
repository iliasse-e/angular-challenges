import {
  Injectable,
  InjectionToken,
  signal,
  WritableSignal,
} from '@angular/core';

export type ButtonState = 'enabled' | 'disabled';

type ButtonDisableInterface = {
  state: WritableSignal<ButtonState>;
};

@Injectable()
export class ButtonDisabledState {
  state = signal('enabled');
}

export const BUTTON_DISABLED_STATE = new InjectionToken<ButtonDisableInterface>(
  'BUTTON_DISABLED_STATE',
);
