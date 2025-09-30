import type { ReactNode } from 'react'

// @TODO: to be implemented properly
function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <div className="dark font-sans antialiased">
      <div className="dark:bg-background min-h-screen dark:text-white">
        {children}
      </div>
    </div>
  )
}

export { ThemeProvider }
