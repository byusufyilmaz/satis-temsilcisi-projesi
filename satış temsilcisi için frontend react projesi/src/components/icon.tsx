import {
  Activity,
  Bell,
  Briefcase,
  Calendar,
  FileText,
  Globe,
  Handshake,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Presentation,
  Search,
  Settings,
  ShoppingBag,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'

const iconMap = {
  Activity,
  Bell,
  Briefcase,
  Calendar,
  FileText,
  Globe,
  Handshake,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  PresentationChart: Presentation,
  Search,
  Settings,
  ShoppingBag,
  TrendingUp,
  Users,
  Wallet,
}

export type IconName = keyof typeof iconMap

export const Icon = ({
  name,
  className,
}: {
  name: IconName
  className?: string
}) => {
  const LucideIcon = iconMap[name] ?? iconMap.LayoutDashboard
  return <LucideIcon className={className} />
}




