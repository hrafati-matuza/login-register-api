import Navigation from "./navbar"
import '@/app/global_styles.css';
export const metadata = {
  title: 'Login/Signup',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
