import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter, usePathname } from 'next/navigation';
import Navigation from '../../app/components/Navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('Navigation Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: mockPush,
    } as any);
  });

  it('should render all navigation items', () => {
    mockUsePathname.mockReturnValue('/');

    render(<Navigation />);

    expect(screen.getByText('Full Stack Assessment')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Numbers')).toBeInTheDocument();
    expect(screen.getByText('Grades')).toBeInTheDocument();
  });

  it('should highlight the current active route', () => {
    mockUsePathname.mockReturnValue('/numbers');

    render(<Navigation />);

    const numbersButton = screen.getByText('Numbers');
    const homeButton = screen.getByText('Home');

    expect(numbersButton.closest('button')).toHaveClass('MuiButton-outlined');
    expect(homeButton.closest('button')).toHaveClass('MuiButton-text');
  });

  it('should navigate to home when Home button is clicked', async () => {
    mockUsePathname.mockReturnValue('/numbers');
    const user = userEvent.setup();

    render(<Navigation />);

    const homeButton = screen.getByText('Home');
    await user.click(homeButton);

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('should navigate to numbers when Numbers button is clicked', async () => {
    mockUsePathname.mockReturnValue('/');
    const user = userEvent.setup();

    render(<Navigation />);

    const numbersButton = screen.getByText('Numbers');
    await user.click(numbersButton);

    expect(mockPush).toHaveBeenCalledWith('/numbers');
  });

  it('should navigate to grades when Grades button is clicked', async () => {
    mockUsePathname.mockReturnValue('/');
    const user = userEvent.setup();

    render(<Navigation />);

    const gradesButton = screen.getByText('Grades');
    await user.click(gradesButton);

    expect(mockPush).toHaveBeenCalledWith('/grades');
  });

  it('should highlight home route correctly', () => {
    mockUsePathname.mockReturnValue('/');

    render(<Navigation />);

    const homeButton = screen.getByText('Home');
    const numbersButton = screen.getByText('Numbers');
    const gradesButton = screen.getByText('Grades');

    expect(homeButton.closest('button')).toHaveClass('MuiButton-outlined');
    expect(numbersButton.closest('button')).toHaveClass('MuiButton-text');
    expect(gradesButton.closest('button')).toHaveClass('MuiButton-text');
  });

  it('should highlight grades route correctly', () => {
    mockUsePathname.mockReturnValue('/grades');

    render(<Navigation />);

    const homeButton = screen.getByText('Home');
    const numbersButton = screen.getByText('Numbers');
    const gradesButton = screen.getByText('Grades');

    expect(homeButton.closest('button')).toHaveClass('MuiButton-text');
    expect(numbersButton.closest('button')).toHaveClass('MuiButton-text');
    expect(gradesButton.closest('button')).toHaveClass('MuiButton-outlined');
  });
});
