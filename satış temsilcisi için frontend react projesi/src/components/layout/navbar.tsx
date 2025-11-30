import { Bell, Menu, Search } from 'lucide-react'
import { useMemo } from 'react'

import { notifications } from '@/data/mock'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ThemeToggle } from '@/components/theme-toggle'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Sidebar } from '@/components/layout/sidebar'

type NavbarProps = {
  onMenuClick: () => void
  onLogout?: () => void
}

export const Navbar = ({ onMenuClick, onLogout }: NavbarProps) => {
  const notif = useMemo(() => notifications, [])

  return (
    <header className="sticky top-0 z-40 h-20 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-3 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="p-0">
              <Sidebar collapsed={false} onToggle={onMenuClick} onLogout={onLogout} />
            </SheetContent>
          </Sheet>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Hoş geldin</p>
            <p className="text-lg font-semibold text-foreground">Bayram Yusuf Yılmaz</p>
          </div>
        </div>

        <div className="hidden flex-1 items-center gap-3 lg:flex">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-2xl"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Panel içinde ara..."
              className="h-12 rounded-2xl border-none bg-muted/70 pl-12"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-2xl">
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Bildirimler</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notif.map((item) => (
                <DropdownMenuItem key={item.id} className="flex-col items-start gap-1">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.time} önce</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-3 rounded-2xl px-2">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>BY</AvatarFallback>
                </Avatar>
                <div className="hidden text-left lg:block">
                  <p className="text-sm font-semibold">Bayram Yusuf Yılmaz</p>
                  <p className="text-xs text-muted-foreground">Doni Global · Bilişim Teknolojileri</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Profil</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profil Ayarları</DropdownMenuItem>
              <DropdownMenuItem>Bildirimler</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={onLogout}>
                Çıkış Yap
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

