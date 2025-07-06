import { render, screen } from '@testing-library/react';
import Page from '../src/app/admin/teacher/create/page';

describe('Teacher Create page', () => {
  it('renders heading', () => {
    render(<Page />);
    expect(screen.getByText('Teacher Create')).toBeInTheDocument();
  });
});
