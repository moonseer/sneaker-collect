// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock next/navigation
const useRouter = jest.fn();
useRouter.mockReturnValue({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
});

jest.mock('next/navigation', () => ({
  useRouter: () => useRouter.mockReturnValue(),
  usePathname: () => '',
  useParams: () => ({}),
}));

// Make the mock available globally
global.useRouterMock = useRouter;

// Mock the auth context
jest.mock('@/lib/auth', () => ({
  useAuth() {
    return {
      user: { id: 'user123' },
      loading: false,
      signIn: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
    };
  },
  AuthProvider: ({ children }) => children,
}));

// Mock the supabase client
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: jest.fn().mockReturnValue({ data: { subscription: { unsubscribe: jest.fn() } } }),
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
    },
  },
  getSneakers: jest.fn().mockResolvedValue([
    {
      id: '1',
      user_id: 'user123',
      brand: 'Nike',
      model: 'Air Jordan 1',
      name: 'Chicago',
      colorway: 'Red/White/Black',
      size: 10,
      condition: 'new',
      is_wishlist: false,
    },
  ]),
  getSneakerById: jest.fn().mockImplementation((id) => {
    return Promise.resolve({
      id,
      user_id: 'user123',
      brand: 'Nike',
      model: 'Air Jordan 1',
      name: 'Chicago',
      colorway: 'Red/White/Black',
      size: 10,
      condition: 'new',
      is_wishlist: false,
    });
  }),
  createSneaker: jest.fn().mockImplementation((data) => {
    return Promise.resolve({ ...data, id: '123' });
  }),
  updateSneaker: jest.fn().mockImplementation((id, data) => {
    return Promise.resolve({ ...data, id });
  }),
  deleteSneaker: jest.fn().mockResolvedValue(true),
  getCollectionStats: jest.fn().mockResolvedValue({
    total_sneakers: 3,
    total_value: 2000,
    average_value: 666.67,
    brands_distribution: { Nike: 2, Adidas: 1 },
    sizes_distribution: { '10': 2, '9.5': 1 },
    condition_distribution: { new: 2, good: 1 },
  }),
})); 