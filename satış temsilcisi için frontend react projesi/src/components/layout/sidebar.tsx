import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import { sidebarNav } from '@/data/mock'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/icon'
import { cn } from '@/lib/utils'

type SidebarProps = {
  collapsed: boolean
  onToggle: () => void
  onLogout?: () => void
}

export const Sidebar = ({ collapsed, onToggle, onLogout }: SidebarProps) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const links = useMemo(() => sidebarNav, [])

  return (
    <motion.aside
      animate={{ width: collapsed ? 88 : 256 }}
      className="hidden h-full flex-col border-r bg-card/80 p-4 shadow-sm lg:flex"
    >
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <img
            src="/doni-logo.png"
            alt="Doni Global"
            className="h-9 w-auto object-contain"
          />
          {!collapsed && (
            <div>
              <p className="text-base font-semibold text-foreground">
                Dijital Dönüşüm Paneli
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                Doni Global
              </p>
            </div>
          )}
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={onToggle}
          className="text-muted-foreground"
        >
          <Icon name="Menu" className="h-4 w-4" />
          <span className="sr-only">Sidebar daralt</span>
        </Button>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {links.map((link) => {
          const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
          return (
            <button
              key={link.label}
              onClick={() => navigate(link.href)}
              className={cn(
                'group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-muted-foreground transition hover:bg-muted/70 hover:text-foreground',
                isActive && 'bg-primary/10 text-primary shadow-inner',
                collapsed && 'justify-center px-0',
              )}
            >
              <Icon
                name={link.icon}
                className={cn(
                  'h-5 w-5 transition',
                  isActive ? 'text-primary' : 'text-muted-foreground',
                )}
              />
              {!collapsed && <span>{link.label}</span>}
            </button>
          )
        })}
      </nav>

      <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground">
        {!collapsed ? (
          <>
            <p className="font-semibold text-primary">Sürüm 2.1</p>
            <p>Yeni KPI kitleri hazır. Demo müşterileriniz için aktive edin.</p>
          </>
        ) : (
          <p className="text-center font-semibold text-primary">v2.1</p>
        )}
      </div>

      <Button
        variant="ghost"
        className="mt-4 gap-2 text-sm text-muted-foreground hover:text-destructive"
        onClick={onLogout}
      >
        <Icon name="LogOut" className="h-4 w-4" />
        {!collapsed && 'Logout'}
      </Button>
    </motion.aside>
  )
}

