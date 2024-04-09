import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Bas feedback',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<header className='container text-5xl mt-12'>Bas feedback</header>

				<div className='container'>
					<main>{children}</main>
					<Toaster />
				</div>
			</body>
		</html>
	)
}
