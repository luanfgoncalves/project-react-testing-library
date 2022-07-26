import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('Requisito 1 - componente <App.js />',
  () => {
    test('se contém um conjunto fixo de links de navegação):',
      () => {
        render(<BrowserRouter><App /></BrowserRouter>);
        const Home = screen.getByRole('link', { name: 'Home' });
        const About = screen.getByRole('link', { name: 'About' });
        const Favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
        expect(Home).toBeInTheDocument();
        expect(About).toBeInTheDocument();
        expect(Favorite).toBeInTheDocument();
      });
  });
