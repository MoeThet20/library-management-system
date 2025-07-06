import { render, screen } from '@testing-library/react';
import Page from '../src/app/admin/student/create/page';

describe('Student Register page', () => {
  it('renders heading', () => {
    render(<Page />);
    expect(screen.getByText('Student Register')).toBeInTheDocument();
  });
});
