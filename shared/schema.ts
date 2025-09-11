import { pgTable, serial, text, integer, boolean, timestamp, varchar, json } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  phone: text('phone'),
  role: text('role').notNull().default('tenant'), // 'tenant', 'owner', 'admin'
  isVerified: boolean('is_verified').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// Properties table
export const properties = pgTable('properties', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  address: text('address'),
  location: text('location'),
  price: integer('price'),
  bedrooms: integer('bedrooms').notNull().default(1),
  bathrooms: integer('bathrooms').notNull().default(1),
  area: integer('area').notNull().default(0),
  images: json('images').$type<string[]>().notNull().default([]),
  propertyType: text('property_type').notNull().default('apartment'),
  ownerId: integer('owner_id').notNull().references(() => users.id),
  status: text('status').notNull().default('pending'), // 'pending', 'verified'
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// Bookings table
export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  propertyId: integer('property_id').notNull().references(() => properties.id),
  tenantId: integer('tenant_id').notNull().references(() => users.id),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  status: text('status').notNull().default('active'), // 'active', 'cancelled', 'completed'
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// Furniture orders table
export const furnitureOrders = pgTable('furniture_orders', {
  id: serial('id').primaryKey(),
  propertyId: integer('property_id').notNull().references(() => properties.id),
  items: json('items').$type<{ name: string; quantity: number }[]>().notNull().default([]),
  status: text('status').notNull().default('pending'), // 'pending', 'delivered'
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// Favorites table (for user favorites)
export const favorites = pgTable('favorites', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  propertyId: integer('property_id').notNull().references(() => properties.id),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  properties: many(properties),
  bookings: many(bookings),
  favorites: many(favorites)
}));

export const propertiesRelations = relations(properties, ({ one, many }) => ({
  owner: one(users, { fields: [properties.ownerId], references: [users.id] }),
  bookings: many(bookings),
  furnitureOrders: many(furnitureOrders),
  favorites: many(favorites)
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  property: one(properties, { fields: [bookings.propertyId], references: [properties.id] }),
  tenant: one(users, { fields: [bookings.tenantId], references: [users.id] })
}));

export const furnitureOrdersRelations = relations(furnitureOrders, ({ one }) => ({
  property: one(properties, { fields: [furnitureOrders.propertyId], references: [properties.id] })
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, { fields: [favorites.userId], references: [users.id] }),
  property: one(properties, { fields: [favorites.propertyId], references: [properties.id] })
}));

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Property = typeof properties.$inferSelect;
export type InsertProperty = typeof properties.$inferInsert;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;
export type FurnitureOrder = typeof furnitureOrders.$inferSelect;
export type InsertFurnitureOrder = typeof furnitureOrders.$inferInsert;
export type Favorite = typeof favorites.$inferSelect;
export type InsertFavorite = typeof favorites.$inferInsert;