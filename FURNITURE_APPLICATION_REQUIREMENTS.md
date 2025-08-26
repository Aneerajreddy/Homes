# FURNITURE RENTAL APPLICATION - JAVA FULL-STACK REQUIREMENTS

## PROJECT OVERVIEW
Build a comprehensive furniture rental logistics application using Java Spring Boot backend and React frontend for managing automated furniture orders, inventory, delivery scheduling, and maintenance operations.

## TECHNOLOGY STACK

### Backend Technologies
- **Framework**: Spring Boot 3.x
- **Database**: PostgreSQL with JPA/Hibernate
- **Security**: Spring Security with JWT authentication
- **Messaging**: RabbitMQ or Apache Kafka for order processing
- **Scheduling**: Spring Scheduler for automated tasks
- **File Storage**: AWS S3 for inventory images and documents
- **Mapping**: Google Maps API for delivery routing
- **Notifications**: Firebase Cloud Messaging (FCM)
- **Reporting**: JasperReports for PDF generation
- **Testing**: JUnit 5, Mockito, TestContainers

### Frontend Technologies
- **Framework**: React 18+ with TypeScript
- **State Management**: Redux Toolkit with RTK Query
- **UI Library**: Material-UI with custom theme
- **Maps**: Google Maps React
- **Charts**: Chart.js or D3.js for analytics
- **Calendar**: React Big Calendar for scheduling
- **Barcode**: React Barcode Scanner for inventory
- **Real-time**: Socket.io for live updates

## DATABASE SCHEMA

### Core Entities

```sql
-- Furniture Categories Table
CREATE TABLE furniture_categories (
    id BIGSERIAL PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE NOT NULL,
    category_code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    parent_category_id BIGINT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_category_id) REFERENCES furniture_categories(id)
);

-- Furniture Items Master Table
CREATE TABLE furniture_items (
    id BIGSERIAL PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    item_code VARCHAR(50) UNIQUE NOT NULL,
    category_id BIGINT NOT NULL,
    brand VARCHAR(100),
    model VARCHAR(100),
    description TEXT,
    dimensions VARCHAR(100), -- L x W x H
    weight_kg DECIMAL(8,2),
    color VARCHAR(50),
    material VARCHAR(100),
    rental_price_monthly DECIMAL(10,2) NOT NULL,
    purchase_price DECIMAL(10,2),
    depreciation_rate DECIMAL(5,2) DEFAULT 10.00, -- percentage per year
    minimum_rental_period INTEGER DEFAULT 6, -- months
    maximum_rental_period INTEGER DEFAULT 36, -- months
    setup_required BOOLEAN DEFAULT FALSE,
    assembly_time_minutes INTEGER DEFAULT 0,
    warranty_months INTEGER DEFAULT 12,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES furniture_categories(id)
);

-- Inventory Stock Table
CREATE TABLE inventory_stock (
    id BIGSERIAL PRIMARY KEY,
    item_id BIGINT NOT NULL,
    warehouse_location VARCHAR(255) NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    available_quantity INTEGER NOT NULL DEFAULT 0,
    reserved_quantity INTEGER NOT NULL DEFAULT 0,
    rented_quantity INTEGER NOT NULL DEFAULT 0,
    maintenance_quantity INTEGER NOT NULL DEFAULT 0,
    damaged_quantity INTEGER NOT NULL DEFAULT 0,
    minimum_stock_level INTEGER DEFAULT 5,
    maximum_stock_level INTEGER DEFAULT 100,
    reorder_point INTEGER DEFAULT 10,
    last_stock_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES furniture_items(id),
    UNIQUE(item_id, warehouse_location)
);

-- Individual Furniture Units Table (for tracking specific items)
CREATE TABLE furniture_units (
    id BIGSERIAL PRIMARY KEY,
    item_id BIGINT NOT NULL,
    unit_barcode VARCHAR(100) UNIQUE NOT NULL,
    serial_number VARCHAR(100),
    warehouse_location VARCHAR(255) NOT NULL,
    purchase_date DATE,
    condition_status VARCHAR(50) DEFAULT 'EXCELLENT', -- EXCELLENT, GOOD, FAIR, NEEDS_REPAIR, DAMAGED
    current_status VARCHAR(50) DEFAULT 'AVAILABLE', -- AVAILABLE, RESERVED, RENTED, IN_TRANSIT, MAINTENANCE
    last_maintenance_date DATE,
    next_maintenance_due DATE,
    rental_history_count INTEGER DEFAULT 0,
    total_rental_months INTEGER DEFAULT 0,
    current_value DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES furniture_items(id)
);

-- Furniture Orders Table (from property bookings)
CREATE TABLE furniture_orders (
    id BIGSERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    property_id BIGINT NOT NULL,
    tenant_id BIGINT NOT NULL,
    owner_id BIGINT NOT NULL,
    booking_id BIGINT NOT NULL,
    order_type VARCHAR(50) DEFAULT 'NEW_RENTAL', -- NEW_RENTAL, REPLACEMENT, ADDITIONAL, RETURN
    order_status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, CONFIRMED, PROCESSING, PACKED, DISPATCHED, DELIVERED, SETUP_COMPLETE, CANCELLED
    priority_level VARCHAR(20) DEFAULT 'NORMAL', -- LOW, NORMAL, HIGH, URGENT
    delivery_address TEXT NOT NULL,
    delivery_city VARCHAR(100) NOT NULL,
    delivery_pincode VARCHAR(10) NOT NULL,
    delivery_latitude DECIMAL(10, 8),
    delivery_longitude DECIMAL(11, 8),
    requested_delivery_date DATE NOT NULL,
    confirmed_delivery_date DATE,
    actual_delivery_date DATE,
    setup_required BOOLEAN DEFAULT TRUE,
    setup_scheduled_date DATE,
    setup_completed_date DATE,
    total_items_count INTEGER DEFAULT 0,
    total_monthly_cost DECIMAL(10,2) DEFAULT 0,
    setup_charges DECIMAL(10,2) DEFAULT 0,
    delivery_charges DECIMAL(10,2) DEFAULT 0,
    special_instructions TEXT,
    order_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    item_id BIGINT NOT NULL,
    quantity_requested INTEGER NOT NULL,
    quantity_allocated INTEGER DEFAULT 0,
    quantity_delivered INTEGER DEFAULT 0,
    monthly_rental_rate DECIMAL(10,2) NOT NULL,
    total_monthly_cost DECIMAL(10,2) NOT NULL,
    item_status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, ALLOCATED, PACKED, DELIVERED, SETUP_COMPLETE
    special_requirements TEXT,
    allocated_units TEXT[], -- Array of unit barcodes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES furniture_orders(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES furniture_items(id)
);

-- Delivery Schedules Table
CREATE TABLE delivery_schedules (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    delivery_date DATE NOT NULL,
    delivery_time_slot VARCHAR(50) NOT NULL, -- MORNING, AFTERNOON, EVENING
    delivery_team_id BIGINT,
    vehicle_number VARCHAR(20),
    driver_name VARCHAR(100),
    driver_phone VARCHAR(15),
    delivery_status VARCHAR(50) DEFAULT 'SCHEDULED', -- SCHEDULED, IN_TRANSIT, DELIVERED, FAILED, RESCHEDULED
    departure_time TIMESTAMP,
    arrival_time TIMESTAMP,
    completion_time TIMESTAMP,
    delivery_notes TEXT,
    customer_signature_url VARCHAR(500),
    delivery_photos TEXT[], -- Array of photo URLs
    failed_reason TEXT,
    reschedule_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES furniture_orders(id)
);

-- Setup Services Table
CREATE TABLE setup_services (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    technician_id BIGINT,
    scheduled_date DATE NOT NULL,
    scheduled_time_slot VARCHAR(50) NOT NULL,
    setup_status VARCHAR(50) DEFAULT 'SCHEDULED', -- SCHEDULED, IN_PROGRESS, COMPLETED, FAILED, RESCHEDULED
    start_time TIMESTAMP,
    completion_time TIMESTAMP,
    items_setup TEXT[], -- Array of item IDs that were set up
    setup_notes TEXT,
    customer_satisfaction_rating INTEGER, -- 1-5 rating
    customer_feedback TEXT,
    before_photos TEXT[], -- Array of photo URLs
    after_photos TEXT[], -- Array of photo URLs
    failed_reason TEXT,
    reschedule_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES furniture_orders(id)
);

-- Maintenance Requests Table
CREATE TABLE maintenance_requests (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT,
    unit_id BIGINT NOT NULL,
    request_type VARCHAR(50) NOT NULL, -- REPAIR, REPLACEMENT, CLEANING, INSPECTION
    priority VARCHAR(20) DEFAULT 'MEDIUM', -- LOW, MEDIUM, HIGH, URGENT
    description TEXT NOT NULL,
    reported_by VARCHAR(100), -- TENANT, DELIVERY_TEAM, TECHNICIAN, SYSTEM
    reported_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    scheduled_date DATE,
    assigned_technician_id BIGINT,
    maintenance_status VARCHAR(50) DEFAULT 'OPEN', -- OPEN, ASSIGNED, IN_PROGRESS, COMPLETED, CANCELLED
    estimated_cost DECIMAL(10,2),
    actual_cost DECIMAL(10,2),
    parts_required TEXT[],
    work_performed TEXT,
    completion_date TIMESTAMP,
    before_photos TEXT[],
    after_photos TEXT[],
    customer_approval_required BOOLEAN DEFAULT FALSE,
    customer_approved BOOLEAN DEFAULT FALSE,
    warranty_claim BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES furniture_orders(id),
    FOREIGN KEY (unit_id) REFERENCES furniture_units(id)
);

-- Return Orders Table
CREATE TABLE return_orders (
    id BIGSERIAL PRIMARY KEY,
    original_order_id BIGINT NOT NULL,
    return_order_number VARCHAR(50) UNIQUE NOT NULL,
    return_type VARCHAR(50) NOT NULL, -- FULL_RETURN, PARTIAL_RETURN, EARLY_TERMINATION
    return_reason VARCHAR(100), -- LEASE_END, RELOCATION, DAMAGE, CUSTOMER_REQUEST
    requested_return_date DATE NOT NULL,
    scheduled_pickup_date DATE,
    actual_pickup_date DATE,
    return_status VARCHAR(50) DEFAULT 'REQUESTED', -- REQUESTED, APPROVED, SCHEDULED, PICKED_UP, INSPECTED, COMPLETED
    items_to_return TEXT[], -- Array of unit barcodes
    pickup_address TEXT NOT NULL,
    pickup_notes TEXT,
    inspection_notes TEXT,
    refund_amount DECIMAL(10,2) DEFAULT 0,
    penalty_amount DECIMAL(10,2) DEFAULT 0,
    damage_charges DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (original_order_id) REFERENCES furniture_orders(id)
);

-- Delivery Teams Table
CREATE TABLE delivery_teams (
    id BIGSERIAL PRIMARY KEY,
    team_name VARCHAR(100) NOT NULL,
    team_leader_name VARCHAR(100) NOT NULL,
    team_leader_phone VARCHAR(15) NOT NULL,
    team_size INTEGER DEFAULT 2,
    service_areas TEXT[], -- Array of pincodes/areas they serve
    vehicle_type VARCHAR(50), -- TRUCK, VAN, PICKUP
    vehicle_number VARCHAR(20),
    vehicle_capacity_cubic_feet INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    current_location_lat DECIMAL(10, 8),
    current_location_lng DECIMAL(11, 8),
    last_location_update TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Technicians Table
CREATE TABLE technicians (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(255),
    specializations TEXT[], -- Array of furniture categories they can handle
    service_areas TEXT[], -- Array of pincodes/areas they serve
    experience_years INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00, -- Average rating from customers
    total_jobs_completed INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    current_location_lat DECIMAL(10, 8),
    current_location_lng DECIMAL(11, 8),
    last_location_update TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## BACKEND API ENDPOINTS

### Order Management APIs
```java
GET /api/furniture/orders - Get all orders with filters
GET /api/furniture/orders/{id} - Get order details
PUT /api/furniture/orders/{id}/status - Update order status
POST /api/furniture/orders/{id}/allocate-items - Allocate inventory items
PUT /api/furniture/orders/{id}/confirm - Confirm order
POST /api/furniture/orders/{id}/schedule-delivery - Schedule delivery
GET /api/furniture/orders/pending - Get pending orders
GET /api/furniture/orders/today-deliveries - Get today's deliveries
```

### Inventory Management APIs
```java
GET /api/furniture/inventory - Get inventory with filters
GET /api/furniture/inventory/{itemId}/stock - Get stock levels
PUT /api/furniture/inventory/{itemId}/adjust-stock - Adjust stock quantity
POST /api/furniture/inventory/items - Add new furniture item
PUT /api/furniture/inventory/items/{id} - Update furniture item
GET /api/furniture/inventory/low-stock - Get low stock alerts
POST /api/furniture/inventory/units/{unitId}/maintenance - Schedule maintenance
GET /api/furniture/inventory/categories - Get furniture categories
```

### Delivery Management APIs
```java
GET /api/furniture/deliveries - Get delivery schedules
POST /api/furniture/deliveries/{id}/start - Start delivery
PUT /api/furniture/deliveries/{id}/complete - Complete delivery
POST /api/furniture/deliveries/{id}/reschedule - Reschedule delivery
GET /api/furniture/deliveries/routes - Get optimized delivery routes
POST /api/furniture/deliveries/{id}/upload-photos - Upload delivery photos
```

### Setup Services APIs
```java
GET /api/furniture/setup - Get setup schedules
POST /api/furniture/setup/{id}/start - Start setup service
PUT /api/furniture/setup/{id}/complete - Complete setup
POST /api/furniture/setup/{id}/reschedule - Reschedule setup
GET /api/furniture/setup/technicians - Get available technicians
POST /api/furniture/setup/{id}/feedback - Submit customer feedback
```

### Maintenance APIs
```java
GET /api/furniture/maintenance/requests - Get maintenance requests
POST /api/furniture/maintenance/requests - Create maintenance request
PUT /api/furniture/maintenance/requests/{id}/assign - Assign technician
PUT /api/furniture/maintenance/requests/{id}/complete - Complete maintenance
GET /api/furniture/maintenance/schedule - Get maintenance schedule
POST /api/furniture/maintenance/{id}/parts-order - Order replacement parts
```

### Analytics & Reports APIs
```java
GET /api/furniture/analytics/dashboard - Get dashboard analytics
GET /api/furniture/analytics/inventory-turnover - Get inventory turnover
GET /api/furniture/analytics/delivery-performance - Get delivery metrics
GET /api/furniture/analytics/maintenance-costs - Get maintenance cost analysis
GET /api/furniture/reports/monthly-summary - Generate monthly report
GET /api/furniture/reports/inventory-valuation - Generate inventory report
```

## BACKEND IMPLEMENTATION

### Order Processing Service
```java
@Service
@Transactional
public class OrderProcessingService {
    
    @Autowired
    private FurnitureOrderRepository orderRepository;
    
    @Autowired
    private InventoryService inventoryService;
    
    @Autowired
    private DeliverySchedulingService deliveryService;
    
    @EventListener
    public void handleNewBooking(BookingCreatedEvent event) {
        // Automatically create furniture order when property is booked
        FurnitureOrder order = createOrderFromBooking(event.getBooking());
        processNewOrder(order);
    }
    
    public FurnitureOrder createOrderFromBooking(Booking booking) {
        Property property = booking.getProperty();
        List<String> requiredItems = determineRequiredFurniture(property);
        
        FurnitureOrder order = new FurnitureOrder();
        order.setOrderNumber(generateOrderNumber());
        order.setPropertyId(booking.getPropertyId());
        order.setTenantId(booking.getTenantId());
        order.setOwnerId(booking.getOwnerId());
        order.setBookingId(booking.getId());
        order.setDeliveryAddress(property.getFullAddress());
        order.setRequestedDeliveryDate(booking.getMoveInDate());
        
        FurnitureOrder savedOrder = orderRepository.save(order);
        
        // Create order items based on property amenities
        createOrderItems(savedOrder, requiredItems);
        
        return savedOrder;
    }
    
    public void processNewOrder(FurnitureOrder order) {
        // 1. Validate order
        validateOrder(order);
        
        // 2. Check inventory availability
        boolean itemsAvailable = inventoryService.checkAvailability(order);
        
        if (itemsAvailable) {
            // 3. Allocate items
            inventoryService.allocateItems(order);
            
            // 4. Schedule delivery
            deliveryService.scheduleDelivery(order);
            
            // 5. Update order status
            order.setOrderStatus(OrderStatus.CONFIRMED);
            orderRepository.save(order);
            
            // 6. Send notifications
            notificationService.sendOrderConfirmation(order);
        } else {
            // Handle insufficient inventory
            handleInsufficientInventory(order);
        }
    }
    
    private List<String> determineRequiredFurniture(Property property) {
        List<String> requiredItems = new ArrayList<>();
        List<String> availableAmenities = property.getAmenities();
        
        // Standard furniture items for all properties
        requiredItems.add("Sofa Set");
        requiredItems.add("Dining Table & Chairs");
        requiredItems.add("Double Bed with Mattress");
        requiredItems.add("Wardrobe");
        requiredItems.add("TV Unit");
        
        // Add items based on bedrooms
        for (int i = 2; i <= property.getBedrooms(); i++) {
            requiredItems.add("Single Bed with Mattress");
        }
        
        // Remove items that are already available in property
        requiredItems.removeIf(item -> availableAmenities.contains(item));
        
        return requiredItems;
    }
}
```

### Inventory Management Service
```java
@Service
@Transactional
public class InventoryService {
    
    @Autowired
    private InventoryStockRepository stockRepository;
    
    @Autowired
    private FurnitureUnitRepository unitRepository;
    
    public boolean checkAvailability(FurnitureOrder order) {
        for (OrderItem item : order.getOrderItems()) {
            InventoryStock stock = stockRepository.findByItemIdAndWarehouseLocation(
                item.getItemId(), determineWarehouse(order.getDeliveryCity())
            );
            
            if (stock == null || stock.getAvailableQuantity() < item.getQuantityRequested()) {
                return false;
            }
        }
        return true;
    }
    
    public void allocateItems(FurnitureOrder order) {
        for (OrderItem orderItem : order.getOrderItems()) {
            List<FurnitureUnit> availableUnits = unitRepository.findAvailableUnits(
                orderItem.getItemId(), 
                determineWarehouse(order.getDeliveryCity()),
                orderItem.getQuantityRequested()
            );
            
            List<String> allocatedBarcodes = new ArrayList<>();
            for (FurnitureUnit unit : availableUnits) {
                unit.setCurrentStatus(UnitStatus.RESERVED);
                unitRepository.save(unit);
                allocatedBarcodes.add(unit.getUnitBarcode());
            }
            
            orderItem.setAllocatedUnits(allocatedBarcodes.toArray(new String[0]));
            orderItem.setQuantityAllocated(allocatedBarcodes.size());
            orderItem.setItemStatus(OrderItemStatus.ALLOCATED);
            
            // Update stock quantities
            updateStockQuantities(orderItem.getItemId(), order.getDeliveryCity(), 
                                orderItem.getQuantityAllocated());
        }
    }
    
    @Scheduled(cron = "0 0 8 * * *") // Daily at 8 AM
    public void checkLowStockAlerts() {
        List<InventoryStock> lowStockItems = stockRepository.findLowStockItems();
        for (InventoryStock stock : lowStockItems) {
            notificationService.sendLowStockAlert(stock);
            
            // Auto-reorder if below critical level
            if (stock.getAvailableQuantity() <= stock.getReorderPoint()) {
                createPurchaseOrder(stock);
            }
        }
    }
    
    public InventoryAnalyticsDTO getInventoryAnalytics() {
        InventoryAnalyticsDTO analytics = new InventoryAnalyticsDTO();
        
        analytics.setTotalItems(stockRepository.getTotalItemsCount());
        analytics.setTotalValue(stockRepository.getTotalInventoryValue());
        analytics.setLowStockCount(stockRepository.countLowStockItems());
        analytics.setUtilizationRate(calculateUtilizationRate());
        analytics.setTopRentedItems(getTopRentedItems());
        
        return analytics;
    }
}
```

### Delivery Scheduling Service
```java
@Service
@Transactional
public class DeliverySchedulingService {
    
    @Autowired
    private DeliveryScheduleRepository scheduleRepository;
    
    @Autowired
    private DeliveryTeamRepository teamRepository;
    
    @Autowired
    private GoogleMapsService mapsService;
    
    public void scheduleDelivery(FurnitureOrder order) {
        // Find available delivery team
        DeliveryTeam availableTeam = findAvailableTeam(
            order.getRequestedDeliveryDate(), 
            order.getDeliveryCity()
        );
        
        if (availableTeam != null) {
            DeliverySchedule schedule = new DeliverySchedule();
            schedule.setOrder(order);
            schedule.setDeliveryDate(order.getRequestedDeliveryDate());
            schedule.setDeliveryTimeSlot(determineTimeSlot(order));
            schedule.setDeliveryTeam(availableTeam);
            schedule.setDeliveryStatus(DeliveryStatus.SCHEDULED);
            
            scheduleRepository.save(schedule);
            
            // Update order status
            order.setConfirmedDeliveryDate(order.getRequestedDeliveryDate());
            order.setOrderStatus(OrderStatus.PROCESSING);
            
            // Send notifications
            notificationService.sendDeliveryScheduleNotification(schedule);
        } else {
            // No team available, reschedule for next available date
            Date nextAvailableDate = findNextAvailableDate(order.getDeliveryCity());
            order.setConfirmedDeliveryDate(nextAvailableDate);
            scheduleDelivery(order); // Recursive call with new date
        }
    }
    
    public List<DeliveryRoute> optimizeDeliveryRoutes(Date deliveryDate, String city) {
        List<DeliverySchedule> scheduledDeliveries = scheduleRepository
            .findByDeliveryDateAndCity(deliveryDate, city);
        
        // Group deliveries by team
        Map<DeliveryTeam, List<DeliverySchedule>> teamDeliveries = scheduledDeliveries
            .stream()
            .collect(Collectors.groupingBy(DeliverySchedule::getDeliveryTeam));
        
        List<DeliveryRoute> optimizedRoutes = new ArrayList<>();
        
        for (Map.Entry<DeliveryTeam, List<DeliverySchedule>> entry : teamDeliveries.entrySet()) {
            DeliveryRoute route = mapsService.optimizeRoute(
                entry.getKey().getCurrentLocation(),
                entry.getValue().stream()
                    .map(schedule -> new Location(
                        schedule.getOrder().getDeliveryLatitude(),
                        schedule.getOrder().getDeliveryLongitude()
                    ))
                    .collect(Collectors.toList())
            );
            
            route.setTeam(entry.getKey());
            route.setDeliveries(entry.getValue());
            optimizedRoutes.add(route);
        }
        
        return optimizedRoutes;
    }
    
    public void completeDelivery(Long scheduleId, DeliveryCompletionRequest request) {
        DeliverySchedule schedule = scheduleRepository.findById(scheduleId)
            .orElseThrow(() -> new DeliveryNotFoundException("Delivery not found"));
        
        schedule.setDeliveryStatus(DeliveryStatus.DELIVERED);
        schedule.setCompletionTime(LocalDateTime.now());
        schedule.setDeliveryNotes(request.getNotes());
        schedule.setCustomerSignatureUrl(request.getSignatureUrl());
        schedule.setDeliveryPhotos(request.getPhotoUrls().toArray(new String[0]));
        
        scheduleRepository.save(schedule);
        
        // Update order status
        FurnitureOrder order = schedule.getOrder();
        order.setActualDeliveryDate(schedule.getDeliveryDate());
        order.setOrderStatus(OrderStatus.DELIVERED);
        
        // Schedule setup service if required
        if (order.isSetupRequired()) {
            setupService.scheduleSetup(order);
        } else {
            order.setOrderStatus(OrderStatus.SETUP_COMPLETE);
        }
        
        // Update furniture unit status
        updateUnitStatusAfterDelivery(order);
        
        // Send completion notification
        notificationService.sendDeliveryCompletionNotification(schedule);
    }
}
```

## FRONTEND IMPLEMENTATION

### Order Management Dashboard
```typescript
const OrderDashboard: React.FC = () => {
  const [orders, setOrders] = useState<FurnitureOrder[]>([]);
  const [filters, setFilters] = useState<OrderFilters>({
    status: 'ALL',
    dateRange: 'TODAY',
    priority: 'ALL'
  });
  const [selectedOrder, setSelectedOrder] = useState<FurnitureOrder | null>(null);

  const { data: dashboardStats, isLoading } = useGetDashboardStatsQuery();

  useEffect(() => {
    loadOrders();
  }, [filters]);

  const loadOrders = async () => {
    try {
      const response = await orderService.getOrders(filters);
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      loadOrders(); // Refresh the list
      toast.success('Order status updated successfully');
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Furniture Order Management
        </Typography>
        
        {/* Dashboard Stats */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Pending Orders"
              value={dashboardStats?.pendingOrders || 0}
              icon={<PendingIcon />}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Today's Deliveries"
              value={dashboardStats?.todayDeliveries || 0}
              icon={<LocalShippingIcon />}
              color="info"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Setup Pending"
              value={dashboardStats?.setupPending || 0}
              icon={<BuildIcon />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Completed Today"
              value={dashboardStats?.completedToday || 0}
              icon={<CheckCircleIcon />}
              color="success"
            />
          </Grid>
        </Grid>

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  label="Status"
                >
                  <MenuItem value="ALL">All Status</MenuItem>
                  <MenuItem value="PENDING">Pending</MenuItem>
                  <MenuItem value="CONFIRMED">Confirmed</MenuItem>
                  <MenuItem value="PROCESSING">Processing</MenuItem>
                  <MenuItem value="DELIVERED">Delivered</MenuItem>
                  <MenuItem value="SETUP_COMPLETE">Setup Complete</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
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
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Delivery Date"
                value={filters.deliveryDate}
                onChange={(date) => setFilters({...filters, deliveryDate: date})}
                renderInput={(params) => <TextField {...params} size="small" fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                onClick={() => setFilters({
                  status: 'ALL',
                  dateRange: 'TODAY',
                  priority: 'ALL'
                })}
                fullWidth
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Orders List */}
      <OrderList
        orders={orders}
        onOrderSelect={setSelectedOrder}
        onStatusUpdate={handleStatusUpdate}
      />

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          open={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdate={loadOrders}
        />
      )}
    </Container>
  );
};
```

### Inventory Management Component
```typescript
const InventoryManagement: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [categories, setCategories] = useState<FurnitureCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);

  const { data: inventoryStats } = useGetInventoryStatsQuery();

  useEffect(() => {
    loadInventory();
    loadCategories();
  }, [selectedCategory, searchTerm]);

  const loadInventory = async () => {
    try {
      const response = await inventoryService.getInventory({
        category: selectedCategory,
        search: searchTerm,
        includeStock: true
      });
      setInventory(response.data);
    } catch (error) {
      console.error('Error loading inventory:', error);
    }
  };

  const handleStockAdjustment = async (itemId: string, adjustment: StockAdjustment) => {
    try {
      await inventoryService.adjustStock(itemId, adjustment);
      loadInventory();
      toast.success('Stock adjusted successfully');
    } catch (error) {
      toast.error('Failed to adjust stock');
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">
            Inventory Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setShowAddItem(true)}
          >
            Add New Item
          </Button>
        </Box>

        {/* Inventory Stats */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Total Items"
              value={inventoryStats?.totalItems || 0}
              icon={<InventoryIcon />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Total Value"
              value={`₹${(inventoryStats?.totalValue || 0).toLocaleString()}`}
              icon={<AttachMoneyIcon />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Low Stock Items"
              value={inventoryStats?.lowStockCount || 0}
              icon={<WarningIcon />}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Utilization Rate"
              value={`${inventoryStats?.utilizationRate || 0}%`}
              icon={<TrendingUpIcon />}
              color="info"
            />
          </Grid>
        </Grid>

        {/* Search and Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="ALL">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSearchTerm('');
                }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Inventory Table */}
      <InventoryTable
        items={inventory}
        onStockAdjust={handleStockAdjustment}
        onItemEdit={(item) => {/* Handle edit */}}
        onItemDelete={(itemId) => {/* Handle delete */}}
      />

      {/* Add Item Modal */}
      <AddItemModal
        open={showAddItem}
        onClose={() => setShowAddItem(false)}
        categories={categories}
        onItemAdded={loadInventory}
      />
    </Container>
  );
};
```

### Delivery Tracking Component
```typescript
const DeliveryTracking: React.FC = () => {
  const [deliveries, setDeliveries] = useState<DeliverySchedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.2090 }); // Delhi
  const [selectedDelivery, setSelectedDelivery] = useState<DeliverySchedule | null>(null);

  const mapRef = useRef<google.maps.Map>();

  useEffect(() => {
    loadDeliveries();
  }, [selectedDate]);

  const loadDeliveries = async () => {
    try {
      const response = await deliveryService.getDeliveries({
        date: selectedDate,
        includeRoutes: true
      });
      setDeliveries(response.data);
    } catch (error) {
      console.error('Error loading deliveries:', error);
    }
  };

  const handleDeliveryStart = async (deliveryId: string) => {
    try {
      await deliveryService.startDelivery(deliveryId);
      loadDeliveries();
      toast.success('Delivery started');
    } catch (error) {
      toast.error('Failed to start delivery');
    }
  };

  const handleDeliveryComplete = async (deliveryId: string, completionData: DeliveryCompletion) => {
    try {
      await deliveryService.completeDelivery(deliveryId, completionData);
      loadDeliveries();
      toast.success('Delivery completed');
    } catch (error) {
      toast.error('Failed to complete delivery');
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Delivery Tracking
        </Typography>
        
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <DatePicker
                label="Delivery Date"
                value={selectedDate}
                onChange={(date) => setSelectedDate(date || new Date())}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                startIcon={<RouteIcon />}
                onClick={() => {/* Optimize routes */}}
                fullWidth
              >
                Optimize Routes
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={loadDeliveries}
                fullWidth
              >
                Refresh
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Grid container spacing={3}>
        {/* Map View */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ height: 600, position: 'relative' }}>
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={mapCenter}
              zoom={11}
              onLoad={(map) => { mapRef.current = map; }}
            >
              {deliveries.map((delivery) => (
                <Marker
                  key={delivery.id}
                  position={{
                    lat: delivery.order.deliveryLatitude,
                    lng: delivery.order.deliveryLongitude
                  }}
                  icon={{
                    url: getDeliveryStatusIcon(delivery.deliveryStatus),
                    scaledSize: new google.maps.Size(32, 32)
                  }}
                  onClick={() => setSelectedDelivery(delivery)}
                />
              ))}
              
              {selectedDelivery && (
                <InfoWindow
                  position={{
                    lat: selectedDelivery.order.deliveryLatitude,
                    lng: selectedDelivery.order.deliveryLongitude
                  }}
                  onCloseClick={() => setSelectedDelivery(null)}
                >
                  <DeliveryInfoCard delivery={selectedDelivery} />
                </InfoWindow>
              )}
            </GoogleMap>
          </Paper>
        </Grid>

        {/* Delivery List */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ height: 600, overflow: 'auto' }}>
            <List>
              {deliveries.map((delivery) => (
                <DeliveryListItem
                  key={delivery.id}
                  delivery={delivery}
                  onStart={() => handleDeliveryStart(delivery.id)}
                  onComplete={(data) => handleDeliveryComplete(delivery.id, data)}
                  onSelect={() => setSelectedDelivery(delivery)}
                  selected={selectedDelivery?.id === delivery.id}
                />
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
```

## DEPLOYMENT & MONITORING

### Docker Configuration
```dockerfile
# Backend Dockerfile
FROM openjdk:17-jdk-slim
VOLUME /tmp
COPY target/furniture-app.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]

# Frontend Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Monitoring & Alerts
- **Application Metrics**: Micrometer with Prometheus
- **Database Monitoring**: Connection pool and query performance
- **Inventory Alerts**: Low stock, high demand items
- **Delivery Tracking**: Real-time location updates
- **Performance Monitoring**: Response times, error rates

This comprehensive specification provides everything needed to build a production-ready Furniture Rental Application with complete order management, inventory tracking, delivery scheduling, and maintenance operations.