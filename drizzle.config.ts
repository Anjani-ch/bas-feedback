import 'dotenv/config'
import { Config } from 'drizzle-kit'

export default {
	schema: './src/db/schema.ts',
	out: './drizzle/migrations',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.POSTGRES_URL!,
	},
} satisfies Config
