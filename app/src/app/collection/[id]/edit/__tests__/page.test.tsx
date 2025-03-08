import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditSneakerPage from '../page';
import { getSneakerById, updateSneaker } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

// Mock the supabase functions
jest.mock('@/lib/supabase');

// Increase the default timeout for all tests
jest.setTimeout(15000);

describe('EditSneakerPage', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockParams = {
    id: '123',
  };

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    // The router is already mocked in jest.setup.js
  });

  it('renders the edit sneaker form with loaded data', async () => {
    // Mock the getSneakerById function to return a specific sneaker
    (getSneakerById as jest.Mock).mockResolvedValueOnce({
      id: '123',
      user_id: 'user123',
      brand: 'Nike',
      model: 'Air Jordan 1',
      name: 'Chicago',
      colorway: 'Red/White/Black',
      size: 10,
      condition: 'new',
      sku: 'CW2288-111',
      retail_price: 170,
      market_value: 1500,
      purchase_date: new Date('2023-01-15'),
      purchase_price: 170,
      purchase_location: 'Nike Store',
      notes: 'Grail sneaker',
      is_wishlist: false,
    });

    await act(async () => {
      render(<EditSneakerPage params={mockParams} />);
    });

    // Check that getSneakerById was called with the correct ID
    expect(getSneakerById).toHaveBeenCalledWith('123');

    // Check that the page title is rendered
    await waitFor(() => {
      const heading = screen.getByText('Edit Sneaker');
      expect(heading).toBeInTheDocument();
    });

    // Check that the form fields are populated with the sneaker data
    await waitFor(() => {
      expect((screen.getByLabelText(/Brand/i) as HTMLSelectElement).value).toBe('Nike');
      expect((screen.getByLabelText(/Model/i) as HTMLInputElement).value).toBe('Air Jordan 1');
      expect((screen.getByLabelText(/Name\/Colorway/i) as HTMLInputElement).value).toBe('Chicago');
      expect((screen.getByLabelText(/Colorway Description/i) as HTMLInputElement).value).toBe('Red/White/Black');
      expect((screen.getByLabelText(/Size/i) as HTMLInputElement).value).toBe('10');
      expect((screen.getByLabelText(/Condition/i) as HTMLSelectElement).value).toBe('new');
      expect((screen.getByLabelText(/SKU Number/i) as HTMLInputElement).value).toBe('CW2288-111');
    });
  });

  it('allows editing the form and submitting', async () => {
    // Mock the getSneakerById function to return a specific sneaker
    (getSneakerById as jest.Mock).mockResolvedValueOnce({
      id: '123',
      user_id: 'user123',
      brand: 'Nike',
      model: 'Air Jordan 1',
      name: 'Chicago',
      colorway: 'Red/White/Black',
      size: 10,
      condition: 'new',
      sku: 'CW2288-111',
      retail_price: 170,
      market_value: 1500,
      purchase_date: new Date('2023-01-15'),
      purchase_price: 170,
      purchase_location: 'Nike Store',
      notes: 'Grail sneaker',
      is_wishlist: false,
    });

    await act(async () => {
      render(<EditSneakerPage params={mockParams} />);
    });

    // Wait for the form to be populated
    await waitFor(() => {
      expect((screen.getByLabelText(/Brand/i) as HTMLSelectElement).value).toBe('Nike');
    });

    // Edit the form
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Model/i), { target: { value: 'Air Jordan 1 High OG' } });
      fireEvent.change(screen.getByLabelText(/Name\/Colorway/i), { target: { value: 'Chicago 2015' } });
      fireEvent.change(screen.getByLabelText(/Market Value/i), { target: { value: '2000' } });
    });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /Save Changes/i });
    
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Check that updateSneaker was called with the correct data
    await waitFor(() => {
      expect(updateSneaker).toHaveBeenCalledWith('123', expect.objectContaining({
        model: 'Air Jordan 1 High OG',
        name: 'Chicago 2015',
        market_value: 2000,
      }));
    });

    // Check that the router was called to navigate to the sneaker detail page
    expect(mockRouter.push).toHaveBeenCalledWith('/collection/123');
  });

  it('handles not found state', async () => {
    // Mock the getSneakerById function to return null
    (getSneakerById as jest.Mock).mockResolvedValueOnce(null);

    await act(async () => {
      render(<EditSneakerPage params={mockParams} />);
    });

    // Check that the not found message is displayed
    await waitFor(() => {
      const notFoundHeading = screen.getByText('Sneaker Not Found');
      expect(notFoundHeading).toBeInTheDocument();
    });

    // Check that the back button is rendered
    const backButton = screen.getByRole('button', { name: /Back to Collection/i });
    expect(backButton).toBeInTheDocument();
  });

  it('handles loading state', async () => {
    // Delay the resolution of getSneakerById
    (getSneakerById as jest.Mock).mockImplementationOnce(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            id: '123',
            user_id: 'user123',
            brand: 'Nike',
            model: 'Air Jordan 1',
            name: 'Chicago',
            colorway: 'Red/White/Black',
            size: 10,
            condition: 'new',
          });
        }, 100);
      });
    });

    await act(async () => {
      render(<EditSneakerPage params={mockParams} />);
    });

    // Check that the loading message is displayed
    expect(screen.getByText('Loading sneaker details...')).toBeInTheDocument();
  });
}); 