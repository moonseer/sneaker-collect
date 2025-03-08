import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import SneakerDetailPage from '../page';
import { getSneakerById, deleteSneaker } from '@/lib/supabase';

// Mock the supabase functions and next/navigation
jest.mock('@/lib/supabase');
jest.mock('next/navigation');

describe('SneakerDetailPage', () => {
  const mockRouter = {
    push: jest.fn(),
  };
  
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    // No need to mock useRouter here as it's done in jest.setup.js
  });

  it('renders loading state initially', () => {
    render(<SneakerDetailPage params={{ id: '1' }} />);
    expect(screen.getByText('Loading sneaker details...')).toBeInTheDocument();
  });

  it('renders not found state when sneaker is not found', async () => {
    // Mock the getSneakerById function to return null
    (getSneakerById as jest.Mock).mockResolvedValueOnce(null);

    render(<SneakerDetailPage params={{ id: '1' }} />);

    // Wait for the loading state to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading sneaker details...')).not.toBeInTheDocument();
    });

    // Check that the not found state is rendered
    expect(screen.getByText('Sneaker Not Found')).toBeInTheDocument();
    expect(screen.getByText('The sneaker you\'re looking for could not be found.')).toBeInTheDocument();
  });

  it('renders sneaker details when found', async () => {
    // Mock the getSneakerById function to return a sneaker
    (getSneakerById as jest.Mock).mockResolvedValueOnce({
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
    });

    await act(async () => {
      render(<SneakerDetailPage params={{ id: '1' }} />);
    });

    // Wait for the loading state to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading sneaker details...')).not.toBeInTheDocument();
    });

    // Check that the sneaker details are rendered
    expect(screen.getByText(/Nike Air Jordan 1/i)).toBeInTheDocument();
    expect(screen.getByText('Chicago')).toBeInTheDocument();
    expect(screen.getByText('Red/White/Black')).toBeInTheDocument();
    expect(screen.getByText(/US 10/i)).toBeInTheDocument();
  });

  it('calls deleteSneaker and redirects when delete button is clicked', async () => {
    // Mock window.confirm to return true
    global.confirm = jest.fn().mockReturnValue(true);
    
    // Mock the getSneakerById function to return a sneaker
    (getSneakerById as jest.Mock).mockResolvedValueOnce({
      id: '1',
      user_id: 'user123',
      brand: 'Nike',
      model: 'Air Jordan 1',
      name: 'Chicago',
    });

    // Mock the deleteSneaker function to return true
    (deleteSneaker as jest.Mock).mockResolvedValueOnce(true);

    await act(async () => {
      render(<SneakerDetailPage params={{ id: '1' }} />);
    });

    // Wait for the loading state to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading sneaker details...')).not.toBeInTheDocument();
    });

    // Click the delete button
    await act(async () => {
      fireEvent.click(screen.getByText('Delete'));
    });

    // Check that deleteSneaker was called with the correct ID
    expect(deleteSneaker).toHaveBeenCalledWith('1');
  });
}); 