import { render, screen } from '@testing-library/react';
import Page from '../src/app/admin/teacher/list/page';

describe('Teacher List page', () => {
  it('renders heading', () => {
    render(<Page />);
    expect(screen.getByText('Teacher List')).toBeInTheDocument();
  });
});
