import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

describe('AppComponent', () => {
  async function initSearch(searchQuery: string) {
    await render(AppComponent, { routes: appRoutes });

    const user = userEvent.setup();

    const input = screen.getByLabelText('Search Book by author or title');
    const button = screen.getByRole('button', { name: /Borrow/i });

    await user.type(input, searchQuery);
    await user.click(button);
  }

  describe('Given no search criteria', () => {
    it('Then shows error message and disabled button', async () => {
      await render(AppComponent, { routes: appRoutes });

      await userEvent.click(
        screen.getByRole('link', { name: /borrow a book/i }),
      );

      expect(
        screen.getByText('Search criteria is required!'),
      ).toBeInTheDocument();

      expect(screen.getByRole('button', { name: 'Borrow' })).toBeDisabled();
    });
  });

  describe('Given a search criteria with no book match', () => {
    it('Then shows No book found', async () => {
      await initSearch('du contrat social');

      expect(
        screen.getByText('No book found for this search'),
      ).toBeInTheDocument();
    });
  });

  describe('Given a search criteria with one book match', () => {
    it('Then shows One book and no error', async () => {
      await initSearch('1984');

      expect(
        screen.getByText('Borrowed Book: 1984 by George Orwell'),
      ).toBeInTheDocument();
    });
  });

  describe('Given a search criteria in Uppercase with one book match', () => {
    it('Then shows One book and no error', async () => {
      await initSearch('ANIMAL FARM');

      expect(
        screen.getByText('Borrowed Book: Animal Farm by George Orwell'),
      ).toBeInTheDocument();
    });
  });

  describe('Given a search criteria with multple books matches', () => {
    it('Then shows a list of books', async () => {
      await initSearch('orwell');

      await screen.findByText(/Borrowed Book: 1984 by George Orwell/);
      await screen.findByText(/Borrowed Book: Animal Farm by George Orwell/);

      expect(screen.queryByText(/The Hunger Games/)).not.toBeInTheDocument();
    });
  });
});
