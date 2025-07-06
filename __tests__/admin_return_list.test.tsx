import { render, screen } from '@testing-library/react';
import Page from '../src/app/admin/return/list/page';

describe('Return List page', () => {
  it('renders heading', () => {
    render(<Page />);
    expect(screen.getByText('Return List')).toBeInTheDocument();
  });
});
