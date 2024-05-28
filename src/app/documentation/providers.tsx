'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="className" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}