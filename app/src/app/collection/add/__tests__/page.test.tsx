import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddSneakerPage from '../page';
import { createSneaker } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

// Mock the supabase functions
jest.mock('@/lib/supabase');

// Mock the SneakerSearch component
jest.mock('@/components/sneakers/SneakerSearch', () => {
  return function MockSneakerSearch({ onSelect }: { onSelect: (sneaker: any) => void }) {
    return (
      <div data-testid="sneaker-search">
        <button 
          onClick={() => onSelect({
            brand: 'Nike',
            model: 'Dunk Low',
            name: 'Panda',
            colorway: 'Black/White',
            sku: 'DD1391-100',
            size: 10,
            retail_price: 110,
          })}
        >
          Select Sneaker
        </button>
      </div>
    );
  };
});

// Increase the default timeout for all tests
jest.setTimeout(30000);

describe('AddSneakerPage', () => {
  // Get the mocked router from jest.setup.js
  let mockRouter: any;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Get the global router mock
    mockRouter = {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    };
    
    // Set up the global router mock
    (global.useRouterMock as jest.Mock).mockReturnValue(mockRouter);
    
    // Mock window.alert
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore all mocks
    jest.restoreAllMocks();
  });

  it('renders the add sneaker form', async () => {
    await act(async () => {
      render(<AddSneakerPage />);
    });

    // Check that the page title is rendered
    const heading = screen.getByText('Add Sneaker');
    expect(heading).toBeInTheDocument();

    // Check that the form fields are rendered
    expect(screen.getByLabelText(/Brand/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Model/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name\/Colorway Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Colorway Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Size/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Condition/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/SKU Number/i)).toBeInTheDocument();

    // Check that the search section is rendered
    expect(screen.getByText('Search for a Sneaker')).toBeInTheDocument();
  });

  it('allows filling out the form and submitting', async () => {
    await act(async () => {
      render(<AddSneakerPage />);
    });

    // Fill out the form
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Brand/i), { target: { value: 'Nike' } });
      fireEvent.change(screen.getByLabelText(/Model/i), { target: { value: 'Air Jordan 1' } });
      fireEvent.change(screen.getByLabelText(/Name\/Colorway Name/i), { target: { value: 'Chicago' } });
      fireEvent.change(screen.getByLabelText(/Colorway Description/i), { target: { value: 'Red/White/Black' } });
      fireEvent.change(screen.getByLabelText(/Size/i), { target: { value: '12' } });
      fireEvent.change(screen.getByLabelText(/Condition/i), { target: { value: 'new' } });
      fireEvent.change(screen.getByLabelText(/SKU Number/i), { target: { value: 'CW2288-111' } });
    });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /Add to Collection/i });
    
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Check that createSneaker was called with the correct data
    await waitFor(() => {
      expect(createSneaker).toHaveBeenCalledWith(expect.objectContaining({
        brand: 'Nike',
        model: 'Air Jordan 1',
        name: 'Chicago',
        colorway: 'Red/White/Black',
        size: 12,
        condition: 'new',
        sku: 'CW2288-111',
        user_id: 'user123',
      }));
    });

    // Check that the router was called to navigate to the collection page
    expect(mockRouter.push).toHaveBeenCalledWith('/collection');
  });

  it('handles form validation', async () => {
    await act(async () => {
      render(<AddSneakerPage />);
    });

    // Try to submit the form without filling required fields
    const submitButton = screen.getByRole('button', { name: /Add to Collection/i });
    
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Check that the alert was called
    expect(window.alert).toHaveBeenCalledWith('Please fill in all required fields');
    
    // Check that createSneaker was not called
    expect(createSneaker).not.toHaveBeenCalled();
  });

  it('handles sneaker search selection', async () => {
    await act(async () => {
      render(<AddSneakerPage />);
    });

    // Find and click the select sneaker button
    const selectButton = screen.getByText('Select Sneaker');
    
    await act(async () => {
      fireEvent.click(selectButton);
    });

    // Check that the form was filled with the selected sneaker data
    await waitFor(() => {
      expect((screen.getByLabelText(/Brand/i) as HTMLSelectElement).value).toBe('Nike');
      expect((screen.getByLabelText(/Model/i) as HTMLInputElement).value).toBe('Dunk Low');
      expect((screen.getByLabelText(/Name\/Colorway Name/i) as HTMLInputElement).value).toBe('Panda');
      expect((screen.getByLabelText(/Colorway Description/i) as HTMLInputElement).value).toBe('Black/White');
      expect((screen.getByLabelText(/SKU Number/i) as HTMLInputElement).value).toBe('DD1391-100');
    });
  });
}); 