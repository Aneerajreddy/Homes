# FAMILY TENANT APPLICATION - JAVA FULL-STACK REQUIREMENTS

## PROJECT OVERVIEW
Build a comprehensive family tenant application for property rentals using Java Spring Boot backend and React frontend with complete CRUD operations, authentication, and payment integration.

## TECHNOLOGY STACK

### Backend Technologies
- **Framework**: Spring Boot 3.x
- **Database**: PostgreSQL with JPA/Hibernate
- **Security**: Spring Security with JWT authentication
- **Payment**: Razorpay/Stripe integration
- **File Storage**: AWS S3 or local file system
- **Email**: Spring Mail with SMTP
- **Documentation**: Swagger/OpenAPI 3
- **Testing**: JUnit 5, Mockito, TestContainers
- **Build Tool**: Maven or Gradle

### Frontend Technologies
- **Framework**: React 18+ with TypeScript
- **State Management**: Redux Toolkit or Context API
- **Routing**: React Router v6
- **UI Library**: Material-UI or Ant Design
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form with Yup validation
- **Styling**: Tailwind CSS or Styled Components
- **Testing**: Jest, React Testing Library

## DATABASE SCHEMA

### Core Entities

```sql
-- Users Table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    family_size INTEGER,
    preferred_budget_min DECIMAL(10,2),
    preferred_budget_max DECIMAL(10,2),
    preferred_locations TEXT[],
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Properties Table
CREATE TABLE properties (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    property_type VARCHAR(50) NOT NULL, -- APARTMENT, VILLA, HOUSE
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    area_sqft INTEGER NOT NULL,
    floor_number INTEGER,
    total_floors INTEGER,
    rent_amount DECIMAL(10,2) NOT NULL,
    security_deposit DECIMAL(10,2) NOT NULL,
    maintenance_charges DECIMAL(10,2),
    furniture_cost DECIMAL(10,2) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    owner_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- Property Images Table
CREATE TABLE property_images (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    image_type VARCHAR(50), -- MAIN, BEDROOM, KITCHEN, BATHROOM, etc.
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- Property Amenities Table
CREATE TABLE property_amenities (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT NOT NULL,
    amenity_category VARCHAR(100) NOT NULL, -- BUILDING, FURNITURE, KITCHEN, ELECTRONICS
    amenity_name VARCHAR(100) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- Bookings Table
CREATE TABLE bookings (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT NOT NULL,
    tenant_id BIGINT NOT NULL,
    owner_id BIGINT NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    move_in_date DATE NOT NULL,
    lease_duration_months INTEGER NOT NULL,
    monthly_rent DECIMAL(10,2) NOT NULL,
    security_deposit DECIMAL(10,2) NOT NULL,
    furniture_cost DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    advance_paid DECIMAL(10,2) NOT NULL,
    booking_status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, CONFIRMED, ACTIVE, COMPLETED, CANCELLED
    payment_status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, PARTIAL, COMPLETED
    agreement_signed BOOLEAN DEFAULT FALSE,
    furniture_delivered BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (tenant_id) REFERENCES users(id),
    FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- Payments Table
CREATE TABLE payments (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL,
    payment_type VARCHAR(50) NOT NULL, -- ADVANCE, MONTHLY_RENT, SECURITY_DEPOSIT
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50), -- CARD, UPI, NET_BANKING
    payment_gateway_id VARCHAR(255),
    payment_status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, SUCCESS, FAILED, REFUNDED
    payment_date TIMESTAMP,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- Favorites Table
CREATE TABLE user_favorites (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    property_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (property_id) REFERENCES properties(id),
    UNIQUE(user_id, property_id)
);

-- Property Views Table
CREATE TABLE property_views (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    property_id BIGINT NOT NULL,
    view_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- Maintenance Requests Table
CREATE TABLE maintenance_requests (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL,
    request_type VARCHAR(100) NOT NULL, -- PLUMBING, ELECTRICAL, FURNITURE, etc.
    description TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'MEDIUM', -- LOW, MEDIUM, HIGH, URGENT
    status VARCHAR(50) DEFAULT 'OPEN', -- OPEN, IN_PROGRESS, RESOLVED, CLOSED
    requested_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_date TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
```

## BACKEND API ENDPOINTS

### Authentication APIs
```java
POST /api/auth/register - User registration
POST /api/auth/login - User login
POST /api/auth/logout - User logout
POST /api/auth/refresh-token - Refresh JWT token
POST /api/auth/forgot-password - Password reset request
POST /api/auth/reset-password - Reset password with token
POST /api/auth/verify-email - Email verification
POST /api/auth/verify-phone - Phone verification
```

### User Management APIs
```java
GET /api/users/profile - Get user profile
PUT /api/users/profile - Update user profile
PUT /api/users/preferences - Update search preferences
GET /api/users/booking-history - Get user's booking history
POST /api/users/upload-documents - Upload verification documents
```

### Property Search APIs
```java
GET /api/properties/search - Search properties with filters
GET /api/properties/{id} - Get property details
GET /api/properties/featured - Get featured properties
GET /api/properties/recommendations - Get personalized recommendations
GET /api/properties/nearby - Get properties near location
POST /api/properties/{id}/schedule-visit - Schedule property visit
```

### Favorites APIs
```java
GET /api/favorites - Get user's favorite properties
POST /api/favorites/{propertyId} - Add property to favorites
DELETE /api/favorites/{propertyId} - Remove from favorites
```

### Booking APIs
```java
POST /api/bookings/create - Create new booking
GET /api/bookings/{id} - Get booking details
PUT /api/bookings/{id}/confirm - Confirm booking
GET /api/bookings/active - Get active bookings
POST /api/bookings/{id}/cancel - Cancel booking
```

### Payment APIs
```java
POST /api/payments/create-order - Create payment order
POST /api/payments/verify - Verify payment
GET /api/payments/history - Get payment history
POST /api/payments/refund - Request refund
```

### Maintenance APIs
```java
POST /api/maintenance/request - Create maintenance request
GET /api/maintenance/requests - Get user's maintenance requests
PUT /api/maintenance/{id}/update - Update request status
```

## BACKEND IMPLEMENTATION

### Main Application Class
```java
@SpringBootApplication
@EnableJpaRepositories
@EnableScheduling
public class TenantApplication {
    public static void main(String[] args) {
        SpringApplication.run(TenantApplication.class, args);
    }
}
```

### Security Configuration
```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/api/properties/search", "/api/properties/{id}").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
```

### Entity Classes
```java
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(name = "first_name", nullable = false)
    private String firstName;
    
    @Column(name = "last_name", nullable = false)
    private String lastName;
    
    @Column(unique = true, nullable = false)
    private String phone;
    
    @Column(name = "family_size")
    private Integer familySize;
    
    @Column(name = "preferred_budget_min")
    private BigDecimal preferredBudgetMin;
    
    @Column(name = "preferred_budget_max")
    private BigDecimal preferredBudgetMax;
    
    @ElementCollection
    @CollectionTable(name = "user_preferred_locations")
    private List<String> preferredLocations;
    
    @Column(name = "is_verified")
    private Boolean isVerified = false;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
```

### Service Layer
```java
@Service
@Transactional
public class PropertyService {
    
    @Autowired
    private PropertyRepository propertyRepository;
    
    public Page<PropertyDTO> searchProperties(PropertySearchCriteria criteria, Pageable pageable) {
        Specification<Property> spec = PropertySpecification.withCriteria(criteria);
        Page<Property> properties = propertyRepository.findAll(spec, pageable);
        return properties.map(this::convertToDTO);
    }
    
    public PropertyDetailDTO getPropertyDetails(Long propertyId) {
        Property property = propertyRepository.findById(propertyId)
            .orElseThrow(() -> new PropertyNotFoundException("Property not found"));
        return convertToDetailDTO(property);
    }
}
```

### Repository Layer
```java
@Repository
public interface PropertyRepository extends JpaRepository<Property, Long>, JpaSpecificationExecutor<Property> {
    
    @Query("SELECT p FROM Property p WHERE p.isAvailable = true AND p.isVerified = true")
    Page<Property> findAvailableProperties(Pageable pageable);
    
    @Query("SELECT p FROM Property p WHERE p.city = :city AND p.rentAmount BETWEEN :minRent AND :maxRent")
    List<Property> findByCityAndRentRange(@Param("city") String city, 
                                         @Param("minRent") BigDecimal minRent, 
                                         @Param("maxRent") BigDecimal maxRent);
}
```

## FRONTEND IMPLEMENTATION

### Main App Component
```typescript
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/search" element={<PropertySearchPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}
```

### Redux Store Setup
```typescript
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    properties: propertiesSlice.reducer,
    bookings: bookingsSlice.reducer,
    favorites: favoritesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
```

### API Service Layer
```typescript
class PropertyService {
  private baseURL = '/api/properties';

  async searchProperties(criteria: PropertySearchCriteria): Promise<PropertySearchResponse> {
    const response = await axios.get(`${this.baseURL}/search`, { params: criteria });
    return response.data;
  }

  async getPropertyDetails(id: number): Promise<PropertyDetail> {
    const response = await axios.get(`${this.baseURL}/${id}`);
    return response.data;
  }

  async scheduleVisit(propertyId: number, visitData: VisitRequest): Promise<void> {
    await axios.post(`${this.baseURL}/${propertyId}/schedule-visit`, visitData);
  }
}
```

## DEPLOYMENT REQUIREMENTS

### Backend Deployment
- **Container**: Docker with multi-stage build
- **Database**: PostgreSQL 14+ with connection pooling
- **Cache**: Redis for session management and caching
- **File Storage**: AWS S3 for property images and documents
- **Monitoring**: Spring Boot Actuator with Micrometer
- **Logging**: Logback with structured logging

### Frontend Deployment
- **Build**: Create optimized production build
- **CDN**: CloudFront or similar for static assets
- **Environment**: Environment-specific configuration
- **PWA**: Service worker for offline capabilities

### Infrastructure
- **Load Balancer**: Application Load Balancer
- **Auto Scaling**: Based on CPU and memory metrics
- **SSL/TLS**: Certificate management
- **Backup**: Automated database backups
- **Monitoring**: CloudWatch or Prometheus + Grafana

## TESTING REQUIREMENTS

### Backend Testing
```java
@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
class PropertyServiceTest {
    
    @Autowired
    private PropertyService propertyService;
    
    @MockBean
    private PropertyRepository propertyRepository;
    
    @Test
    void shouldReturnPropertiesWhenSearchCriteriaProvided() {
        // Test implementation
    }
}
```

### Frontend Testing
```typescript
describe('PropertySearchPage', () => {
  test('should display search results', async () => {
    render(<PropertySearchPage />);
    // Test implementation
  });
});
```

## PERFORMANCE REQUIREMENTS
- **Response Time**: < 2 seconds for property search
- **Concurrent Users**: Support 1000+ concurrent users
- **Database**: Optimized queries with proper indexing
- **Caching**: Redis for frequently accessed data
- **Image Optimization**: WebP format with lazy loading

## SECURITY REQUIREMENTS
- **Authentication**: JWT with refresh token mechanism
- **Authorization**: Role-based access control
- **Data Validation**: Input validation on both frontend and backend
- **SQL Injection**: Use parameterized queries
- **XSS Protection**: Content Security Policy headers
- **HTTPS**: Enforce SSL/TLS encryption
- **Rate Limiting**: API rate limiting to prevent abuse

This comprehensive specification provides everything needed to build a production-ready Family Tenant Application with Java Spring Boot backend and React frontend.