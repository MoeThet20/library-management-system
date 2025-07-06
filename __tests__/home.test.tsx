import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';

describe('Home page', () => {
  it('renders heading', () => {
    render(<Home />);
    expect(screen.getByText('Library Management System')).toBeInTheDocument();
  });
});
