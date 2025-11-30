import { useState, useMemo } from 'react'
import { events, type Event } from '@/data/mock'
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

export const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.country.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = typeFilter === 'all' || event.type === typeFilter
      const matchesStatus = statusFilter === 'all' || event.status === statusFilter
      return matchesSearch && matchesType && matchesStatus
    })
  }, [searchTerm, typeFilter, statusFilter])

  const stats = useMemo(() => {
    const planned = events.filter((e) => e.status === 'Planlandı').length
    const completed = events.filter((e) => e.status === 'Tamamlandı').length
    const totalBudget = events.reduce((sum, e) => sum + e.budget, 0)
    const totalLeads = events.reduce((sum, e) => sum + e.leadsGenerated, 0)
    return { planned, completed, totalBudget, totalLeads }
  }, [])

  const getTypeVariant = (type: Event['type']) => {
    switch (type) {
      case 'Fuar':
        return 'default'
      case 'Konferans':
        return 'secondary'
      case 'Workshop':
        return 'success'
      case 'Networking':
        return 'outline'
      default:
        return 'outline'
    }
  }

  const getStatusVariant = (status: Event['status']) => {
    switch (status) {
      case 'Planlandı':
        return 'secondary'
      case 'Devam Ediyor':
        return 'warning'
      case 'Tamamlandı':
        return 'success'
      default:
        return 'outline'
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Fuar & Etkinlikler
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">Uluslararası Fuar & Etkinlik Yönetimi</h1>
        </div>
        <Badge variant="outline" className="rounded-2xl px-4 py-1 text-xs uppercase tracking-[0.3em]">
          {filteredEvents.length} Etkinlik
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-none bg-gradient-to-br from-card to-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Planlanan</CardTitle>
            <Icon name="Calendar" className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{stats.planned}</p>
            <p className="text-xs text-muted-foreground mt-2">Yaklaşan etkinlikler</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tamamlanan</CardTitle>
            <Icon name="Briefcase" className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{stats.completed}</p>
            <p className="text-xs text-muted-foreground mt-2">Geçmiş etkinlikler</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Bütçe</CardTitle>
            <Icon name="Wallet" className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">₺{(stats.totalBudget / 1000).toFixed(0)}K</p>
            <p className="text-xs text-muted-foreground mt-2">Toplam etkinlik bütçesi</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Oluşturulan Lead</CardTitle>
            <Icon name="TrendingUp" className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{stats.totalLeads}</p>
            <p className="text-xs text-muted-foreground mt-2">Toplam lead sayısı</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none bg-card">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Etkinlik Listesi</CardTitle>
              <p className="text-sm text-muted-foreground">
                Uluslararası fuar ve etkinlikleri takip edin
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Etkinlik ara..."
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
                <option value="Fuar">Fuar</option>
                <option value="Konferans">Konferans</option>
                <option value="Workshop">Workshop</option>
                <option value="Networking">Networking</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-2xl border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="Planlandı">Planlandı</option>
                <option value="Devam Ediyor">Devam Ediyor</option>
                <option value="Tamamlandı">Tamamlandı</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Etkinlik Adı</TableHead>
                <TableHead>Tip</TableHead>
                <TableHead>Lokasyon</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Bütçe</TableHead>
                <TableHead>Katılımcı</TableHead>
                <TableHead>Lead</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div>
                      <p className="font-semibold">{event.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTypeVariant(event.type)}>{event.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{event.location}</p>
                      <p className="text-muted-foreground">{event.country}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{event.startDate}</p>
                      <p className="text-muted-foreground">{event.endDate}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(event.status)}>{event.status}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">₺{(event.budget / 1000).toFixed(0)}K</TableCell>
                  <TableCell className="text-muted-foreground">
                    {event.attendees > 0 ? event.attendees : '-'}
                  </TableCell>
                  <TableCell className="font-medium">
                    {event.leadsGenerated > 0 ? event.leadsGenerated : '-'}
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

