import { useState, type ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { DashboardLayout } from '@/layouts/dashboard-layout'
import { DashboardPage } from '@/pages/dashboard'
import { LoginPage } from '@/pages/login'
import { PlaceholderPage } from '@/pages/placeholder'
import { CrmPage } from '@/pages/crm'
import { SalesPage } from '@/pages/sales'
import { LeadsPage } from '@/pages/leads'
import { EventsPage } from '@/pages/events'
import { ReportsPage } from '@/pages/reports'

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('dashboard-auth') === 'true'
  })

  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem('dashboard-auth', 'true')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('dashboard-auth')
  }

  const protectedElement = (page: ReactNode) =>
    isAuthenticated ? (
      <DashboardLayout onLogout={handleLogout}>{page}</DashboardLayout>
    ) : (
      <Navigate to="/login" replace />
    )

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/" element={protectedElement(<DashboardPage />)} />
      <Route path="/crm" element={protectedElement(<CrmPage />)} />
      <Route path="/sales" element={protectedElement(<SalesPage />)} />
      <Route path="/leads" element={protectedElement(<LeadsPage />)} />
      <Route path="/events" element={protectedElement(<EventsPage />)} />
      <Route path="/reports" element={protectedElement(<ReportsPage />)} />
      <Route
        path="/analytics"
        element={protectedElement(
          <PlaceholderPage
            title="Analytics Modülü"
            description="Derin analitik ve tahmine dayalı modeller burada yer alacak."
          />,
        )}
      />
      <Route
        path="/users"
        element={protectedElement(
          <PlaceholderPage
            title="Kullanıcı Yönetimi"
            description="Segment bazlı kullanıcı içgörüleri ve roller."
          />,
        )}
      />
      <Route
        path="/settings"
        element={protectedElement(
          <PlaceholderPage
            title="Ayarlar"
            description="Tema, entegrasyon ve yetkilendirme ayarları."
          />,
        )}
      />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />}
      />
    </Routes>
  )
}

