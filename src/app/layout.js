import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'My Portfolio',
  description: 'Professional portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        {children}
      </body>
    </html>
  )
}