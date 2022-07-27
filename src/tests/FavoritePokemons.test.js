import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const NO_FAVORITES = 'No favorite pokemon found';

const FAVORITED = 'Pokémon favoritado?';

const MARKED_FAVORITE = 'Pikachu is marked as favorite';

const FAVORITE = 'Favorite Pokémons';

const MORE_DETAILS = 'More details';

describe('Requisito 3 - Componente <FavoritePokemons.js />', () => {
  test('se é exibida o texto /No favorite pokemon found/, na ausência pokémons favoritos',
    () => {
      renderWithRouter(<App />);

      const favorites = screen.getByRole('link', { name: FAVORITE });

      userEvent.click(favorites);

      const noFavorite = screen.getByText(NO_FAVORITES);

      expect(noFavorite).toBeInTheDocument();
    });

  test('se é exibido o card do pokémon favoritado.',
    () => {
      renderWithRouter(<App />);

      const favorites = screen.getByRole('link', { name: FAVORITE });

      // favorita Pikachu
      const moreDetails = screen.getByRole('link', { name: MORE_DETAILS });

      userEvent.click(moreDetails);

      const favoriteCheck = screen.getByLabelText(FAVORITED);

      userEvent.click(favoriteCheck);

      userEvent.click(favorites);

      const markedAsFavorite = screen.getByAltText(MARKED_FAVORITE);

      expect(markedAsFavorite).toBeInTheDocument();
    });

  test('se não é exibido o card do pokémon desfavoritado.',
    () => {
      renderWithRouter(<App />);

      const favorites = screen.getByRole('link', { name: FAVORITE });

      // favorita Pikachu
      const moreDetails = screen.getByRole('link', { name: MORE_DETAILS });

      userEvent.click(moreDetails);

      const favoriteCheck = screen.getByLabelText(FAVORITED);

      userEvent.click(favoriteCheck);

      userEvent.click(favorites);

      const noFavorite = screen.getByText(NO_FAVORITES);

      // desfavorita Pikachu
      userEvent.click(moreDetails);

      userEvent.click(favoriteCheck);

      userEvent.click(favorites);

      expect(noFavorite).toBeInTheDocument();
    });
});
