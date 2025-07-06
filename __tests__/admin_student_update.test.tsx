import { render, screen } from '@testing-library/react';
import Page from '../src/app/admin/student/update/page';

describe('Student Update page', () => {
  it('renders heading', () => {
    render(<Page />);
    expect(screen.getByText('Student Update')).toBeInTheDocument();
  });
});
