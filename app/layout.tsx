import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rechart App',
  description: 'Generate Professional Charts with AI Intelligence',
  generator: 'Rechart App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
