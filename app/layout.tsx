import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Super App Ethiopia',
  description: 'Food, grocery, marketplace, courier and payments in one app.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}