import { useState, useMemo } from 'react'
import { salesMeetings, type SalesMeeting } from '@/data/mock'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Icon } from '@/components/icon'

export const SalesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredMeetings = useMemo(() => {
    return salesMeetings.filter((meeting) => {
      const matchesSearch =
        meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.customer.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = typeFilter === 'all' || meeting.type === typeFilter
      const matchesStatus = statusFilter === 'all' || meeting.status === statusFilter
      return matchesSearch && matchesType && matchesStatus
    })
  }, [searchTerm, typeFilter, statusFilter])

  const stats = useMemo(() => {
    const completed = salesMeetings.filter((m) => m.status === 'Tamamlandı').length
    const planned = salesMeetings.filter((m) => m.status === 'Planlandı').length
    const totalValue = salesMeetings
      .filter((m) => m.value !== null)
      .reduce((sum, m) => sum + (m.value || 0), 0)
    return { completed, planned, totalValue }
  }, [])

  const getTypeVariant = (type: SalesMeeting['type']) => {
    switch (type) {
      case 'Toplantı':
        return 'secondary'
      case 'Sunum':
        return 'default'
      case 'Takip':
        return 'outline'
      case 'Demo':
        return 'success'
      default:
        return 'outline'
    }
  }

  const getStatusVariant = (status: SalesMeeting['status']) => {
    switch (status) {
      case 'Planlandı':
        return 'secondary'
      case 'Tamamlandı':
        return 'success'
      case 'İptal':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Satış Yönetimi
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">Satış Toplantıları & Sunumlar</h1>
        </div>
        <Badge variant="outline" className="rounded-2xl px-4 py-1 text-xs uppercase tracking-[0.3em]">
          {filteredMeetings.length} Toplantı
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none bg-gradient-to-br from-card to-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tamamlanan</CardTitle>
            <Icon name="Briefcase" className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{stats.completed}</p>
            <p className="text-xs text-muted-foreground mt-2">Toplantı sayısı</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Planlanan</CardTitle>
            <Icon name="Calendar" className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{stats.planned}</p>
            <p className="text-xs text-muted-foreground mt-2">Yaklaşan toplantılar</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Değer</CardTitle>
            <Icon name="Wallet" className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">₺{(stats.totalValue / 1000).toFixed(0)}K</p>
            <p className="text-xs text-muted-foreground mt-2">Tamamlanan toplantılar</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none bg-card">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Toplantı & Sunum Takvimi</CardTitle>
              <p className="text-sm text-muted-foreground">Satış faaliyetlerini yönetin ve takip edin</p>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Toplantı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64"
              />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="rounded-2xl border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">Tüm Tipler</option>
                <option value="Toplantı">Toplantı</option>
                <option value="Sunum">Sunum</option>
                <option value="Takip">Takip</option>
                <option value="Demo">Demo</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-2xl border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="Planlandı">Planlandı</option>
                <option value="Tamamlandı">Tamamlandı</option>
                <option value="İptal">İptal</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Başlık</TableHead>
                <TableHead>Müşteri</TableHead>
                <TableHead>Tarih & Saat</TableHead>
                <TableHead>Tip</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Sonuç</TableHead>
                <TableHead>Değer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMeetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell className="font-semibold">{meeting.title}</TableCell>
                  <TableCell>{meeting.customer}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{meeting.date}</p>
                      <p className="text-muted-foreground">{meeting.time}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTypeVariant(meeting.type)}>{meeting.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(meeting.status)}>{meeting.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {meeting.outcome || '-'}
                  </TableCell>
                  <TableCell className="font-medium">
                    {meeting.value ? `₺${(meeting.value / 1000).toFixed(0)}K` : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

