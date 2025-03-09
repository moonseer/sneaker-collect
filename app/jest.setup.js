// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock next/navigation
const useRouterMock = jest.fn().mockReturnValue({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
});

jest.mock('next/navigation', () => ({
  useRouter: () => useRouterMock(),
  usePathname: () => '',
  useParams: () => ({}),
}));

// Make the mock available globally
global.useRouterMock = useRouterMock;

// Mock window.alert
const alertMock = jest.fn();
global.alert = alertMock;
global.alertMock = alertMock;

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
  getSneakersByIds: jest.fn().mockImplementation((ids) => {
    return Promise.resolve(ids.map(id => ({
      id,
      user_id: 'user123',
      brand: 'Nike',
      model: 'Air Jordan 1',
      name: 'Chicago',
      colorway: 'Red/White/Black',
      size: 10,
      condition: 'new',
      is_wishlist: false,
    })));
  }),
  createSneaker: jest.fn().mockImplementation((data) => {
    return Promise.resolve({ ...data, id: '123' });
  }),
  updateSneaker: jest.fn().mockImplementation((id, data) => {
    return Promise.resolve({ ...data, id });
  }),
  deleteSneaker: jest.fn().mockResolvedValue(true),
  getCollectionStats: jest.fn().mockResolvedValue({
    totalSneakers: 3,
    totalValue: 2000,
    averageValue: 666.67,
    brandDistribution: { Nike: 2, Adidas: 1 },
    sizeDistribution: { '10': 2, '9.5': 1 },
    mostValuableSneaker: {
      id: '1',
      brand: 'Nike',
      model: 'Air Jordan 1',
      name: 'Chicago',
      market_value: 1500,
    },
  }),
}));

// Mock the cache utility
jest.mock('@/lib/cache', () => {
  const mockCache = {
    set: jest.fn(),
    get: jest.fn(),
    has: jest.fn(),
    delete: jest.fn(),
    clear: jest.fn(),
    size: jest.fn(),
    keys: jest.fn(),
  };
  
  return {
    __esModule: true,
    default: mockCache,
    globalCache: mockCache,
    cachedQuery: jest.fn().mockImplementation((fn) => fn),
    clearCacheByPrefix: jest.fn(),
  };
});

// Mock the batch-loader utility
jest.mock('@/lib/batch-loader', () => {
  return {
    createBatchLoader: jest.fn().mockImplementation(({ batchLoadFn }) => ({
      load: jest.fn().mockImplementation(key => batchLoadFn([key]).then(results => results[0])),
      loadMany: jest.fn().mockImplementation(keys => batchLoadFn(keys)),
      clear: jest.fn(),
      clearAll: jest.fn(),
      prime: jest.fn(),
    })),
  };
});

// Mock the lazy-load utility
jest.mock('@/lib/lazy-load', () => {
  return {
    DashboardPage: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
    CollectionPage: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
    WishlistPage: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
    DesignSystemPage: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
    DesignTypographyPage: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
    DesignImagesPage: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
    DashboardLoading: jest.fn().mockImplementation(() => <div>Loading...</div>),
    CollectionLoading: jest.fn().mockImplementation(() => <div>Loading...</div>),
    WishlistLoading: jest.fn().mockImplementation(() => <div>Loading...</div>),
    DesignSystemLoading: jest.fn().mockImplementation(() => <div>Loading...</div>),
  };
});

// Mock the optimized-image component
jest.mock('@/components/ui/optimized-image', () => {
  return {
    OptimizedImage: jest.fn().mockImplementation(({ src, alt, ...props }) => (
      <img src={src} alt={alt} {...props} />
    )),
    LazyImage: jest.fn().mockImplementation(({ src, alt, ...props }) => (
      <img src={src} alt={alt} {...props} />
    )),
    BlurredImage: jest.fn().mockImplementation(({ src, alt, ...props }) => (
      <img src={src} alt={alt} {...props} />
    )),
    ProgressiveImage: jest.fn().mockImplementation(({ src, alt, ...props }) => (
      <img src={src} alt={alt} {...props} />
    )),
  };
});

// Mock the placeholder-image component
jest.mock('@/components/ui/placeholder-image', () => {
  return {
    PlaceholderImage: jest.fn().mockImplementation(({ text, ...props }) => (
      <div {...props}>{text || 'Image not available'}</div>
    )),
  };
});

// Mock the image-gallery component
jest.mock('@/components/ui/image-gallery', () => {
  return {
    ImageGallery: jest.fn().mockImplementation(({ images, ...props }) => (
      <div {...props}>
        {images.map((image, index) => (
          <img key={index} src={image.src} alt={image.alt} />
        ))}
      </div>
    )),
    SingleImageWithZoom: jest.fn().mockImplementation(({ src, alt, ...props }) => (
      <img src={src} alt={alt} {...props} />
    )),
  };
}); 