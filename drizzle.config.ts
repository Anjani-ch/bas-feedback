import 'dotenv/config'
import { Config } from 'drizzle-kit'

export default {
	schema: './src/db/schema.ts',
	out: './drizzle/migrations',
	driver: 'mysql2',
	dbCredentials: {
		host: process.env.DATABASE_HOST!,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME!,
	},
} satisfies Config
