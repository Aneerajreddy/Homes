const { Pool } = require('@neondatabase/serverless');
const { drizzle } = require('drizzle-orm/neon-serverless');
const { users, properties, bookings, furnitureOrders, favorites } = require('../schema');
const { eq, and } = require('drizzle-orm');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema: { users, properties, bookings, furnitureOrders, favorites } });

// User operations
const userService = {
  async findById(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || null;
  },

  async findByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || null;
  },

  async create(userData) {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  },

  async updateById(id, updates) {
    const [user] = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return user;
  }
};

// Property operations
const propertyService = {
  async findAll() {
    return await db.select().from(properties);
  },

  async findById(id) {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property || null;
  },

  async findByOwner(ownerId) {
    return await db.select().from(properties).where(eq(properties.ownerId, ownerId));
  },

  async create(propertyData) {
    const [property] = await db.insert(properties).values(propertyData).returning();
    return property;
  },

  async updateById(id, updates) {
    const [property] = await db.update(properties).set(updates).where(eq(properties.id, id)).returning();
    return property;
  },

  async deleteById(id) {
    const [deletedProperty] = await db.delete(properties).where(eq(properties.id, id)).returning();
    return deletedProperty;
  }
};

// Booking operations
const bookingService = {
  async findAll() {
    return await db.select().from(bookings);
  },

  async findById(id) {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || null;
  },

  async findByTenant(tenantId) {
    return await db.select().from(bookings).where(eq(bookings.tenantId, tenantId));
  },

  async create(bookingData) {
    const [booking] = await db.insert(bookings).values(bookingData).returning();
    return booking;
  },

  async updateById(id, updates) {
    const [booking] = await db.update(bookings).set(updates).where(eq(bookings.id, id)).returning();
    return booking;
  },

  async deleteById(id) {
    const [deletedBooking] = await db.delete(bookings).where(eq(bookings.id, id)).returning();
    return deletedBooking;
  }
};

// Furniture order operations
const furnitureOrderService = {
  async findAll() {
    return await db.select().from(furnitureOrders);
  },

  async findById(id) {
    const [order] = await db.select().from(furnitureOrders).where(eq(furnitureOrders.id, id));
    return order || null;
  },

  async create(orderData) {
    const [order] = await db.insert(furnitureOrders).values(orderData).returning();
    return order;
  },

  async updateById(id, updates) {
    const [order] = await db.update(furnitureOrders).set(updates).where(eq(furnitureOrders.id, id)).returning();
    return order;
  },

  async deleteById(id) {
    const [deletedOrder] = await db.delete(furnitureOrders).where(eq(furnitureOrders.id, id)).returning();
    return deletedOrder;
  }
};

// Favorites operations
const favoriteService = {
  async findByUser(userId) {
    return await db.select().from(favorites).where(eq(favorites.userId, userId));
  },

  async findUserFavorite(userId, propertyId) {
    const [favorite] = await db.select().from(favorites).where(
      and(eq(favorites.userId, userId), eq(favorites.propertyId, propertyId))
    );
    return favorite || null;
  },

  async create(favoriteData) {
    const [favorite] = await db.insert(favorites).values(favoriteData).returning();
    return favorite;
  },

  async deleteUserFavorite(userId, propertyId) {
    const [deletedFavorite] = await db.delete(favorites).where(
      and(eq(favorites.userId, userId), eq(favorites.propertyId, propertyId))
    ).returning();
    return deletedFavorite;
  }
};

module.exports = {
  db,
  userService,
  propertyService,
  bookingService,
  furnitureOrderService,
  favoriteService
};