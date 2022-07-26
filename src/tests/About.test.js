import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 2 - Componente <About.js />', () => {
  test('Testa se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: 'About' });
    userEvent.click(about);

    const expected = screen.getByText(/This application simulates a Pokédex/i);
    expect(expected).toBeInTheDocument();
  });

  test('se a página contém um heading h2 com o texto /About Pokédex/', () => {
    renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: 'About' });
    userEvent.click(about);

    const expected = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });

    expect(expected).toBeInTheDocument();
  });

  // test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  // renderWithRouter(<App />);

  // const about = screen.getByRole('link', { name: 'About' });
  // userEvent.click(about);

  // const expected = screen.getAllByText(/Pokémons/i); // erro, tem que ser Pokémons especificamente dentro de uma tag <p> se não pega dento do link tbm

  // expect(expected).toHaveLength(2);
  // });

  test('se a página contém a imagem esperada de uma Pokédex', () => {
    renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: 'About' });
    userEvent.click(about);

    const expected = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(expected).toBeInTheDocument();

    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const expectedImage = screen.getByAltText('Pokédex');
    expect(expectedImage.src).toBe(URL);
  });
});
