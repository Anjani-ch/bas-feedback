import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2'

const connection = mysql.createConnection({
	host: process.env.DATABASE_HOST!,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME!,
})

connection.connect(err => {
	if (err) {
		console.log(`Error connection to DB: ${err}`)
		return
	}

	console.log('Connected to DB')
})

export const db = drizzle(connection)
