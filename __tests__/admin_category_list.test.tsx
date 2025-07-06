import { render, screen } from '@testing-library/react';
import Page from '../src/app/admin/category/list/page';

describe('Category List page', () => {
  it('renders heading', () => {
    render(<Page />);
    expect(screen.getByText('Category List')).toBeInTheDocument();
  });
});
