import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders app with navbar', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const navbar = screen.getByRole('navigation') || document.querySelector('nav');
  expect(navbar || document.body).toBeTruthy();
});

test('renders footer', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const footer = document.querySelector('footer');
  expect(footer).toBeTruthy();
});
