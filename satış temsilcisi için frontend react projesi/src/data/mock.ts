import type { IconName } from '@/components/icon'

export type KpiCard = {
  id: string
  label: string
  value: string
  change: number
  trend: 'up' | 'down'
  icon: IconName
}

export const kpiCards: KpiCard[] = [
  {
    id: 'revenue',
    label: 'Toplam Gelir',
    value: '₺124K',
    change: 12,
    trend: 'up',
    icon: 'Wallet',
  },
  {
    id: 'users',
    label: 'Aktif Kullanıcı',
    value: '5.320',
    change: 8,
    trend: 'up',
    icon: 'Users',
  },
  {
    id: 'orders',
    label: 'Yeni Sipariş',
    value: '812',
    change: -3,
    trend: 'down',
    icon: 'ShoppingBag',
  },
  {
    id: 'growth',
    label: 'Büyüme Oranı',
    value: '%18,4',
    change: 5,
    trend: 'up',
    icon: 'TrendingUp',
  },
]

export const monthlyRevenue = [
  { month: 'Oca', gelir: 72 },
  { month: 'Şub', gelir: 65 },
  { month: 'Mar', gelir: 78 },
  { month: 'Nis', gelir: 84 },
  { month: 'May', gelir: 91 },
  { month: 'Haz', gelir: 87 },
  { month: 'Tem', gelir: 96 },
  { month: 'Ağu', gelir: 102 },
  { month: 'Eyl', gelir: 110 },
  { month: 'Eki', gelir: 124 },
  { month: 'Kas', gelir: 119 },
  { month: 'Ara', gelir: 136 },
]

export const weeklyActivity = [
  { day: 'Pzt', giriş: 420 },
  { day: 'Sal', giriş: 510 },
  { day: 'Çar', giriş: 468 },
  { day: 'Per', giriş: 598 },
  { day: 'Cum', giriş: 652 },
  { day: 'Cmt', giriş: 402 },
  { day: 'Paz', giriş: 388 },
]

export type Activity = {
  date: string
  user: string
  action: string
  status: 'Tamamlandı' | 'Başarılı' | 'Beklemede'
}

export const latestActivities: Activity[] = [
  {
    date: '27.11.2025',
    user: 'Ahmet Demir',
    action: 'Sipariş oluşturdu',
    status: 'Tamamlandı',
  },
  {
    date: '27.11.2025',
    user: 'Elif Yılmaz',
    action: 'Şifre değiştirdi',
    status: 'Başarılı',
  },
  {
    date: '26.11.2025',
    user: 'Mert Koç',
    action: 'Yeni kullanıcı davet etti',
    status: 'Beklemede',
  },
  {
    date: '26.11.2025',
    user: 'Selin Kaya',
    action: 'Fatura görüntüledi',
    status: 'Tamamlandı',
  },
  {
    date: '25.11.2025',
    user: 'Baran Ulu',
    action: 'Destek bileti açtı',
    status: 'Başarılı',
  },
]

type SidebarNavItem = {
  label: string
  href: string
  icon: IconName
}

export const sidebarNav: SidebarNavItem[] = [
  { label: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
  { label: 'CRM', href: '/crm', icon: 'Handshake' },
  { label: 'Satış Yönetimi', href: '/sales', icon: 'PresentationChart' },
  { label: 'Lead Yönetimi', href: '/leads', icon: 'MessageSquare' },
  { label: 'Fuar & Etkinlikler', href: '/events', icon: 'Globe' },
  { label: 'Satış Raporları', href: '/reports', icon: 'FileText' },
  { label: 'Analytics', href: '/analytics', icon: 'Activity' },
  { label: 'Users', href: '/users', icon: 'Users' },
  { label: 'Settings', href: '/settings', icon: 'Settings' },
]

export const notifications = [
  {
    id: '1',
    title: 'Satış hedefi yakalandı',
    time: '12 dk',
  },
  {
    id: '2',
    title: '3 yeni kullanıcı katıldı',
    time: '1 saat',
  },
  {
    id: '3',
    title: 'Ödeme altyapısı güncellendi',
    time: '2 saat',
  },
]

// CRM Data
export type Customer = {
  id: string
  company: string
  contact: string
  email: string
  phone: string
  status: 'Aktif' | 'Potansiyel' | 'Beklemede' | 'Kayıp'
  value: number
  lastContact: string
  nextFollowUp: string
  region: string
}

export const customers: Customer[] = [
  {
    id: '1',
    company: 'TechCorp A.Ş.',
    contact: 'Mehmet Yıldız',
    email: 'mehmet@techcorp.com',
    phone: '+90 555 123 4567',
    status: 'Aktif',
    value: 450000,
    lastContact: '25.11.2025',
    nextFollowUp: '02.12.2025',
    region: 'İstanbul',
  },
  {
    id: '2',
    company: 'Digital Solutions Ltd.',
    contact: 'Ayşe Kaya',
    email: 'ayse@digitalsolutions.com',
    phone: '+90 555 234 5678',
    status: 'Potansiyel',
    value: 280000,
    lastContact: '24.11.2025',
    nextFollowUp: '30.11.2025',
    region: 'Ankara',
  },
  {
    id: '3',
    company: 'Innovate Group',
    contact: 'Can Özkan',
    email: 'can@innovate.com',
    phone: '+90 555 345 6789',
    status: 'Aktif',
    value: 620000,
    lastContact: '26.11.2025',
    nextFollowUp: '05.12.2025',
    region: 'İzmir',
  },
  {
    id: '4',
    company: 'Future Systems',
    contact: 'Zeynep Demir',
    email: 'zeynep@futuresystems.com',
    phone: '+90 555 456 7890',
    status: 'Beklemede',
    value: 150000,
    lastContact: '20.11.2025',
    nextFollowUp: '28.11.2025',
    region: 'Bursa',
  },
]

// Sales Data
export type SalesMeeting = {
  id: string
  title: string
  customer: string
  date: string
  time: string
  type: 'Toplantı' | 'Sunum' | 'Takip' | 'Demo'
  status: 'Planlandı' | 'Tamamlandı' | 'İptal'
  outcome: string | null
  value: number | null
}

export const salesMeetings: SalesMeeting[] = [
  {
    id: '1',
    title: 'Q4 Strateji Sunumu',
    customer: 'TechCorp A.Ş.',
    date: '28.11.2025',
    time: '14:00',
    type: 'Sunum',
    status: 'Planlandı',
    outcome: null,
    value: null,
  },
  {
    id: '2',
    title: 'Yeni Ürün Demo',
    customer: 'Digital Solutions Ltd.',
    date: '27.11.2025',
    time: '10:30',
    type: 'Demo',
    status: 'Tamamlandı',
    outcome: 'Olumlu geri bildirim, teklif hazırlanacak',
    value: 280000,
  },
  {
    id: '3',
    title: 'Sözleşme Yenileme',
    customer: 'Innovate Group',
    date: '26.11.2025',
    time: '16:00',
    type: 'Toplantı',
    status: 'Tamamlandı',
    outcome: 'Sözleşme 2 yıl uzatıldı',
    value: 620000,
  },
  {
    id: '4',
    title: 'Fiyat Teklifi Takibi',
    customer: 'Future Systems',
    date: '29.11.2025',
    time: '11:00',
    type: 'Takip',
    status: 'Planlandı',
    outcome: null,
    value: null,
  },
]

// Leads Data
export type Lead = {
  id: string
  name: string
  company: string
  email: string
  phone: string
  source: 'Web' | 'Fuar' | 'Referans' | 'Sosyal Medya' | 'E-posta'
  status: 'Yeni' | 'İletişimde' | 'Teklif' | 'Dönüştürüldü' | 'Kayıp'
  question: string
  priority: 'Düşük' | 'Orta' | 'Yüksek'
  assignedTo: string
  createdAt: string
  lastUpdate: string
}

export const leads: Lead[] = [
  {
    id: '1',
    name: 'Ali Veli',
    company: 'StartupXYZ',
    email: 'ali@startupxyz.com',
    phone: '+90 555 111 2222',
    source: 'Web',
    status: 'İletişimde',
    question: 'Dashboard çözümünüzün özelleştirme seçenekleri nelerdir?',
    priority: 'Yüksek',
    assignedTo: 'Bayram Yusuf Yılmaz',
    createdAt: '20.11.2025',
    lastUpdate: '25.11.2025',
  },
  {
    id: '2',
    name: 'Fatma Şahin',
    company: 'Enterprise Solutions',
    email: 'fatma@enterprise.com',
    phone: '+90 555 222 3333',
    source: 'Fuar',
    status: 'Teklif',
    question: 'Toplu kullanıcı lisanslama için fiyat teklifi istiyoruz.',
    priority: 'Yüksek',
    assignedTo: 'Bayram Yusuf Yılmaz',
    createdAt: '15.11.2025',
    lastUpdate: '27.11.2025',
  },
  {
    id: '3',
    name: 'Hasan Kılıç',
    company: 'TechStart',
    email: 'hasan@techstart.com',
    phone: '+90 555 333 4444',
    source: 'Referans',
    status: 'Yeni',
    question: 'Entegrasyon API dokümantasyonu mevcut mu?',
    priority: 'Orta',
    assignedTo: 'Bayram Yusuf Yılmaz',
    createdAt: '27.11.2025',
    lastUpdate: '27.11.2025',
  },
  {
    id: '4',
    name: 'Selin Arslan',
    company: 'Digital Agency',
    email: 'selin@digitalagency.com',
    phone: '+90 555 444 5555',
    source: 'Sosyal Medya',
    status: 'Dönüştürüldü',
    question: 'Demo talep edildi ve başarıyla tamamlandı.',
    priority: 'Yüksek',
    assignedTo: 'Bayram Yusuf Yılmaz',
    createdAt: '10.11.2025',
    lastUpdate: '22.11.2025',
  },
]

// Events Data
export type Event = {
  id: string
  name: string
  type: 'Fuar' | 'Konferans' | 'Workshop' | 'Networking'
  location: string
  country: string
  startDate: string
  endDate: string
  status: 'Planlandı' | 'Devam Ediyor' | 'Tamamlandı'
  budget: number
  attendees: number
  leadsGenerated: number
  description: string
}

export const events: Event[] = [
  {
    id: '1',
    name: 'Web Summit 2025',
    type: 'Konferans',
    location: 'Lisbon',
    country: 'Portekiz',
    startDate: '15.12.2025',
    endDate: '18.12.2025',
    status: 'Planlandı',
    budget: 45000,
    attendees: 0,
    leadsGenerated: 0,
    description: 'Dünyanın en büyük teknoloji konferanslarından biri',
  },
  {
    id: '2',
    name: 'CeBIT Asia 2025',
    type: 'Fuar',
    location: 'Shanghai',
    country: 'Çin',
    startDate: '10.12.2025',
    endDate: '13.12.2025',
    status: 'Planlandı',
    budget: 38000,
    attendees: 0,
    leadsGenerated: 0,
    description: 'Asya pazarına açılım için stratejik fuar',
  },
  {
    id: '3',
    name: 'TechCrunch Disrupt Berlin',
    type: 'Konferans',
    location: 'Berlin',
    country: 'Almanya',
    startDate: '05.12.2025',
    endDate: '07.12.2025',
    status: 'Planlandı',
    budget: 32000,
    attendees: 0,
    leadsGenerated: 0,
    description: 'Avrupa startup ekosistemi için networking fırsatı',
  },
  {
    id: '4',
    name: 'GITEX Technology Week',
    type: 'Fuar',
    location: 'Dubai',
    country: 'BAE',
    startDate: '20.11.2025',
    endDate: '24.11.2025',
    status: 'Tamamlandı',
    budget: 55000,
    attendees: 1250,
    leadsGenerated: 87,
    description: 'Orta Doğu bölgesinin en büyük teknoloji fuarı',
  },
]

// Sales Reports Data
export type SalesReport = {
  id: string
  title: string
  period: string
  type: 'Aylık' | 'Üç Aylık' | 'Yıllık' | 'Özel'
  revenue: number
  deals: number
  conversionRate: number
  avgDealSize: number
  topCustomer: string
  generatedAt: string
}

export const salesReports: SalesReport[] = [
  {
    id: '1',
    title: 'Kasım 2025 Satış Raporu',
    period: '01.11.2025 - 30.11.2025',
    type: 'Aylık',
    revenue: 1240000,
    deals: 24,
    conversionRate: 18.5,
    avgDealSize: 51667,
    topCustomer: 'TechCorp A.Ş.',
    generatedAt: '27.11.2025',
  },
  {
    id: '2',
    title: 'Q4 2025 Satış Özeti',
    period: '01.10.2025 - 31.12.2025',
    type: 'Üç Aylık',
    revenue: 3200000,
    deals: 58,
    conversionRate: 16.2,
    avgDealSize: 55172,
    topCustomer: 'Innovate Group',
    generatedAt: '25.11.2025',
  },
  {
    id: '3',
    title: '2025 Yıllık Satış Raporu',
    period: '01.01.2025 - 31.12.2025',
    type: 'Yıllık',
    revenue: 12500000,
    deals: 245,
    conversionRate: 19.8,
    avgDealSize: 51020,
    topCustomer: 'TechCorp A.Ş.',
    generatedAt: '20.11.2025',
  },
]

