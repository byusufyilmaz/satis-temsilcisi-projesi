import { Moon, Sun } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Tema değiştir</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem
          className={theme === 'light' ? 'text-primary' : ''}
          onClick={() => setTheme('light')}
        >
          Aydınlık
        </DropdownMenuItem>
        <DropdownMenuItem
          className={theme === 'dark' ? 'text-primary' : ''}
          onClick={() => setTheme('dark')}
        >
          Karanlık
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}




