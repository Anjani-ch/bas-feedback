import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

declare global {
	var db: PostgresJsDatabase<typeof schema> | undefined
}

let db: PostgresJsDatabase<typeof schema>

if (process.env.NODE_ENV === 'production') {
	db = drizzle(postgres(process.env.DATABASE_URL!))
} else {
	if (!global.db) {
		global.db = drizzle(postgres(process.env.DATABASE_URL!))
	}

	db = global.db
}

export { db }
