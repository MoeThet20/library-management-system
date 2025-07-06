import { render, screen } from '@testing-library/react';
import Page from '../src/app/admin/category/create/page';

describe('Category Create page', () => {
  it('renders heading', () => {
    render(<Page />);
    expect(screen.getByText('Category Create')).toBeInTheDocument();
  });
});
