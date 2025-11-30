import { useState } from 'react'

import { Sidebar } from '@/components/layout/sidebar'
import { Navbar } from '@/components/layout/navbar'

type DashboardLayoutProps = {
  children: React.ReactNode
  onLogout: () => void
}

export const DashboardLayout = ({ children, onLogout }: DashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => setCollapsed((prev) => !prev)

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} onLogout={onLogout} />
      <div className="flex flex-1 flex-col">
        <Navbar onMenuClick={toggleSidebar} onLogout={onLogout} />
        <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 pb-10 pt-6 sm:px-6 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  )
}

