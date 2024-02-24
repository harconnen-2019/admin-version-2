import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './app';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);
    const headline = screen.getByText(/and save to test hmr/i);

    expect(headline).toBeInTheDocument();
  });
});
