## Cross field validation

Il s'agit de valider un champs "confirmation de mot de passe" via les données du champ "mot de passe".

Pour ce faire, on utilise la fonction `validate()` du package `@angular/forms/signals`.  
Il faut importé `validate` depuis `@angular/forms/signals`.  
On definit la logique de validation dans une fonction qui prend en paramètre le champ et les données du champ.  
Dans notre cas on a :

```typescript
validate(path.confirmPassword, ({ value, valueOf }) => {
  if (value() !== valueOf(path.password)) {
    return {
      kind: 'passwordMismatch',
      message: 'Passwords do not match',
    };
  }
  return null;
}),
```

Voir la documentation:
[Cross field validation](https://angular.dev/docs/signals/guide/crossfield-validation)

## Submission des données

Pour soumettre le formulaire, on utilise la propriété `submission` du schéma.  
Elle prend un objet avec une propriété `action` qui est une fonction qui prend en paramètre le champ et les données du champ.  
Dans notre cas on a :

```typescript
submission: {
            action: async (f) => {
              if (f().valid()) {
                // On appelle le serveur, on recupère la réponse et la traite ...
              }
              // Si on a une réponse d'un serveur
              return { kind: 'serverError', message: 'Failed to submit form' };
            },
          },
```

On peut donc supprimer la méthode `onSubmit()`, et ajouter [formRoot]="form" dans le template

Voir la documentation:
[Submission des données](https://angular.dev/docs/signals/guide/form-submission)
