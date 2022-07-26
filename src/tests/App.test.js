import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 1 - componente <App.js />',
  () => {
    test('se contém um conjunto fixo de links de navegação):',
      () => {
        // render(<BrowserRouter><App /></BrowserRouter>);
        renderWithRouter(<App />);
        const Home = screen.getByRole('link', { name: 'Home' });
        const About = screen.getByRole('link', { name: 'About' });
        const Favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
        expect(Home).toBeInTheDocument();
        expect(About).toBeInTheDocument();
        expect(Favorite).toBeInTheDocument();
      });

    test('se o app é redirecionado corretamente ao clicar no link Home', () => {
      const { history } = renderWithRouter(<App />);

      const home = screen.getByRole('link', { name: 'Home' });
      userEvent.click(home);

      const path = history.location.pathname;
      expect(path).toBe('/');
    });

    test('se o app é redirecionado corretamente ao clicar no link About', () => {
      const { history } = renderWithRouter(<App />);

      const about = screen.getByRole('link', { name: 'About' });
      userEvent.click(about);

      const path = history.location.pathname;
      expect(path).toBe('/about');
    });

    test('se o app é redirecionado corretamente ao clicar no link Favorites', () => {
      const { history } = renderWithRouter(<App />);

      const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
      userEvent.click(favorites);

      const path = history.location.pathname;
      expect(path).toBe('/favorites');
    });

    test('se o app é redirecionado corretamente ao entrar numa URL desconhecida.', () => {
      const { history } = renderWithRouter(<App />);

      history.push('/pagina/não-encontrada');

      const notFound = screen.getByRole('heading', {
        name: 'Page requested not found Crying emoji' });

      expect(notFound).toBeInTheDocument();
    });
  });
