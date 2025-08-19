import {
  ChangeDetectionStrategy,
  Component,
  effect,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-root',
  template: `
    <section class="flex gap-5">
      <p>MacBook</p>
      <p>1999,99 €</p>
    </section>

    <section>
      <p>Extras:</p>

      <div>
        <input type="checkbox" [(ngModel)]="drive" />
        +500 GB drive-space
      </div>
      <div>
        <input type="checkbox" [(ngModel)]="ram" />
        +4 GB RAM
      </div>
      <div>
        <input type="checkbox" [(ngModel)]="gpu" />
        Better GPU
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  drive = model(false);
  ram = model(false);
  gpu = model(false);

  constructor() {
    /*
      Explain for your junior team mate why this bug occurs ...

      This solution exploits how JavaScript works and how it evaluates variables.
      JavaScript looks inside code blocks for the variables it needs,
      and if it doesn't find that variable, it will go to the next code block until it finds the variable.
      When learning JavaScript, you should have run into this when learning about hoisting.

      So to get the effect to run with the latest value of each signal, you just have to use each signal above the conditional.
      The common convention is to create a variable to hold the signal value.
    */
    effect(() => {
      if (this.drive()) {
        alert('Price increased!');
      }
      if (this.ram()) {
        alert('Price increased!');
      }
      if (this.gpu()) {
        alert('Price increased!');
      }
    });
  }
}
