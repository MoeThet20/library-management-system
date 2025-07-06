import { render, screen } from '@testing-library/react';
import Page from '../src/app/admin/book/update/page';

describe('Book Update page', () => {
  it('renders heading', () => {
    render(<Page />);
    expect(screen.getByText('Book Update')).toBeInTheDocument();
  });
});
