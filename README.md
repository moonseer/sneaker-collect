# Sneaker Collect Plus
A sneaker collection app that will allow me to add, view, and edit sneakers in my collection.
The app will have intuitive search and filter functionality.

## What can it do
- Add a sneaker to the collection
    - add sneaker by sku number, common name
    - search a common sneaker database to obtain details about sneaker (ie api)
    - use OpenAI GPT-4 Turbo to automatically find sneaker details by SKU
- View all sneakers in the collection
- Edit a sneaker in the collection
    - manually update sneaker details
    - automatically update information using OpenAI GPT-4 Turbo by SKU lookup
- Delete a sneaker from the collection
- Search for a sneaker in the collection
- Filter the sneakers in the collection by brand, model, colorway, size, etc.
- Sort the sneakers in the collection by name, brand, model, colorway, size, etc.
- Add a sneaker to the wishlist
- View all sneakers in the wishlist
- Delete a sneaker from the wishlist
- Be able to view rich infomatics about my collection like total value of collection, most valuable sneakers, etc.

## UI/UX Design
- **Dashboard**: Main landing page showing collection overview, stats, and quick access to features
- **Collection View**: Grid/list view of all sneakers with image thumbnails and key details
- **Detail View**: Expanded view of a single sneaker with all information and actions
- **Add/Edit Form**: Intuitive form for adding or editing sneaker details
- **Search & Filter Panel**: Easy-to-use controls for finding specific sneakers
- **Wishlist Section**: Similar to collection view but for desired sneakers
- **Analytics Dashboard**: Visual representation of collection statistics
- **Responsive Design**: Optimized for both desktop and mobile experiences

## Architecture

### Component Diagram
The following diagram shows the main components of the application and their relationships:

```mermaid
graph TD
    A[App] --> B[Layout]
    B --> C[Navbar]
    B --> D[Pages]
    D --> E[Dashboard]
    D --> F[Collection]
    D --> G[Wishlist]
    D --> H[Add/Edit Forms]
    
    F --> I[SneakerList]
    I --> J[SneakerCard]
    F --> K[FilterPanel]
    F --> L[SortOptions]
    
    H --> M[SneakerForm]
    M --> N[SneakerSearch]
    
    E --> O[AnalyticsPanel]
    E --> P[StatCards]
    
    G --> Q[WishlistItems]
    
    N --> R[LLM API]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:1px
    style R fill:#bfb,stroke:#333,stroke-width:2px
```

### Data Flow Diagram
This diagram illustrates how data flows through the application:

```mermaid
flowchart TD
    User([User]) <--> UI[User Interface]
    UI <--> Auth[Authentication]
    Auth <--> DB[(Supabase Database)]
    
    UI --> AddForm[Add Sneaker Form]
    UI --> EditForm[Edit Sneaker Form]
    UI --> Collection[Collection View]
    UI --> Wishlist[Wishlist View]
    UI --> Dashboard[Analytics Dashboard]
    
    AddForm --> SKULookup[SKU Lookup]
    EditForm --> SKULookup
    SKULookup --> LLMAPI[OpenAI GPT-4 API]
    LLMAPI --> SneakerData[Sneaker Data]
    
    AddForm --> DB
    EditForm --> DB
    Collection --> DB
    Wishlist --> DB
    Dashboard --> DB
    
    DB --> Stats[Statistics Processing]
    Stats --> Dashboard
    
    style User fill:#f96,stroke:#333,stroke-width:2px
    style LLMAPI fill:#bfb,stroke:#333,stroke-width:2px
    style DB fill:#69f,stroke:#333,stroke-width:2px
```

### Entity Relationship Diagram
This diagram shows the data model of the application:

```mermaid
erDiagram
    USER ||--o{ SNEAKER : owns
    USER ||--o{ WISHLIST_ITEM : wants
    
    USER {
        string id PK
        string email
        string name
        datetime created_at
        datetime last_login
    }
    
    SNEAKER {
        string id PK
        string user_id FK
        string brand
        string model
        string name
        string colorway
        float size
        string condition
        string sku
        float retail_price
        float market_value
        date purchase_date
        float purchase_price
        string purchase_location
        string notes
        string image_url
        boolean is_wishlist
        datetime created_at
        datetime updated_at
    }
    
    WISHLIST_ITEM {
        string id PK
        string user_id FK
        string brand
        string model
        string name
        string colorway
        float size
        string sku
        float retail_price
        float market_value
        datetime created_at
    }
```

## Future Design
- Use AI to make recommendations of new sneakers based on what I have in my collection
    - pull data about upcoming sneakers 
    - create mini blog about upcoming sneakers
- Make application optimized for mobile
- Add social features to share collection highlights
- Implement price tracking and value history

## Tech Stack
- Next.js
- Tailwind CSS
- Shadcn UI
- Supabase
- Stripe
- Sneaker APIs (StockX, GOAT, or similar for data)
- Jest and React Testing Library for testing

## Development Roadmap
1. Set up project structure and tech stack
2. Create database schema and API endpoints
3. Implement core UI components
4. Build CRUD functionality for sneaker management
5. Implement search, filter, and sort features
6. Add wishlist functionality
7. Develop analytics dashboard
8. Polish UI/UX and responsive design
9. Testing and bug fixes
10. Deployment

## Testing
The application includes a comprehensive test suite using Jest and React Testing Library. Tests cover:
- Utility functions
- Schema validation
- Component rendering and interactions
- API integration

To run the tests:
```bash
npm test
```

To run tests with coverage report:
```bash
npm test -- --coverage
```


