import { useState, useMemo } from 'react'
import { leads, type Lead } from '@/data/mock'
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

export const LeadsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
      const matchesPriority = priorityFilter === 'all' || lead.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [searchTerm, statusFilter, priorityFilter])

  const stats = useMemo(() => {
    const newLeads = leads.filter((l) => l.status === 'Yeni').length
    const inContact = leads.filter((l) => l.status === 'İletişimde').length
    const converted = leads.filter((l) => l.status === 'Dönüştürüldü').length
    const conversionRate = leads.length > 0 ? (converted / leads.length) * 100 : 0
    return { newLeads, inContact, converted, conversionRate }
  }, [])

  const getStatusVariant = (status: Lead['status']) => {
    switch (status) {
      case 'Yeni':
        return 'secondary'
      case 'İletişimde':
        return 'default'
      case 'Teklif':
        return 'warning'
      case 'Dönüştürüldü':
        return 'success'
      case 'Kayıp':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getPriorityVariant = (priority: Lead['priority']) => {
    switch (priority) {
      case 'Yüksek':
        return 'destructive'
      case 'Orta':
        return 'warning'
      case 'Düşük':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const getSourceVariant = (source: Lead['source']) => {
    switch (source) {
      case 'Web':
        return 'default'
      case 'Fuar':
        return 'secondary'
      case 'Referans':
        return 'success'
      case 'Sosyal Medya':
        return 'outline'
      case 'E-posta':
        return 'warning'
      default:
        return 'outline'
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Lead Yönetimi
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">Potansiyel Müşteri & Soru Yönetimi</h1>
        </div>
        <Badge variant="outline" className="rounded-2xl px-4 py-1 text-xs uppercase tracking-[0.3em]">
          {filteredLeads.length} Lead
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-none bg-gradient-to-br from-card to-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Yeni Lead'ler</CardTitle>
            <Icon name="MessageSquare" className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{stats.newLeads}</p>
            <p className="text-xs text-muted-foreground mt-2">Yeni gelen sorular</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">İletişimde</CardTitle>
            <Icon name="Activity" className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{stats.inContact}</p>
            <p className="text-xs text-muted-foreground mt-2">Aktif görüşmeler</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Dönüştürülen</CardTitle>
            <Icon name="TrendingUp" className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{stats.converted}</p>
            <p className="text-xs text-muted-foreground mt-2">Başarılı dönüşümler</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Dönüşüm Oranı</CardTitle>
            <Icon name="PresentationChart" className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{stats.conversionRate.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground mt-2">Toplam dönüşüm</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none bg-card">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Lead Listesi</CardTitle>
              <p className="text-sm text-muted-foreground">Gelen soruları yönetin ve satışa dönüştürün</p>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Lead ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-2xl border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="Yeni">Yeni</option>
                <option value="İletişimde">İletişimde</option>
                <option value="Teklif">Teklif</option>
                <option value="Dönüştürüldü">Dönüştürüldü</option>
                <option value="Kayıp">Kayıp</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="rounded-2xl border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">Tüm Öncelikler</option>
                <option value="Yüksek">Yüksek</option>
                <option value="Orta">Orta</option>
                <option value="Düşük">Düşük</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İsim</TableHead>
                <TableHead>Şirket</TableHead>
                <TableHead>İletişim</TableHead>
                <TableHead>Kaynak</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Öncelik</TableHead>
                <TableHead>Soru</TableHead>
                <TableHead>Sorumlu</TableHead>
                <TableHead>Oluşturulma</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-semibold">{lead.name}</TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{lead.email}</p>
                      <p className="text-muted-foreground">{lead.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getSourceVariant(lead.source)}>{lead.source}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(lead.status)}>{lead.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityVariant(lead.priority)}>{lead.priority}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-muted-foreground">
                    {lead.question}
                  </TableCell>
                  <TableCell className="text-sm">{lead.assignedTo}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

