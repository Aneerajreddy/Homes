# PLATFORM ADMIN APPLICATION - JAVA FULL-STACK REQUIREMENTS

## PROJECT OVERVIEW
Build a comprehensive platform administration application using Java Spring Boot backend and React frontend for managing user verification, property approvals, dispute resolution, analytics, and overall platform governance.

## TECHNOLOGY STACK

### Backend Technologies
- **Framework**: Spring Boot 3.x with Spring Boot Admin
- **Database**: PostgreSQL with JPA/Hibernate
- **Security**: Spring Security with multi-role authentication
- **Caching**: Redis for session management and analytics
- **Messaging**: RabbitMQ for async processing
- **Monitoring**: Micrometer with Prometheus
- **Reporting**: JasperReports for PDF generation
- **Email**: Spring Mail with Thymeleaf templates
- **File Processing**: Apache POI for Excel reports
- **Audit**: Spring Data Envers for audit trails
- **Testing**: JUnit 5, Mockito, TestContainers

### Frontend Technologies
- **Framework**: React 18+ with TypeScript
- **State Management**: Redux Toolkit with RTK Query
- **UI Library**: Material-UI with custom admin theme
- **Charts**: Chart.js and D3.js for analytics
- **Tables**: React Table with sorting/filtering
- **Forms**: React Hook Form with Yup validation
- **Date Handling**: Day.js with timezone support
- **Real-time**: Socket.io for live notifications

## DATABASE SCHEMA

### Core Admin Entities

```sql
-- Admin Users Table
CREATE TABLE admin_users (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL,
    admin_role VARCHAR(50) NOT NULL, -- SUPER_ADMIN, PROPERTY_ADMIN, USER_ADMIN, FINANCE_ADMIN
    permissions TEXT[], -- Array of specific permissions
    department VARCHAR(100),
    employee_id VARCHAR(50) UNIQUE,
    reporting_manager_id BIGINT,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    failed_login_attempts INTEGER DEFAULT 0,
    account_locked_until TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (reporting_manager_id) REFERENCES admin_users(id)
);

-- Verification Requests Table
CREATE TABLE verification_requests (
    id BIGSERIAL PRIMARY KEY,
    request_type VARCHAR(50) NOT NULL, -- USER_VERIFICATION, PROPERTY_VERIFICATION, OWNER_VERIFICATION
    entity_id BIGINT NOT NULL, -- ID of user, property, or owner being verified
    entity_type VARCHAR(50) NOT NULL, -- USER, PROPERTY, OWNER
    submitted_by BIGINT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_to BIGINT, -- Admin user assigned to review
    assigned_at TIMESTAMP,
    verification_status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, IN_REVIEW, APPROVED, REJECTED, REQUIRES_INFO
    priority_level VARCHAR(20) DEFAULT 'NORMAL', -- LOW, NORMAL, HIGH, URGENT
    verification_notes TEXT,
    rejection_reason TEXT,
    required_documents TEXT[], -- Array of required document types
    submitted_documents TEXT[], -- Array of submitted document URLs
    verification_checklist JSONB, -- Checklist items with status
    reviewed_by BIGINT,
    reviewed_at TIMESTAMP,
    auto_approved BOOLEAN DEFAULT FALSE,
    sla_due_date TIMESTAMP, -- Service Level Agreement due date
    escalated BOOLEAN DEFAULT FALSE,
    escalated_at TIMESTAMP,
    escalated_to BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (submitted_by) REFERENCES users(id),
    FOREIGN KEY (assigned_to) REFERENCES admin_users(id),
    FOREIGN KEY (reviewed_by) REFERENCES admin_users(id),
    FOREIGN KEY (escalated_to) REFERENCES admin_users(id)
);

-- Verification History Table
CREATE TABLE verification_history (
    id BIGSERIAL PRIMARY KEY,
    verification_request_id BIGINT NOT NULL,
    action_type VARCHAR(50) NOT NULL, -- SUBMITTED, ASSIGNED, REVIEWED, APPROVED, REJECTED, etc.
    performed_by BIGINT NOT NULL,
    action_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    previous_status VARCHAR(50),
    new_status VARCHAR(50),
    comments TEXT,
    additional_data JSONB,
    FOREIGN KEY (verification_request_id) REFERENCES verification_requests(id),
    FOREIGN KEY (performed_by) REFERENCES admin_users(id)
);

-- Disputes Table
CREATE TABLE disputes (
    id BIGSERIAL PRIMARY KEY,
    dispute_number VARCHAR(50) UNIQUE NOT NULL,
    dispute_type VARCHAR(50) NOT NULL, -- PAYMENT, PROPERTY, SERVICE, REFUND, DAMAGE
    dispute_category VARCHAR(100), -- More specific categorization
    raised_by BIGINT NOT NULL,
    raised_against BIGINT, -- User ID of the other party
    related_booking_id BIGINT,
    related_property_id BIGINT,
    related_order_id BIGINT,
    dispute_title VARCHAR(255) NOT NULL,
    dispute_description TEXT NOT NULL,
    dispute_amount DECIMAL(10,2),
    evidence_documents TEXT[], -- Array of document URLs
    dispute_status VARCHAR(50) DEFAULT 'OPEN', -- OPEN, IN_PROGRESS, RESOLVED, CLOSED, ESCALATED
    priority_level VARCHAR(20) DEFAULT 'MEDIUM', -- LOW, MEDIUM, HIGH, CRITICAL
    assigned_to BIGINT, -- Admin handling the dispute
    assigned_at TIMESTAMP,
    resolution_notes TEXT,
    resolution_amount DECIMAL(10,2),
    resolution_date TIMESTAMP,
    customer_satisfaction_rating INTEGER, -- 1-5 rating
    customer_feedback TEXT,
    sla_due_date TIMESTAMP,
    escalated BOOLEAN DEFAULT FALSE,
    escalated_at TIMESTAMP,
    escalated_to BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (raised_by) REFERENCES users(id),
    FOREIGN KEY (raised_against) REFERENCES users(id),
    FOREIGN KEY (related_booking_id) REFERENCES bookings(id),
    FOREIGN KEY (related_property_id) REFERENCES properties(id),
    FOREIGN KEY (assigned_to) REFERENCES admin_users(id),
    FOREIGN KEY (escalated_to) REFERENCES admin_users(id)
);

-- Dispute Communications Table
CREATE TABLE dispute_communications (
    id BIGSERIAL PRIMARY KEY,
    dispute_id BIGINT NOT NULL,
    sender_id BIGINT NOT NULL,
    sender_type VARCHAR(20) NOT NULL, -- ADMIN, USER
    message TEXT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'TEXT', -- TEXT, DOCUMENT, IMAGE, SYSTEM_UPDATE
    attachments TEXT[], -- Array of attachment URLs
    is_internal BOOLEAN DEFAULT FALSE, -- Internal admin notes vs customer communication
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_by_customer BOOLEAN DEFAULT FALSE,
    read_by_admin BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (dispute_id) REFERENCES disputes(id),
    FOREIGN KEY (sender_id) REFERENCES users(id)
);

-- Platform Analytics Table
CREATE TABLE platform_analytics (
    id BIGSERIAL PRIMARY KEY,
    metric_name VARCHAR(100) NOT NULL,
    metric_category VARCHAR(50) NOT NULL, -- USER, PROPERTY, BOOKING, REVENUE, SYSTEM
    metric_value DECIMAL(15,2) NOT NULL,
    metric_unit VARCHAR(20), -- COUNT, PERCENTAGE, CURRENCY, etc.
    time_period VARCHAR(20) NOT NULL, -- DAILY, WEEKLY, MONTHLY, YEARLY
    period_start_date DATE NOT NULL,
    period_end_date DATE NOT NULL,
    additional_dimensions JSONB, -- Additional breakdown dimensions
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(metric_name, metric_category, time_period, period_start_date)
);

-- System Configurations Table
CREATE TABLE system_configurations (
    id BIGSERIAL PRIMARY KEY,
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value TEXT NOT NULL,
    config_type VARCHAR(50) NOT NULL, -- STRING, INTEGER, DECIMAL, BOOLEAN, JSON
    config_category VARCHAR(50) NOT NULL, -- PAYMENT, NOTIFICATION, VERIFICATION, etc.
    description TEXT,
    is_sensitive BOOLEAN DEFAULT FALSE, -- For passwords, API keys, etc.
    requires_restart BOOLEAN DEFAULT FALSE,
    last_modified_by BIGINT NOT NULL,
    last_modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    version INTEGER DEFAULT 1,
    FOREIGN KEY (last_modified_by) REFERENCES admin_users(id)
);

-- Audit Logs Table
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL, -- USER, PROPERTY, BOOKING, etc.
    entity_id BIGINT NOT NULL,
    action_type VARCHAR(50) NOT NULL, -- CREATE, UPDATE, DELETE, APPROVE, REJECT, etc.
    performed_by BIGINT NOT NULL,
    performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    old_values JSONB, -- Previous state
    new_values JSONB, -- New state
    changes_summary TEXT,
    risk_level VARCHAR(20) DEFAULT 'LOW', -- LOW, MEDIUM, HIGH, CRITICAL
    FOREIGN KEY (performed_by) REFERENCES users(id)
);

-- Notifications Table
CREATE TABLE admin_notifications (
    id BIGSERIAL PRIMARY KEY,
    notification_type VARCHAR(50) NOT NULL, -- VERIFICATION_PENDING, DISPUTE_RAISED, SYSTEM_ALERT, etc.
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    priority_level VARCHAR(20) DEFAULT 'NORMAL', -- LOW, NORMAL, HIGH, URGENT
    target_admin_id BIGINT, -- Specific admin, NULL for all admins
    target_role VARCHAR(50), -- Specific role, NULL for all roles
    related_entity_type VARCHAR(50),
    related_entity_id BIGINT,
    notification_status VARCHAR(20) DEFAULT 'UNREAD', -- UNREAD, READ, DISMISSED
    action_required BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(500), -- URL to take action
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP,
    dismissed_at TIMESTAMP,
    FOREIGN KEY (target_admin_id) REFERENCES admin_users(id)
);

-- Reports Table
CREATE TABLE admin_reports (
    id BIGSERIAL PRIMARY KEY,
    report_name VARCHAR(255) NOT NULL,
    report_type VARCHAR(50) NOT NULL, -- USER_ANALYTICS, REVENUE, PROPERTY_PERFORMANCE, etc.
    report_format VARCHAR(20) NOT NULL, -- PDF, EXCEL, CSV
    report_parameters JSONB, -- Parameters used to generate the report
    generated_by BIGINT NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    report_file_url VARCHAR(500),
    file_size_bytes BIGINT,
    report_status VARCHAR(20) DEFAULT 'GENERATING', -- GENERATING, COMPLETED, FAILED
    error_message TEXT,
    download_count INTEGER DEFAULT 0,
    expires_at TIMESTAMP,
    FOREIGN KEY (generated_by) REFERENCES admin_users(id)
);

-- System Health Metrics Table
CREATE TABLE system_health_metrics (
    id BIGSERIAL PRIMARY KEY,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(15,4) NOT NULL,
    metric_unit VARCHAR(20),
    service_name VARCHAR(50) NOT NULL, -- API, DATABASE, CACHE, etc.
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    alert_threshold_min DECIMAL(15,4),
    alert_threshold_max DECIMAL(15,4),
    is_healthy BOOLEAN DEFAULT TRUE
);
```

## BACKEND API ENDPOINTS

### Admin Authentication & Profile
```java
POST /api/admin/auth/login - Admin login with MFA
POST /api/admin/auth/logout - Admin logout
GET /api/admin/profile - Get admin profile
PUT /api/admin/profile - Update admin profile
POST /api/admin/auth/change-password - Change password
GET /api/admin/permissions - Get admin permissions
```

### User Management APIs
```java
GET /api/admin/users - Get all users with filters
GET /api/admin/users/{id} - Get user details
PUT /api/admin/users/{id}/status - Update user status (activate/deactivate)
GET /api/admin/users/{id}/activity - Get user activity history
POST /api/admin/users/{id}/send-notification - Send notification to user
GET /api/admin/users/analytics - Get user analytics
```

### Verification Management APIs
```java
GET /api/admin/verifications - Get verification requests
GET /api/admin/verifications/{id} - Get verification details
PUT /api/admin/verifications/{id}/assign - Assign verification to admin
PUT /api/admin/verifications/{id}/approve - Approve verification
PUT /api/admin/verifications/{id}/reject - Reject verification
POST /api/admin/verifications/{id}/request-info - Request additional information
GET /api/admin/verifications/queue - Get verification queue by priority
GET /api/admin/verifications/overdue - Get overdue verifications
```

### Property Management APIs
```java
GET /api/admin/properties - Get all properties with filters
GET /api/admin/properties/{id} - Get property details
PUT /api/admin/properties/{id}/verify - Verify property
PUT /api/admin/properties/{id}/reject - Reject property
PUT /api/admin/properties/{id}/suspend - Suspend property listing
GET /api/admin/properties/pending-verification - Get pending properties
GET /api/admin/properties/analytics - Get property analytics
```

### Dispute Management APIs
```java
GET /api/admin/disputes - Get all disputes
GET /api/admin/disputes/{id} - Get dispute details
PUT /api/admin/disputes/{id}/assign - Assign dispute to admin
POST /api/admin/disputes/{id}/communicate - Add communication to dispute
PUT /api/admin/disputes/{id}/resolve - Resolve dispute
PUT /api/admin/disputes/{id}/escalate - Escalate dispute
GET /api/admin/disputes/dashboard - Get dispute dashboard data
GET /api/admin/disputes/analytics - Get dispute analytics
```

### Financial Management APIs
```java
GET /api/admin/finance/transactions - Get all transactions
GET /api/admin/finance/revenue - Get revenue analytics
GET /api/admin/finance/refunds - Get refund requests
POST /api/admin/finance/refunds/{id}/process - Process refund
GET /api/admin/finance/settlements - Get settlement reports
GET /api/admin/finance/commission - Get commission analytics
```

### Analytics & Reports APIs
```java
GET /api/admin/analytics/dashboard - Get admin dashboard data
GET /api/admin/analytics/users - Get user analytics
GET /api/admin/analytics/properties - Get property analytics
GET /api/admin/analytics/bookings - Get booking analytics
GET /api/admin/analytics/revenue - Get revenue analytics
POST /api/admin/reports/generate - Generate custom report
GET /api/admin/reports - Get generated reports
GET /api/admin/reports/{id}/download - Download report
```

### System Management APIs
```java
GET /api/admin/system/health - Get system health status
GET /api/admin/system/configurations - Get system configurations
PUT /api/admin/system/configurations - Update system configurations
GET /api/admin/system/audit-logs - Get audit logs
GET /api/admin/system/notifications - Get admin notifications
PUT /api/admin/system/notifications/{id}/read - Mark notification as read
```

## BACKEND IMPLEMENTATION

### Admin Security Configuration
```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class AdminSecurityConfig {
    
    @Bean
    public SecurityFilterChain adminFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/admin/auth/**").permitAll()
                .requestMatchers("/api/admin/system/**").hasRole("SUPER_ADMIN")
                .requestMatchers("/api/admin/finance/**").hasAnyRole("SUPER_ADMIN", "FINANCE_ADMIN")
                .requestMatchers("/api/admin/verifications/**").hasAnyRole("SUPER_ADMIN", "PROPERTY_ADMIN", "USER_ADMIN")
                .requestMatchers("/api/admin/**").hasAnyRole("SUPER_ADMIN", "PROPERTY_ADMIN", "USER_ADMIN", "FINANCE_ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}
```

### Verification Service
```java
@Service
@Transactional
public class VerificationService {
    
    @Autowired
    private VerificationRequestRepository verificationRepository;
    
    @Autowired
    private NotificationService notificationService;
    
    @Autowired
    private AuditService auditService;
    
    public Page<VerificationRequestDTO> getVerificationQueue(VerificationFilter filter, Pageable pageable) {
        Specification<VerificationRequest> spec = VerificationSpecification.withFilter(filter);
        Page<VerificationRequest> requests = verificationRepository.findAll(spec, pageable);
        return requests.map(this::convertToDTO);
    }
    
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'PROPERTY_ADMIN', 'USER_ADMIN')")
    public void assignVerification(Long requestId, Long adminId) {
        VerificationRequest request = verificationRepository.findById(requestId)
            .orElseThrow(() -> new VerificationNotFoundException("Verification request not found"));
        
        AdminUser admin = adminUserRepository.findById(adminId)
            .orElseThrow(() -> new AdminNotFoundException("Admin not found"));
        
        request.setAssignedTo(admin);
        request.setAssignedAt(LocalDateTime.now());
        request.setVerificationStatus(VerificationStatus.IN_REVIEW);
        
        verificationRepository.save(request);
        
        // Create audit log
        auditService.logAction(AuditAction.VERIFICATION_ASSIGNED, request.getId(), adminId);
        
        // Send notification to assigned admin
        notificationService.sendVerificationAssignmentNotification(request, admin);
    }
    
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'PROPERTY_ADMIN', 'USER_ADMIN')")
    public void approveVerification(Long requestId, VerificationApprovalRequest approvalRequest) {
        VerificationRequest request = verificationRepository.findById(requestId)
            .orElseThrow(() -> new VerificationNotFoundException("Verification request not found"));
        
        // Validate approval authority
        validateApprovalAuthority(request, getCurrentAdmin());
        
        request.setVerificationStatus(VerificationStatus.APPROVED);
        request.setVerificationNotes(approvalRequest.getNotes());
        request.setReviewedBy(getCurrentAdmin());
        request.setReviewedAt(LocalDateTime.now());
        
        verificationRepository.save(request);
        
        // Update the actual entity status
        updateEntityVerificationStatus(request, true);
        
        // Create audit log
        auditService.logAction(AuditAction.VERIFICATION_APPROVED, request.getId(), getCurrentAdminId());
        
        // Send approval notification
        notificationService.sendVerificationApprovalNotification(request);
        
        // Update analytics
        analyticsService.recordVerificationApproval(request);
    }
    
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'PROPERTY_ADMIN', 'USER_ADMIN')")
    public void rejectVerification(Long requestId, VerificationRejectionRequest rejectionRequest) {
        VerificationRequest request = verificationRepository.findById(requestId)
            .orElseThrow(() -> new VerificationNotFoundException("Verification request not found"));
        
        request.setVerificationStatus(VerificationStatus.REJECTED);
        request.setRejectionReason(rejectionRequest.getReason());
        request.setVerificationNotes(rejectionRequest.getNotes());
        request.setReviewedBy(getCurrentAdmin());
        request.setReviewedAt(LocalDateTime.now());
        
        verificationRepository.save(request);
        
        // Update the actual entity status
        updateEntityVerificationStatus(request, false);
        
        // Create audit log
        auditService.logAction(AuditAction.VERIFICATION_REJECTED, request.getId(), getCurrentAdminId());
        
        // Send rejection notification with improvement suggestions
        notificationService.sendVerificationRejectionNotification(request, rejectionRequest.getImprovementSuggestions());
    }
    
    @Scheduled(cron = "0 0 9 * * *") // Daily at 9 AM
    public void checkOverdueVerifications() {
        List<VerificationRequest> overdueRequests = verificationRepository.findOverdueRequests();
        
        for (VerificationRequest request : overdueRequests) {
            if (!request.isEscalated()) {
                escalateVerification(request);
            }
        }
    }
    
    private void escalateVerification(VerificationRequest request) {
        AdminUser supervisor = findSupervisor(request.getAssignedTo());
        
        request.setEscalated(true);
        request.setEscalatedAt(LocalDateTime.now());
        request.setEscalatedTo(supervisor);
        
        verificationRepository.save(request);
        
        // Send escalation notifications
        notificationService.sendVerificationEscalationNotification(request, supervisor);
    }
}
```

### Dispute Management Service
```java
@Service
@Transactional
public class DisputeService {
    
    @Autowired
    private DisputeRepository disputeRepository;
    
    @Autowired
    private DisputeCommunicationRepository communicationRepository;
    
    @Autowired
    private PaymentService paymentService;
    
    public DisputeDashboardDTO getDisputeDashboard() {
        DisputeDashboardDTO dashboard = new DisputeDashboardDTO();
        
        dashboard.setTotalDisputes(disputeRepository.count());
        dashboard.setOpenDisputes(disputeRepository.countByStatus(DisputeStatus.OPEN));
        dashboard.setInProgressDisputes(disputeRepository.countByStatus(DisputeStatus.IN_PROGRESS));
        dashboard.setResolvedToday(disputeRepository.countResolvedToday());
        dashboard.setAverageResolutionTime(disputeRepository.getAverageResolutionTime());
        dashboard.setCustomerSatisfactionRating(disputeRepository.getAverageCustomerRating());
        
        // Get dispute trends
        dashboard.setDisputeTrends(getDisputeTrends());
        
        // Get top dispute categories
        dashboard.setTopDisputeCategories(getTopDisputeCategories());
        
        return dashboard;
    }
    
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'USER_ADMIN')")
    public void assignDispute(Long disputeId, Long adminId) {
        Dispute dispute = disputeRepository.findById(disputeId)
            .orElseThrow(() -> new DisputeNotFoundException("Dispute not found"));
        
        AdminUser admin = adminUserRepository.findById(adminId)
            .orElseThrow(() -> new AdminNotFoundException("Admin not found"));
        
        dispute.setAssignedTo(admin);
        dispute.setAssignedAt(LocalDateTime.now());
        dispute.setDisputeStatus(DisputeStatus.IN_PROGRESS);
        
        disputeRepository.save(dispute);
        
        // Create system communication
        createSystemCommunication(dispute, "Dispute assigned to " + admin.getUser().getFirstName());
        
        // Send notifications
        notificationService.sendDisputeAssignmentNotification(dispute, admin);
    }
    
    public void addCommunication(Long disputeId, DisputeCommunicationRequest request) {
        Dispute dispute = disputeRepository.findById(disputeId)
            .orElseThrow(() -> new DisputeNotFoundException("Dispute not found"));
        
        DisputeCommunication communication = new DisputeCommunication();
        communication.setDispute(dispute);
        communication.setSenderId(request.getSenderId());
        communication.setSenderType(request.getSenderType());
        communication.setMessage(request.getMessage());
        communication.setMessageType(request.getMessageType());
        communication.setAttachments(request.getAttachments().toArray(new String[0]));
        communication.setIsInternal(request.isInternal());
        
        communicationRepository.save(communication);
        
        // Send notification to relevant parties
        if (!request.isInternal()) {
            notificationService.sendDisputeCommunicationNotification(dispute, communication);
        }
    }
    
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'USER_ADMIN')")
    public void resolveDispute(Long disputeId, DisputeResolutionRequest resolution) {
        Dispute dispute = disputeRepository.findById(disputeId)
            .orElseThrow(() -> new DisputeNotFoundException("Dispute not found"));
        
        dispute.setDisputeStatus(DisputeStatus.RESOLVED);
        dispute.setResolutionNotes(resolution.getResolutionNotes());
        dispute.setResolutionAmount(resolution.getResolutionAmount());
        dispute.setResolutionDate(LocalDateTime.now());
        
        disputeRepository.save(dispute);
        
        // Process financial resolution if applicable
        if (resolution.getResolutionAmount() != null && resolution.getResolutionAmount().compareTo(BigDecimal.ZERO) > 0) {
            processFinancialResolution(dispute, resolution);
        }
        
        // Create resolution communication
        createSystemCommunication(dispute, "Dispute resolved: " + resolution.getResolutionNotes());
        
        // Send resolution notification
        notificationService.sendDisputeResolutionNotification(dispute);
        
        // Update analytics
        analyticsService.recordDisputeResolution(dispute);
    }
    
    private void processFinancialResolution(Dispute dispute, DisputeResolutionRequest resolution) {
        switch (resolution.getResolutionType()) {
            case REFUND_TO_CUSTOMER:
                paymentService.processRefund(dispute.getRaisedBy(), resolution.getResolutionAmount(), 
                                           "Dispute resolution refund - " + dispute.getDisputeNumber());
                break;
            case COMPENSATION_TO_OWNER:
                paymentService.processPayment(dispute.getRaisedAgainst(), resolution.getResolutionAmount(),
                                            "Dispute resolution compensation - " + dispute.getDisputeNumber());
                break;
            case PLATFORM_COVERS_COST:
                // Platform absorbs the cost - record in financial logs
                financialService.recordPlatformCost(resolution.getResolutionAmount(), 
                                                  "Dispute resolution cost - " + dispute.getDisputeNumber());
                break;
        }
    }
}
```

### Analytics Service
```java
@Service
@Transactional(readOnly = true)
public class AnalyticsService {
    
    @Autowired
    private PlatformAnalyticsRepository analyticsRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PropertyRepository propertyRepository;
    
    @Autowired
    private BookingRepository bookingRepository;
    
    public AdminDashboardDTO getAdminDashboard() {
        AdminDashboardDTO dashboard = new AdminDashboardDTO();
        
        // User metrics
        dashboard.setTotalUsers(userRepository.count());
        dashboard.setActiveUsers(userRepository.countActiveUsers());
        dashboard.setNewUsersToday(userRepository.countNewUsersToday());
        dashboard.setUserGrowthRate(calculateUserGrowthRate());
        
        // Property metrics
        dashboard.setTotalProperties(propertyRepository.count());
        dashboard.setVerifiedProperties(propertyRepository.countByVerificationStatus(true));
        dashboard.setPendingVerifications(propertyRepository.countByVerificationStatus(false));
        dashboard.setPropertyGrowthRate(calculatePropertyGrowthRate());
        
        // Booking metrics
        dashboard.setTotalBookings(bookingRepository.count());
        dashboard.setActiveBookings(bookingRepository.countActiveBookings());
        dashboard.setBookingsToday(bookingRepository.countBookingsToday());
        dashboard.setBookingConversionRate(calculateBookingConversionRate());
        
        // Revenue metrics
        dashboard.setTotalRevenue(calculateTotalRevenue());
        dashboard.setMonthlyRevenue(calculateMonthlyRevenue());
        dashboard.setRevenueGrowthRate(calculateRevenueGrowthRate());
        dashboard.setAverageBookingValue(calculateAverageBookingValue());
        
        // System health
        dashboard.setSystemHealth(getSystemHealthStatus());
        dashboard.setPlatformUtilization(calculatePlatformUtilization());
        
        return dashboard;
    }
    
    public List<UserAnalyticsDTO> getUserAnalytics(AnalyticsFilter filter) {
        List<UserAnalyticsDTO> analytics = new ArrayList<>();
        
        // User registration trends
        analytics.add(getUserRegistrationTrends(filter));
        
        // User activity patterns
        analytics.add(getUserActivityPatterns(filter));
        
        // User demographics
        analytics.add(getUserDemographics(filter));
        
        // User retention metrics
        analytics.add(getUserRetentionMetrics(filter));
        
        return analytics;
    }
    
    public RevenueAnalyticsDTO getRevenueAnalytics(DateRange dateRange) {
        RevenueAnalyticsDTO analytics = new RevenueAnalyticsDTO();
        
        // Total revenue breakdown
        analytics.setTotalRevenue(calculateTotalRevenue(dateRange));
        analytics.setRentalRevenue(calculateRentalRevenue(dateRange));
        analytics.setFurnitureRevenue(calculateFurnitureRevenue(dateRange));
        analytics.setServiceRevenue(calculateServiceRevenue(dateRange));
        
        // Revenue trends
        analytics.setDailyRevenueTrends(getDailyRevenueTrends(dateRange));
        analytics.setMonthlyRevenueTrends(getMonthlyRevenueTrends(dateRange));
        
        // Revenue by city
        analytics.setRevenueByCities(getRevenueByCities(dateRange));
        
        // Revenue by property type
        analytics.setRevenueByPropertyTypes(getRevenueByPropertyTypes(dateRange));
        
        // Commission analytics
        analytics.setTotalCommission(calculateTotalCommission(dateRange));
        analytics.setCommissionByOwners(getCommissionByOwners(dateRange));
        
        return analytics;
    }
    
    @Scheduled(cron = "0 0 1 * * *") // Daily at 1 AM
    public void generateDailyAnalytics() {
        Date yesterday = Date.from(LocalDate.now().minusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        
        // Generate user analytics
        generateUserAnalytics(yesterday);
        
        // Generate property analytics
        generatePropertyAnalytics(yesterday);
        
        // Generate booking analytics
        generateBookingAnalytics(yesterday);
        
        // Generate revenue analytics
        generateRevenueAnalytics(yesterday);
        
        // Generate system performance analytics
        generateSystemAnalytics(yesterday);
    }
    
    private void generateUserAnalytics(Date date) {
        // New user registrations
        long newUsers = userRepository.countNewUsersByDate(date);
        savePlatformAnalytic("NEW_USERS", "USER", newUsers, "COUNT", "DAILY", date);
        
        // Active users
        long activeUsers = userRepository.countActiveUsersByDate(date);
        savePlatformAnalytic("ACTIVE_USERS", "USER", activeUsers, "COUNT", "DAILY", date);
        
        // User retention rate
        double retentionRate = calculateUserRetentionRate(date);
        savePlatformAnalytic("USER_RETENTION_RATE", "USER", retentionRate, "PERCENTAGE", "DAILY", date);
    }
    
    private void savePlatformAnalytic(String metricName, String category, double value, 
                                    String unit, String period, Date date) {
        PlatformAnalytics analytics = new PlatformAnalytics();
        analytics.setMetricName(metricName);
        analytics.setMetricCategory(category);
        analytics.setMetricValue(BigDecimal.valueOf(value));
        analytics.setMetricUnit(unit);
        analytics.setTimePeriod(period);
        analytics.setPeriodStartDate(date);
        analytics.setPeriodEndDate(date);
        
        analyticsRepository.save(analytics);
    }
}
```

## FRONTEND IMPLEMENTATION

### Admin Dashboard Component
```typescript
const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('7d');
  const [loading, setLoading] = useState(true);

  const { data: realTimeStats, isLoading: statsLoading } = useGetRealTimeStatsQuery();

  useEffect(() => {
    loadDashboardData();
  }, [selectedTimeRange]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await adminService.getDashboardData(selectedTimeRange);
      setDashboardData(data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !dashboardData) {
    return <DashboardSkeleton />;
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Platform Administration
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TimeRangeSelector
              value={selectedTimeRange}
              onChange={setSelectedTimeRange}
            />
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={loadDashboardData}
            >
              Refresh
            </Button>
          </Box>
        </Box>

        {/* Key Metrics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Total Users"
              value={dashboardData.totalUsers}
              change={dashboardData.userGrowthRate}
              icon={<PeopleIcon />}
              color="primary"
              trend={dashboardData.userTrend}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Active Properties"
              value={dashboardData.verifiedProperties}
              change={dashboardData.propertyGrowthRate}
              icon={<HomeIcon />}
              color="success"
              trend={dashboardData.propertyTrend}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Monthly Revenue"
              value={`₹${dashboardData.monthlyRevenue.toLocaleString()}`}
              change={dashboardData.revenueGrowthRate}
              icon={<AttachMoneyIcon />}
              color="info"
              trend={dashboardData.revenueTrend}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="System Health"
              value={`${dashboardData.systemHealth}%`}
              change={0}
              icon={<HealthAndSafetyIcon />}
              color={dashboardData.systemHealth > 95 ? "success" : "warning"}
            />
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <QuickActionCard
                title="Pending Verifications"
                count={dashboardData.pendingVerifications}
                icon={<VerifiedUserIcon />}
                action={() => navigate('/admin/verifications')}
                urgent={dashboardData.pendingVerifications > 10}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <QuickActionCard
                title="Open Disputes"
                count={dashboardData.openDisputes}
                icon={<ReportProblemIcon />}
                action={() => navigate('/admin/disputes')}
                urgent={dashboardData.openDisputes > 5}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <QuickActionCard
                title="System Alerts"
                count={dashboardData.systemAlerts}
                icon={<NotificationsIcon />}
                action={() => navigate('/admin/system/alerts')}
                urgent={dashboardData.systemAlerts > 0}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <QuickActionCard
                title="Generate Report"
                icon={<AssessmentIcon />}
                action={() => setShowReportModal(true)}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Charts and Analytics */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                Revenue Trends
              </Typography>
              <RevenueTrendChart
                data={dashboardData.revenueTrends}
                timeRange={selectedTimeRange}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                User Activity
              </Typography>
              <UserActivityChart
                data={dashboardData.userActivity}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Paper sx={{ p: 3, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                Property Distribution
              </Typography>
              <PropertyDistributionChart
                data={dashboardData.propertyDistribution}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Paper sx={{ p: 3, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              <RecentActivitiesList
                activities={dashboardData.recentActivities}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
```

### Verification Management Component
```typescript
const VerificationManagement: React.FC = () => {
  const [verifications, setVerifications] = useState<VerificationRequest[]>([]);
  const [filters, setFilters] = useState<VerificationFilters>({
    status: 'PENDING',
    type: 'ALL',
    priority: 'ALL',
    assignedTo: 'ALL'
  });
  const [selectedVerification, setSelectedVerification] = useState<VerificationRequest | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const { data: verificationStats } = useGetVerificationStatsQuery();

  useEffect(() => {
    loadVerifications();
  }, [filters]);

  const loadVerifications = async () => {
    try {
      const response = await verificationService.getVerifications(filters);
      setVerifications(response.data);
    } catch (error) {
      console.error('Error loading verifications:', error);
    }
  };

  const handleApprove = async (verificationId: string, notes: string) => {
    try {
      await verificationService.approveVerification(verificationId, { notes });
      loadVerifications();
      toast.success('Verification approved successfully');
    } catch (error) {
      toast.error('Failed to approve verification');
    }
  };

  const handleReject = async (verificationId: string, reason: string, notes: string) => {
    try {
      await verificationService.rejectVerification(verificationId, { reason, notes });
      loadVerifications();
      toast.success('Verification rejected');
    } catch (error) {
      toast.error('Failed to reject verification');
    }
  };

  const handleAssign = async (verificationId: string, adminId: string) => {
    try {
      await verificationService.assignVerification(verificationId, adminId);
      loadVerifications();
      toast.success('Verification assigned successfully');
    } catch (error) {
      toast.error('Failed to assign verification');
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Verification Management
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Pending Reviews"
              value={verificationStats?.pending || 0}
              icon={<PendingIcon />}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="In Review"
              value={verificationStats?.inReview || 0}
              icon={<ReviewsIcon />}
              color="info"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Approved Today"
              value={verificationStats?.approvedToday || 0}
              icon={<CheckCircleIcon />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Overdue"
              value={verificationStats?.overdue || 0}
              icon={<WarningIcon />}
              color="error"
            />
          </Grid>
        </Grid>

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  label="Status"
                >
                  <MenuItem value="ALL">All Status</MenuItem>
                  <MenuItem value="PENDING">Pending</MenuItem>
                  <MenuItem value="IN_REVIEW">In Review</MenuItem>
                  <MenuItem value="APPROVED">Approved</MenuItem>
                  <MenuItem value="REJECTED">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Type</InputLabel>
                <Select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  label="Type"
                >
                  <MenuItem value="ALL">All Types</MenuItem>
                  <MenuItem value="USER_VERIFICATION">User</MenuItem>
                  <MenuItem value="PROPERTY_VERIFICATION">Property</MenuItem>
                  <MenuItem value="OWNER_VERIFICATION">Owner</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Priority</InputLabel>
                <Select
                  value={filters.priority}
                  onChange={(e) => setFilters({...filters, priority: e.target.value})}
                  label="Priority"
                >
                  <MenuItem value="ALL">All Priorities</MenuItem>
                  <MenuItem value="URGENT">Urgent</MenuItem>
                  <MenuItem value="HIGH">High</MenuItem>
                  <MenuItem value="NORMAL">Normal</MenuItem>
                  <MenuItem value="LOW">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Button
                variant="contained"
                startIcon={<AssignmentIcon />}
                onClick={() => setShowAssignModal(true)}
                fullWidth
              >
                Bulk Assign
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Verification List */}
      <VerificationList
        verifications={verifications}
        onSelect={setSelectedVerification}
        onApprove={handleApprove}
        onReject={handleReject}
        onAssign={handleAssign}
      />

      {/* Verification Details Modal */}
      {selectedVerification && (
        <VerificationDetailsModal
          verification={selectedVerification}
          open={!!selectedVerification}
          onClose={() => setSelectedVerification(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}

      {/* Bulk Assignment Modal */}
      <BulkAssignmentModal
        open={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        verifications={verifications.filter(v => v.status === 'PENDING')}
        onAssign={handleAssign}
      />
    </Container>
  );
};
```

### Dispute Management Component
```typescript
const DisputeManagement: React.FC = () => {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [showResolutionModal, setShowResolutionModal] = useState(false);

  const { data: disputeStats } = useGetDisputeStatsQuery();

  useEffect(() => {
    loadDisputes();
  }, []);

  const loadDisputes = async () => {
    try {
      const response = await disputeService.getDisputes();
      setDisputes(response.data);
    } catch (error) {
      console.error('Error loading disputes:', error);
    }
  };

  const handleAssignDispute = async (disputeId: string, adminId: string) => {
    try {
      await disputeService.assignDispute(disputeId, adminId);
      loadDisputes();
      toast.success('Dispute assigned successfully');
    } catch (error) {
      toast.error('Failed to assign dispute');
    }
  };

  const handleResolveDispute = async (disputeId: string, resolution: DisputeResolution) => {
    try {
      await disputeService.resolveDispute(disputeId, resolution);
      loadDisputes();
      setShowResolutionModal(false);
      toast.success('Dispute resolved successfully');
    } catch (error) {
      toast.error('Failed to resolve dispute');
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dispute Management
        </Typography>

        {/* Dispute Stats */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Open Disputes"
              value={disputeStats?.open || 0}
              icon={<ReportProblemIcon />}
              color="error"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="In Progress"
              value={disputeStats?.inProgress || 0}
              icon={<WorkIcon />}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Resolved Today"
              value={disputeStats?.resolvedToday || 0}
              icon={<CheckCircleIcon />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Avg Resolution Time"
              value={`${disputeStats?.avgResolutionTime || 0}h`}
              icon={<TimerIcon />}
              color="info"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Dispute List */}
      <DisputeList
        disputes={disputes}
        onSelect={setSelectedDispute}
        onAssign={handleAssignDispute}
      />

      {/* Dispute Details Modal */}
      {selectedDispute && (
        <DisputeDetailsModal
          dispute={selectedDispute}
          open={!!selectedDispute}
          onClose={() => setSelectedDispute(null)}
          onCommunicate={() => setShowCommunicationModal(true)}
          onResolve={() => setShowResolutionModal(true)}
        />
      )}

      {/* Communication Modal */}
      <DisputeCommunicationModal
        open={showCommunicationModal}
        onClose={() => setShowCommunicationModal(false)}
        dispute={selectedDispute}
        onSend={(message) => {/* Handle send */}}
      />

      {/* Resolution Modal */}
      <DisputeResolutionModal
        open={showResolutionModal}
        onClose={() => setShowResolutionModal(false)}
        dispute={selectedDispute}
        onResolve={handleResolveDispute}
      />
    </Container>
  );
};
```

## DEPLOYMENT & MONITORING

### Security Features
- **Multi-Factor Authentication**: TOTP-based MFA for admin accounts
- **Role-Based Access Control**: Granular permissions system
- **Audit Logging**: Complete audit trail for all admin actions
- **Session Management**: Secure session handling with timeout
- **IP Whitelisting**: Restrict admin access to specific IP ranges

### Performance Monitoring
- **Real-time Dashboards**: Live system metrics and KPIs
- **Alert System**: Automated alerts for critical issues
- **Performance Metrics**: Response times, error rates, throughput
- **Resource Monitoring**: CPU, memory, database performance
- **User Experience Monitoring**: Page load times, user interactions

### Backup & Recovery
- **Automated Backups**: Daily database and file backups
- **Point-in-Time Recovery**: Ability to restore to specific timestamps
- **Disaster Recovery**: Multi-region backup strategy
- **Data Retention**: Configurable retention policies
- **Backup Verification**: Regular backup integrity checks

This comprehensive specification provides everything needed to build a production-ready Platform Admin Application with complete user management, verification workflows, dispute resolution, analytics, and system administration capabilities.