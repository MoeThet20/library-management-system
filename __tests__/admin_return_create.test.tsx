import { render, screen } from '@testing-library/react';
import Page from '../src/app/admin/return/create/page';

describe('Return Book page', () => {
  it('renders heading', () => {
    render(<Page />);
    expect(screen.getByText('Return Book')).toBeInTheDocument();
  });
});
