import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import this to fix the TypeScript errors
import SneakerDetailPage from '../page';
import { getSneakerById, deleteSneaker } from '@/lib/supabase';

// Mock the supabase functions and next/navigation
jest.mock('@/lib/supabase');
jest.mock('next/navigation');

// Mock the window.confirm method
window.confirm = jest.fn();

// Increase the default timeout for all tests
jest.setTimeout(15000);

describe('SneakerDetailPage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Default mock for confirm
    (window.confirm as jest.Mock).mockReturnValue(true);
  });

  it('renders sneaker details when found', async () => {
    // Mock the getSneakerById function to return a sneaker
    (getSneakerById as jest.Mock).mockResolvedValue({
      id: '1',
      user_id: 'user123',
      brand: 'Nike',
      model: 'Air Jordan 1',
      name: 'Chicago',
      colorway: 'Red/White/Black',
      size: 10,
      retail_price: 170,
      market_value: 1500,
      condition: 'new',
      purchase_date: '2023-01-15',
      purchase_price: 170,
      purchase_location: 'Nike Store',
      notes: 'Grail sneaker',
      is_wishlist: false,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await act(async () => {
      render(<SneakerDetailPage params={{ id: '1' }} />);
    });

    // Check that the sneaker details are rendered
    await waitFor(() => {
      // First check that loading state is gone
      expect(screen.queryByText('Loading sneaker details...')).not.toBeInTheDocument();
      
      // Then check for the sneaker details
      const brandModelHeading = screen.getByText(/Nike Air Jordan 1/i);
      expect(brandModelHeading).toBeInTheDocument();
    });
    
    // Check for other details
    const nameElement = screen.getByText('Chicago');
    expect(nameElement).toBeInTheDocument();
    
    const colorwayElement = screen.getByText('Red/White/Black');
    expect(colorwayElement).toBeInTheDocument();
    
    const sizeElement = screen.getByText(/US 10/i);
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
      // First check that loading state is gone
      expect(screen.queryByText('Loading sneaker details...')).not.toBeInTheDocument();
      
      // Then check for the not found heading
      const notFoundHeading = screen.getByText('Sneaker Not Found');
      expect(notFoundHeading).toBeInTheDocument();
    });
    
    // Check for the not found message
    const notFoundMessage = screen.getByText(/The sneaker you're looking for could not be found/i);
    expect(notFoundMessage).toBeInTheDocument();
  });

  it('calls deleteSneaker and redirects when delete button is clicked', async () => {
    // Mock the getSneakerById function to return a sneaker
    (getSneakerById as jest.Mock).mockResolvedValue({
      id: '1',
      user_id: 'user123',
      brand: 'Nike',
      model: 'Air Jordan 1',
      name: 'Chicago',
      colorway: 'Red/White/Black',
      size: 10,
      condition: 'new',
      created_at: new Date(),
      updated_at: new Date(),
      is_wishlist: false,
    });

    // Mock the deleteSneaker function to return true
    (deleteSneaker as jest.Mock).mockResolvedValue(true);

    // Mock the router
    const mockPush = jest.fn();
    (global.useRouterMock as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    });

    await act(async () => {
      render(<SneakerDetailPage params={{ id: '1' }} />);
    });

    // Wait for the component to finish rendering
    await waitFor(() => {
      expect(screen.queryByText('Loading sneaker details...')).not.toBeInTheDocument();
    });

    // Find and click the delete button
    const deleteButton = screen.getByRole('button', { name: /Delete/i });
    
    await act(async () => {
      fireEvent.click(deleteButton);
    });

    // Check that confirm was called
    expect(window.confirm).toHaveBeenCalled();
    
    // Check that deleteSneaker was called with the correct ID
    expect(deleteSneaker).toHaveBeenCalledWith('1');
    
    // Check that router.push was called to redirect
    expect(mockPush).toHaveBeenCalledWith('/collection');
  });
}); 