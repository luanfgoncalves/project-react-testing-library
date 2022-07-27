import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const ALL = 'All';
const TYPE = 'pokemon-type-button';

describe('Requisito 5 - Componente <Pokedex.js />', () => {
  test('se a página contém um heading h2 com o texto Encountered pokémons',
    () => {
      renderWithRouter(<App />);

      const expected = screen.getByRole('heading', {
        name: 'Encountered pokémons',
      });

      expect(expected).toBeInTheDocument();
    });

  test('se Teste se a Pokédex tem os botões de filtro:',
    () => {
      renderWithRouter(<App />);

      const allButton = screen.getByRole('button', { name: ALL });
      const typeButton = screen.getAllByTestId(TYPE);

      expect(allButton).toBeInTheDocument();
      expect(typeButton[0].textContent).toBe('Electric');
      expect(typeButton[1].textContent).toBe('Fire');
      expect(typeButton[2].textContent).toBe('Bug');
      expect(typeButton[3].textContent).toBe('Poison');
      expect(typeButton[4].textContent).toBe('Psychic');
      expect(typeButton[5].textContent).toBe('Normal');
      expect(typeButton[6].textContent).toBe('Dragon');
    });

  test('Teste se é exibido o próximo pokémon quando o botão é clicado', () => {
    renderWithRouter(<App />);

    // testa primeiro pokemon que deveria aparecer
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    // testa se o segundo pokemon aparece adequadamente quando clocado no pŕoximo botão
    const nextButton = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });

    userEvent.click(nextButton);

    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
  });

  test('se a Pokédex contém um botão para resetar o filtro',
    () => {
      renderWithRouter(<App />);

      const allButton = screen.getByRole('button', { name: ALL });
      const typeButton = screen.getAllByTestId(TYPE);

      userEvent.click(typeButton[0]);

      userEvent.click(allButton);

      const expected = screen.getByTestId('pokemon-name');

      expect(expected.innerHTML).toBe('Pikachu');
    });
});
