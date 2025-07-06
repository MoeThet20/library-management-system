import { render, screen } from '@testing-library/react';
import Page from '../src/app/admin/borrow/create/page';

describe('Borrow Book page', () => {
  it('renders heading', () => {
    render(<Page />);
    expect(screen.getByText('Borrow Book')).toBeInTheDocument();
  });
});
