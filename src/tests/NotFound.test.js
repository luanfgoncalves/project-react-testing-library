import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Requisito 4 - Componente <NotFound.js />', () => {
  test('se a página contém um heading h2 com o texto /Page requested not found/',
    () => {
      render(<NotFound />);
      const title = screen.getByRole('heading', {
        name: /Page requested not found/i,
        level: 2,
      });

      expect(title).toBeInTheDocument();
    });

  test('se ao renderizar, a página mostra a imagem de um pikachu chorando', () => {
    render(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const alt = 'Pikachu crying because the page requested was not found';
    const image = screen.getByAltText(alt);

    expect(image).toHaveAttribute('src', url);
  });
});
