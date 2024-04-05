import {
  uuid,
  boolean,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core'

// Users Table
export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    profile_img: text('profile_img'),
    email_verified_at: timestamp('email_verified_at'),
    password: text('password').notNull(),
    is_suspended: boolean('is_suspended').default(false),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
  },
  (table) => {
    return {
      email_index: uniqueIndex('email_index').on(table.email),
    }
  }
)
