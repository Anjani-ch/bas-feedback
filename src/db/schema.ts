import { pgTable, text, timestamp, varchar, integer, serial } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const users = pgTable('users', {
	id: serial('id').primaryKey().notNull(),
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

export const issues = pgTable('issues', {
	id: serial('id').primaryKey().notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	updatedAt: timestamp('updatedAt')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	fromEmail: text('fromEmail').notNull(),
	priority: integer('priority').notNull(),
	status: integer('status').default(0).notNull(),
	assignedUser: integer('assignedUser').references(() => users.id),
})

export const issueInsertZodSchema = createInsertSchema(issues)
export type IssueInsertZodSchema = z.infer<typeof issueInsertZodSchema>

export const issueSelectZodSchema = createSelectSchema(issues)
export type IssueSelectZodSchema = z.infer<typeof issueInsertZodSchema>

export const comments = pgTable('comments', {
	id: serial('id').primaryKey().notNull(),
	issueId: integer('issueId')
		.references(() => issues.id)
		.notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	updatedAt: timestamp('updatedAt')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
	content: text('content').notNull(),
	type: integer('type').notNull(),
})

export const commentInsertZodSchema = createInsertSchema(comments)
export type CommentInsertZodSchema = z.infer<typeof commentInsertZodSchema>

export const commentSelectZodSchema = createSelectSchema(comments)
export type CommentSelectZodSchema = z.infer<typeof commentInsertZodSchema>
