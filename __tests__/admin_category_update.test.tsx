import { render, screen } from '@testing-library/react';
import Page from '../src/app/admin/category/update/page';

describe('Category Update page', () => {
  it('renders heading', () => {
    render(<Page />);
    expect(screen.getByText('Category Update')).toBeInTheDocument();
  });
});
