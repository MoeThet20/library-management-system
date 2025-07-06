import { render, screen } from '@testing-library/react';
import Page from '../src/app/admin/book/create/page';

describe('Book Create page', () => {
  it('renders heading', () => {
    render(<Page />);
    expect(screen.getByText('Book Create')).toBeInTheDocument();
  });
});
