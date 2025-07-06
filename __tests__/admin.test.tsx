import { render, screen } from '@testing-library/react';
import Dashboard from '../src/app/admin/page';

describe('Admin dashboard page', () => {
  it('renders warning heading', () => {
    render(<Dashboard />);
    expect(screen.getByText('Warning List !!')).toBeInTheDocument();
  });
});
