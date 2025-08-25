import { Component, inject, input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subscription',
  template: `
    <div>TestId: {{ testId() }}</div>
    <div>Permission: {{ permission() }}</div>
    <div>User: {{ user() }}</div>
  `,
})
export default class TestComponent {
  readonly #activatedRoute = inject(ActivatedRoute);

  testId = input.required<string>(); // Récupère l'id grace withComponentInputBinding()
  permission = signal(this.#activatedRoute.snapshot.data['permission']); // Récupère les données depuis la prop data dans le router
  user = signal(this.#activatedRoute.snapshot.queryParams['user']); // Récupère les données depuis les queryParam que l'on a renseigné dans le composant principal
}
