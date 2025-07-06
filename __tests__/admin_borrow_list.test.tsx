import { render, screen } from '@testing-library/react';
import Page from '../src/app/admin/borrow/list/page';

describe('Borrow List page', () => {
  it('renders heading', () => {
    render(<Page />);
    expect(screen.getByText('Borrow List')).toBeInTheDocument();
  });
});
