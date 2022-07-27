import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 6 - Componente <Pokemon.js />', () => {
  test('se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<App />);

      const sprite = screen.getByAltText('Pikachu sprite');
      const name = screen.getByTestId('pokemon-name');
      const type = screen.getByTestId('pokemon-type');
      const weight = screen.getByTestId('pokemon-weight');

      expect(sprite.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(name.textContent).toBe('Pikachu');
      expect(type.textContent).toBe('Electric');
      expect(weight.textContent).toBe('Average weight: 6.0 kg');
    });

  // test('se a URL exibida no navegador muda para /pokemon/<id>',
  //   () => {
  //     renderWithRouter(<App />);

  //     const moreDetails = screen.getByRole('link', {
  //       name: 'More details',
  //     });

  //     userEvent.click(moreDetails);

  //     const pikachuDetails = screen.getByRole('heading', {
  //       name: 'Pikachu Details',
  //       level: 2,
  //     });

  //     expect(pikachuDetails).toBeInTheDocument();
  //   });
  //
  test('se ao clicar no link de navegação do pokémon, URL e conteudo mudam corretamente',
    () => {
      const { history } = renderWithRouter(<App />);

      const moreDetails = screen.getByRole('link', { name: 'More details' });

      userEvent.click(moreDetails);

      const pikachuDetails = screen.getByRole('heading', {
        name: 'Pikachu Details',
        level: 2,
      });

      // testa se ouve o redirecionamento
      expect(history.location.pathname).toBe('/pokemons/25');

      // testa se o redirecionamento foi correto
      expect(pikachuDetails).toBeInTheDocument();
    });

  test('se existe um ícone de estrela nos pokémons favoritados',
    () => {
      renderWithRouter(<App />);

      const moreDetails = screen.getByRole('link', { name: 'More details' });

      userEvent.click(moreDetails);

      // favorita Pikachu
      const favoriteCheck = screen.getByLabelText('Pokémon favoritado?');

      userEvent.click(favoriteCheck);

      const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');

      // expect(favoriteIcon.src).toBe('star-icon.svg'); não dá pra testar source local diretamente
      expect(favoriteIcon.src).toEqual(expect.stringContaining('star-icon.svg'));
    });
});
