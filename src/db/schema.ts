import {
	int,
	mysqlTable,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/mysql-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

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

export const userInsertZodSchema = createInsertSchema(users)
export type UserInsertZodSchema = z.infer<typeof userInsertZodSchema>

export const userSelectZodSchema = createSelectSchema(users)
export type UserSelectZodSchema = z.infer<typeof userSelectZodSchema>

export const issues = mysqlTable('issues', {
	id: int('id').primaryKey().autoincrement().notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	fromEmail: text('fromEmail').notNull(),
	priority: int('priority').notNull(),
	status: int('status').default(0).notNull(),
	assignedUser: int('assignedUser').references(() => users.id),
})

export const issueInsertZodSchema = createInsertSchema(issues)
export type IssueInsertZodSchema = z.infer<typeof issueInsertZodSchema>

export const issueSelectZodSchema = createSelectSchema(issues)
export type IssueSelectZodSchema = z.infer<typeof issueInsertZodSchema>

export const comments = mysqlTable('comments', {
	id: int('id').primaryKey().autoincrement().notNull(),
	issueId: int('issueId')
		.references(() => issues.id)
		.notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
	content: text('content').notNull(),
	type: int('type').notNull(),
})

export const commentInsertZodSchema = createInsertSchema(comments)
export type CommentInsertZodSchema = z.infer<typeof commentInsertZodSchema>

export const commentSelectZodSchema = createSelectSchema(comments)
export type CommentSelectZodSchema = z.infer<typeof commentInsertZodSchema>
