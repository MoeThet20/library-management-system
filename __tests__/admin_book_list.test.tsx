import { render, screen } from '@testing-library/react';
import Page from '../src/app/admin/book/list/page';

describe('Book List page', () => {
  it('renders heading', () => {
    render(<Page />);
    expect(screen.getByText('Book List')).toBeInTheDocument();
  });
});
