# PROPERTY OWNER APPLICATION - JAVA FULL-STACK REQUIREMENTS

## PROJECT OVERVIEW
Build a comprehensive property owner application for managing rental properties using Java Spring Boot backend and React frontend with document verification, property management, and tenant communication features.

## TECHNOLOGY STACK

### Backend Technologies
- **Framework**: Spring Boot 3.x
- **Database**: PostgreSQL with JPA/Hibernate
- **Security**: Spring Security with JWT authentication
- **File Storage**: AWS S3 for document and image storage
- **Email**: Spring Mail with template engine
- **Document Processing**: Apache PDFBox for document handling
- **Image Processing**: ImageIO for image optimization
- **Validation**: Hibernate Validator
- **Documentation**: Swagger/OpenAPI 3
- **Testing**: JUnit 5, Mockito, TestContainers

### Frontend Technologies
- **Framework**: React 18+ with TypeScript
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI or Ant Design
- **File Upload**: React Dropzone
- **Charts**: Chart.js or Recharts
- **Date Handling**: Day.js
- **Form Validation**: React Hook Form with Yup

## DATABASE SCHEMA

### Core Entities

```sql
-- Owners Table (extends users)
CREATE TABLE owners (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL,
    business_name VARCHAR(255),
    pan_number VARCHAR(10) UNIQUE,
    aadhar_number VARCHAR(12) UNIQUE,
    bank_account_number VARCHAR(20),
    bank_ifsc_code VARCHAR(11),
    bank_name VARCHAR(100),
    verification_status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, VERIFIED, REJECTED
    verification_date TIMESTAMP,
    total_properties INTEGER DEFAULT 0,
    active_rentals INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Owner Documents Table
CREATE TABLE owner_documents (
    id BIGSERIAL PRIMARY KEY,
    owner_id BIGINT NOT NULL,
    document_type VARCHAR(100) NOT NULL, -- PAN_CARD, AADHAR_CARD, BANK_STATEMENT, etc.
    document_name VARCHAR(255) NOT NULL,
    document_url VARCHAR(500) NOT NULL,
    file_size BIGINT,
    mime_type VARCHAR(100),
    verification_status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, VERIFIED, REJECTED
    verification_notes TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified_at TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES owners(id)
);

-- Properties Table (extended for owners)
CREATE TABLE properties (
    id BIGSERIAL PRIMARY KEY,
    owner_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    property_type VARCHAR(50) NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    landmark VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    balconies INTEGER DEFAULT 0,
    area_sqft INTEGER NOT NULL,
    carpet_area_sqft INTEGER,
    floor_number INTEGER,
    total_floors INTEGER,
    property_age_years INTEGER,
    facing_direction VARCHAR(20), -- NORTH, SOUTH, EAST, WEST, etc.
    rent_amount DECIMAL(10,2) NOT NULL,
    security_deposit DECIMAL(10,2) NOT NULL,
    maintenance_charges DECIMAL(10,2) DEFAULT 0,
    brokerage_percentage DECIMAL(5,2) DEFAULT 0,
    preferred_tenant_type VARCHAR(50), -- FAMILY, BACHELOR, COMPANY, ANY
    available_from DATE,
    lease_duration_min INTEGER DEFAULT 12, -- minimum months
    lease_duration_max INTEGER DEFAULT 36, -- maximum months
    furnishing_status VARCHAR(50) DEFAULT 'FURNISHED', -- FURNISHED, SEMI_FURNISHED, UNFURNISHED
    parking_available BOOLEAN DEFAULT FALSE,
    parking_type VARCHAR(50), -- COVERED, OPEN, NONE
    water_supply VARCHAR(50), -- CORPORATION, BOREWELL, BOTH
    power_backup BOOLEAN DEFAULT FALSE,
    internet_available BOOLEAN DEFAULT FALSE,
    pets_allowed BOOLEAN DEFAULT FALSE,
    smoking_allowed BOOLEAN DEFAULT FALSE,
    cooking_allowed BOOLEAN DEFAULT TRUE,
    visitors_allowed BOOLEAN DEFAULT TRUE,
    is_available BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, VERIFIED, REJECTED
    verification_notes TEXT,
    listing_status VARCHAR(50) DEFAULT 'DRAFT', -- DRAFT, ACTIVE, INACTIVE, RENTED
    views_count INTEGER DEFAULT 0,
    inquiries_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES owners(id)
);

-- Property Documents Table
CREATE TABLE property_documents (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT NOT NULL,
    document_type VARCHAR(100) NOT NULL, -- OWNERSHIP_DEED, NOC, TAX_RECEIPT, etc.
    document_name VARCHAR(255) NOT NULL,
    document_url VARCHAR(500) NOT NULL,
    file_size BIGINT,
    mime_type VARCHAR(100),
    verification_status VARCHAR(50) DEFAULT 'PENDING',
    verification_notes TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified_at TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- Property Amenities Table
CREATE TABLE property_amenities (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT NOT NULL,
    category VARCHAR(100) NOT NULL, -- BUILDING, FURNITURE, KITCHEN, ELECTRONICS
    amenity_name VARCHAR(100) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    condition_status VARCHAR(50) DEFAULT 'GOOD', -- EXCELLENT, GOOD, FAIR, NEEDS_REPAIR
    purchase_date DATE,
    warranty_expiry DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- Rental Agreements Table
CREATE TABLE rental_agreements (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT NOT NULL,
    owner_id BIGINT NOT NULL,
    tenant_id BIGINT NOT NULL,
    agreement_start_date DATE NOT NULL,
    agreement_end_date DATE NOT NULL,
    monthly_rent DECIMAL(10,2) NOT NULL,
    security_deposit DECIMAL(10,2) NOT NULL,
    maintenance_charges DECIMAL(10,2) DEFAULT 0,
    agreement_terms TEXT,
    special_conditions TEXT,
    agreement_status VARCHAR(50) DEFAULT 'DRAFT', -- DRAFT, ACTIVE, EXPIRED, TERMINATED
    signed_by_owner BOOLEAN DEFAULT FALSE,
    signed_by_tenant BOOLEAN DEFAULT FALSE,
    owner_signature_date TIMESTAMP,
    tenant_signature_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (owner_id) REFERENCES owners(id),
    FOREIGN KEY (tenant_id) REFERENCES users(id)
);

-- Rent Collections Table
CREATE TABLE rent_collections (
    id BIGSERIAL PRIMARY KEY,
    agreement_id BIGINT NOT NULL,
    property_id BIGINT NOT NULL,
    tenant_id BIGINT NOT NULL,
    owner_id BIGINT NOT NULL,
    rent_month INTEGER NOT NULL, -- 1-12
    rent_year INTEGER NOT NULL,
    rent_amount DECIMAL(10,2) NOT NULL,
    maintenance_charges DECIMAL(10,2) DEFAULT 0,
    late_fee DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    paid_date DATE,
    payment_method VARCHAR(50), -- CASH, BANK_TRANSFER, UPI, CHEQUE
    payment_reference VARCHAR(255),
    payment_status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, PAID, OVERDUE, PARTIAL
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (agreement_id) REFERENCES rental_agreements(id),
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (tenant_id) REFERENCES users(id),
    FOREIGN KEY (owner_id) REFERENCES owners(id)
);

-- Property Inquiries Table
CREATE TABLE property_inquiries (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT NOT NULL,
    tenant_id BIGINT NOT NULL,
    owner_id BIGINT NOT NULL,
    inquiry_type VARCHAR(50) NOT NULL, -- VISIT_REQUEST, GENERAL_INQUIRY, BOOKING_INTEREST
    message TEXT NOT NULL,
    tenant_phone VARCHAR(15),
    tenant_email VARCHAR(255),
    preferred_visit_date DATE,
    preferred_visit_time TIME,
    inquiry_status VARCHAR(50) DEFAULT 'NEW', -- NEW, RESPONDED, SCHEDULED, CLOSED
    owner_response TEXT,
    response_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (tenant_id) REFERENCES users(id),
    FOREIGN KEY (owner_id) REFERENCES owners(id)
);

-- Maintenance Requests Table (from tenant side)
CREATE TABLE maintenance_requests (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT NOT NULL,
    tenant_id BIGINT NOT NULL,
    owner_id BIGINT NOT NULL,
    request_type VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- PLUMBING, ELECTRICAL, FURNITURE, APPLIANCE, etc.
    priority VARCHAR(20) DEFAULT 'MEDIUM', -- LOW, MEDIUM, HIGH, URGENT
    description TEXT NOT NULL,
    estimated_cost DECIMAL(10,2),
    actual_cost DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'OPEN', -- OPEN, IN_PROGRESS, RESOLVED, CLOSED, REJECTED
    requested_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    acknowledged_date TIMESTAMP,
    resolved_date TIMESTAMP,
    owner_notes TEXT,
    tenant_rating INTEGER, -- 1-5 rating after resolution
    tenant_feedback TEXT,
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (tenant_id) REFERENCES users(id),
    FOREIGN KEY (owner_id) REFERENCES owners(id)
);
```

## BACKEND API ENDPOINTS

### Owner Authentication & Profile
```java
POST /api/owner/auth/register - Owner registration
POST /api/owner/auth/login - Owner login
GET /api/owner/profile - Get owner profile
PUT /api/owner/profile - Update owner profile
POST /api/owner/documents/upload - Upload verification documents
GET /api/owner/documents - Get uploaded documents
PUT /api/owner/bank-details - Update bank details
```

### Property Management
```java
POST /api/owner/properties - Create new property
GET /api/owner/properties - Get owner's properties
GET /api/owner/properties/{id} - Get property details
PUT /api/owner/properties/{id} - Update property
DELETE /api/owner/properties/{id} - Delete property
POST /api/owner/properties/{id}/images - Upload property images
DELETE /api/owner/properties/{id}/images/{imageId} - Delete property image
POST /api/owner/properties/{id}/documents - Upload property documents
PUT /api/owner/properties/{id}/status - Update property status
GET /api/owner/properties/{id}/analytics - Get property analytics
```

### Amenities Management
```java
GET /api/owner/properties/{id}/amenities - Get property amenities
POST /api/owner/properties/{id}/amenities - Add amenity
PUT /api/owner/properties/{id}/amenities/{amenityId} - Update amenity
DELETE /api/owner/properties/{id}/amenities/{amenityId} - Remove amenity
GET /api/owner/amenities/categories - Get amenity categories
```

### Tenant Inquiries
```java
GET /api/owner/inquiries - Get all inquiries
GET /api/owner/inquiries/{id} - Get inquiry details
PUT /api/owner/inquiries/{id}/respond - Respond to inquiry
PUT /api/owner/inquiries/{id}/schedule-visit - Schedule property visit
GET /api/owner/inquiries/stats - Get inquiry statistics
```

### Rental Management
```java
GET /api/owner/rentals - Get active rentals
GET /api/owner/rentals/{id} - Get rental details
POST /api/owner/rentals/{id}/agreement - Generate rental agreement
PUT /api/owner/rentals/{id}/agreement/sign - Sign agreement
GET /api/owner/rentals/{id}/payments - Get payment history
POST /api/owner/rentals/{id}/rent-reminder - Send rent reminder
```

### Maintenance Management
```java
GET /api/owner/maintenance/requests - Get maintenance requests
GET /api/owner/maintenance/requests/{id} - Get request details
PUT /api/owner/maintenance/requests/{id}/acknowledge - Acknowledge request
PUT /api/owner/maintenance/requests/{id}/update-status - Update status
PUT /api/owner/maintenance/requests/{id}/add-cost - Add estimated/actual cost
POST /api/owner/maintenance/requests/{id}/resolve - Mark as resolved
```

### Analytics & Reports
```java
GET /api/owner/analytics/dashboard - Get dashboard analytics
GET /api/owner/analytics/revenue - Get revenue analytics
GET /api/owner/analytics/occupancy - Get occupancy rates
GET /api/owner/analytics/property-performance - Get property performance
GET /api/owner/reports/rent-collection - Generate rent collection report
GET /api/owner/reports/maintenance-summary - Generate maintenance report
```

## BACKEND IMPLEMENTATION

### Owner Entity
```java
@Entity
@Table(name = "owners")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Owner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true)
    private User user;
    
    @Column(name = "business_name")
    private String businessName;
    
    @Column(name = "pan_number", unique = true, length = 10)
    private String panNumber;
    
    @Column(name = "aadhar_number", unique = true, length = 12)
    private String aadharNumber;
    
    @Column(name = "bank_account_number")
    private String bankAccountNumber;
    
    @Column(name = "bank_ifsc_code")
    private String bankIfscCode;
    
    @Column(name = "bank_name")
    private String bankName;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status")
    private VerificationStatus verificationStatus = VerificationStatus.PENDING;
    
    @Column(name = "verification_date")
    private LocalDateTime verificationDate;
    
    @Column(name = "total_properties")
    private Integer totalProperties = 0;
    
    @Column(name = "active_rentals")
    private Integer activeRentals = 0;
    
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Property> properties = new ArrayList<>();
    
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OwnerDocument> documents = new ArrayList<>();
    
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
```

### Property Service
```java
@Service
@Transactional
public class PropertyService {
    
    @Autowired
    private PropertyRepository propertyRepository;
    
    @Autowired
    private PropertyDocumentRepository documentRepository;
    
    @Autowired
    private FileStorageService fileStorageService;
    
    public PropertyDTO createProperty(Long ownerId, CreatePropertyRequest request) {
        Owner owner = ownerRepository.findById(ownerId)
            .orElseThrow(() -> new OwnerNotFoundException("Owner not found"));
            
        Property property = new Property();
        BeanUtils.copyProperties(request, property);
        property.setOwner(owner);
        property.setListingStatus(ListingStatus.DRAFT);
        
        Property savedProperty = propertyRepository.save(property);
        return convertToDTO(savedProperty);
    }
    
    public void uploadPropertyDocuments(Long propertyId, List<MultipartFile> files) {
        Property property = propertyRepository.findById(propertyId)
            .orElseThrow(() -> new PropertyNotFoundException("Property not found"));
            
        for (MultipartFile file : files) {
            String documentUrl = fileStorageService.uploadFile(file, "property-documents");
            
            PropertyDocument document = new PropertyDocument();
            document.setProperty(property);
            document.setDocumentName(file.getOriginalFilename());
            document.setDocumentUrl(documentUrl);
            document.setFileSize(file.getSize());
            document.setMimeType(file.getContentType());
            
            documentRepository.save(document);
        }
    }
    
    public PropertyAnalyticsDTO getPropertyAnalytics(Long propertyId, Long ownerId) {
        Property property = propertyRepository.findByIdAndOwnerId(propertyId, ownerId)
            .orElseThrow(() -> new PropertyNotFoundException("Property not found"));
            
        PropertyAnalyticsDTO analytics = new PropertyAnalyticsDTO();
        analytics.setViewsCount(property.getViewsCount());
        analytics.setInquiriesCount(property.getInquiriesCount());
        analytics.setBookingsCount(getBookingsCount(propertyId));
        analytics.setAverageRating(getAverageRating(propertyId));
        
        return analytics;
    }
}
```

### Inquiry Service
```java
@Service
@Transactional
public class InquiryService {
    
    @Autowired
    private PropertyInquiryRepository inquiryRepository;
    
    @Autowired
    private EmailService emailService;
    
    public List<PropertyInquiryDTO> getOwnerInquiries(Long ownerId, InquiryFilter filter) {
        Specification<PropertyInquiry> spec = InquirySpecification.forOwner(ownerId, filter);
        List<PropertyInquiry> inquiries = inquiryRepository.findAll(spec);
        return inquiries.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
    
    public void respondToInquiry(Long inquiryId, InquiryResponseRequest request) {
        PropertyInquiry inquiry = inquiryRepository.findById(inquiryId)
            .orElseThrow(() -> new InquiryNotFoundException("Inquiry not found"));
            
        inquiry.setOwnerResponse(request.getResponse());
        inquiry.setResponseDate(LocalDateTime.now());
        inquiry.setInquiryStatus(InquiryStatus.RESPONDED);
        
        inquiryRepository.save(inquiry);
        
        // Send email notification to tenant
        emailService.sendInquiryResponse(inquiry);
    }
}
```

## FRONTEND IMPLEMENTATION

### Property Management Dashboard
```typescript
const PropertyDashboard: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [analytics, setAnalytics] = useState<DashboardAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [propertiesData, analyticsData] = await Promise.all([
        propertyService.getOwnerProperties(),
        analyticsService.getDashboardAnalytics()
      ]);
      setProperties(propertiesData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Property Dashboard
      </Typography>
      
      {analytics && (
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Total Properties"
              value={analytics.totalProperties}
              icon={<HomeIcon />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Active Rentals"
              value={analytics.activeRentals}
              icon={<PeopleIcon />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Monthly Revenue"
              value={`₹${analytics.monthlyRevenue.toLocaleString()}`}
              icon={<AttachMoneyIcon />}
              color="info"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Pending Inquiries"
              value={analytics.pendingInquiries}
              icon={<NotificationsIcon />}
              color="warning"
            />
          </Grid>
        </Grid>
      )}

      <PropertyList properties={properties} onPropertyUpdate={loadDashboardData} />
    </Container>
  );
};
```

### Property Form Component
```typescript
const PropertyForm: React.FC<PropertyFormProps> = ({ propertyId, onSave }) => {
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<PropertyFormData>({
    resolver: yupResolver(propertyValidationSchema),
    defaultValues: {
      furnishingStatus: 'FURNISHED',
      amenities: []
    }
  });

  const [amenityCategories, setAmenityCategories] = useState<AmenityCategory[]>([]);
  const [uploadedImages, setUploadedImages] = useState<PropertyImage[]>([]);

  const onSubmit = async (data: PropertyFormData) => {
    try {
      if (propertyId) {
        await propertyService.updateProperty(propertyId, data);
      } else {
        await propertyService.createProperty(data);
      }
      onSave();
    } catch (error) {
      console.error('Error saving property:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Property Title"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Controller
            name="propertyType"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.propertyType}>
                <InputLabel>Property Type</InputLabel>
                <Select {...field} label="Property Type">
                  <MenuItem value="APARTMENT">Apartment</MenuItem>
                  <MenuItem value="VILLA">Villa</MenuItem>
                  <MenuItem value="HOUSE">Independent House</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        {/* Amenities Section */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Amenities & Furniture
          </Typography>
          <AmenitySelector
            categories={amenityCategories}
            selectedAmenities={watch('amenities')}
            onChange={(amenities) => setValue('amenities', amenities)}
          />
        </Grid>

        {/* Image Upload Section */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Property Images
          </Typography>
          <ImageUploader
            images={uploadedImages}
            onImagesChange={setUploadedImages}
            maxImages={10}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" size="large">
            {propertyId ? 'Update Property' : 'Create Property'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
```

### Document Upload Component
```typescript
const DocumentUploader: React.FC<DocumentUploaderProps> = ({ 
  propertyId, 
  documentType, 
  onUploadComplete 
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    
    try {
      for (const file of acceptedFiles) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('documentType', documentType);
        
        await propertyService.uploadDocument(propertyId, formData, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          }
        });
      }
      
      onUploadComplete();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, [propertyId, documentType, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'grey.300',
        borderRadius: 2,
        p: 3,
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
          borderColor: 'primary.main'
        }
      }}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <Box>
          <CircularProgress variant="determinate" value={uploadProgress} />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Uploading... {uploadProgress}%
          </Typography>
        </Box>
      ) : (
        <Box>
          <CloudUploadIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            or click to select files (PDF, JPG, PNG - max 10MB)
          </Typography>
        </Box>
      )}
    </Box>
  );
};
```

## DEPLOYMENT & SECURITY

### Security Configuration
```java
@Configuration
@EnableWebSecurity
public class OwnerSecurityConfig {
    
    @Bean
    public SecurityFilterChain ownerFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/owner/auth/**").permitAll()
                .requestMatchers("/api/owner/**").hasRole("OWNER")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
```

### Performance Optimization
- **Database Indexing**: Create indexes on frequently queried columns
- **Caching**: Redis for property listings and analytics
- **File Storage**: AWS S3 with CloudFront CDN
- **Image Optimization**: Automatic image compression and WebP conversion
- **Lazy Loading**: Implement pagination for large datasets

### Monitoring & Analytics
- **Application Metrics**: Spring Boot Actuator
- **Database Monitoring**: Connection pool metrics
- **File Upload Monitoring**: Track upload success/failure rates
- **User Activity Tracking**: Property views, inquiries, bookings

This comprehensive specification provides everything needed to build a production-ready Property Owner Application with complete property management, document verification, and tenant communication features.