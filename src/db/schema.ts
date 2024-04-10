import {
	int,
	mysqlTable,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/mysql-core'

export const users = mysqlTable('users', {
	id: int('id').primaryKey().autoincrement().notNull(),
	name: text('name').notNull(),
	email: varchar('email', {
		length: 256,
	})
		.unique()
		.notNull(),
	passwordHash: text('passwordHash').notNull(),
})

export const issues = mysqlTable('issues', {
	id: int('id').primaryKey().autoincrement().notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	updatedAt: timestamp('updatedAt').defaultNow().notNull(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	fromEmail: text('fromEmail').notNull(),
	priority: int('priority').notNull(),
	status: int('status').default(0).notNull(),
	assignedUser: int('assignedUser').references(() => users.id),
})

export const comments = mysqlTable('comments', {
	id: int('id').primaryKey().autoincrement().notNull(),
	issueId: int('issueId')
		.references(() => issues.id)
		.notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	updatedAt: timestamp('updatedAt').defaultNow().notNull(),
	content: text('content').notNull(),
	type: int('type').notNull(),
})
