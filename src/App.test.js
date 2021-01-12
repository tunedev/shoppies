import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const shoppiesHeaderElement = screen.getByText(/shoppies/i);
  expect(shoppiesHeaderElement).toBeInTheDocument();
});
