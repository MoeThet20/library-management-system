import { render, screen } from '@testing-library/react';
import Login from '../src/app/login/page';

describe('Login page', () => {
  it('renders heading', () => {
    render(<Login />);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
