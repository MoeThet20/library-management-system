import { render, screen } from '@testing-library/react';
import Page from '../src/app/admin/teacher/update/page';

describe('Teacher Update page', () => {
  it('renders heading', () => {
    render(<Page />);
    expect(screen.getByText('Teacher Update')).toBeInTheDocument();
  });
});
