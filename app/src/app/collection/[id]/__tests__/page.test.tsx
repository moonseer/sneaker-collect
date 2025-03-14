import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import this to fix the TypeScript errors
import SneakerDetailPage from '../page';
import { getSneakerById, deleteSneaker } from '@/lib/supabase';
import { mockSneakers } from '@/lib/mock-data-test';

// Mock the supabase functions and next/navigation
jest.mock('@/lib/supabase');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the window.confirm method
window.confirm = jest.fn();

// Increase the default timeout for all tests
jest.setTimeout(30000);

describe('SneakerDetailPage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Default mock for confirm
    (window.confirm as jest.Mock).mockReturnValue(true);
  });

  it('renders sneaker details when found', async () => {
    // Use the first sneaker from our test data
    const testSneaker = mockSneakers[0];
    
    // Mock the getSneakerById function to return a sneaker
    (getSneakerById as jest.Mock).mockResolvedValue(testSneaker);

    await act(async () => {
      render(<SneakerDetailPage params={{ id: testSneaker.id }} />);
    });

    // Check that the sneaker details are rendered
    await waitFor(() => {
      // Check for the sneaker details
      const brandModelHeading = screen.getByText(`${testSneaker.brand} ${testSneaker.model}`);
      expect(brandModelHeading).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Check for other details
    const nameElement = screen.getByText(testSneaker.name);
    expect(nameElement).toBeInTheDocument();
    
    const colorwayElement = screen.getByText(testSneaker.colorway);
    expect(colorwayElement).toBeInTheDocument();
    
    const sizeElement = screen.getByText(`US ${testSneaker.size}`);
    expect(sizeElement).toBeInTheDocument();
  });

  it('renders not found state when sneaker is not found', async () => {
    // Mock the getSneakerById function to return null
    (getSneakerById as jest.Mock).mockResolvedValue(null);

    await act(async () => {
      render(<SneakerDetailPage params={{ id: '999' }} />);
    });

    // Check that the not found state is rendered
    await waitFor(() => {
      // Check for the not found heading
      const notFoundHeading = screen.getByText('Sneaker Not Found');
      expect(notFoundHeading).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Check for the not found message
    const notFoundMessage = screen.getByText(/The sneaker you're looking for could not be found/i);
    expect(notFoundMessage).toBeInTheDocument();
  });

  it('calls deleteSneaker and redirects when delete button is clicked', async () => {
    // Use the first sneaker from our test data
    const testSneaker = mockSneakers[0];
    
    // Mock the getSneakerById function to return a sneaker
    (getSneakerById as jest.Mock).mockResolvedValue(testSneaker);

    // Mock the deleteSneaker function to return true
    (deleteSneaker as jest.Mock).mockResolvedValue(true);

    // Mock the router
    const mockPush = jest.fn();
    const useRouterMock = jest.requireMock('next/navigation').useRouter;
    useRouterMock.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    });

    await act(async () => {
      render(<SneakerDetailPage params={{ id: testSneaker.id }} />);
    });

    // Wait for the component to finish rendering
    await waitFor(() => {
      const deleteButton = screen.getByRole('button', { name: /Delete/i });
      expect(deleteButton).toBeInTheDocument();
    }, { timeout: 5000 });

    // Find and click the delete button
    const deleteButton = screen.getByRole('button', { name: /Delete/i });
    
    await act(async () => {
      fireEvent.click(deleteButton);
    });

    // Check that confirm was called
    expect(window.confirm).toHaveBeenCalled();
    
    // Check that deleteSneaker was called with the correct ID
    expect(deleteSneaker).toHaveBeenCalledWith(testSneaker.id);
    
    // Check that router.push was called to redirect
    expect(mockPush).toHaveBeenCalledWith('/collection');
  }, 30000); // Add explicit timeout for this test
}); 