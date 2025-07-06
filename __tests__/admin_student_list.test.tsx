import { render, screen } from '@testing-library/react';
import Page from '../src/app/admin/student/list/page';

describe('Student List page', () => {
  it('renders heading', () => {
    render(<Page />);
    expect(screen.getByText('Student List')).toBeInTheDocument();
  });
});
