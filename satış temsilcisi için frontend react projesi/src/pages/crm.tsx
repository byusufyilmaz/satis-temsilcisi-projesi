import { useState, useMemo } from 'react'
import { customers, type Customer } from '@/data/mock'
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

export const CrmPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  const statusCounts = useMemo(() => {
    const counts = { Aktif: 0, Potansiyel: 0, Beklemede: 0, Kayıp: 0 }
    customers.forEach((c) => {
      if (c.status in counts) counts[c.status as keyof typeof counts]++
    })
    return counts
  }, [])

  const totalValue = useMemo(
    () => filteredCustomers.reduce((sum, c) => sum + c.value, 0),
    [filteredCustomers],
  )

  const getStatusVariant = (status: Customer['status']) => {
    switch (status) {
      case 'Aktif':
        return 'success'
      case 'Potansiyel':
        return 'secondary'
      case 'Beklemede':
        return 'warning'
      case 'Kayıp':
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
            Müşteri İlişkileri
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">CRM Yönetim Paneli</h1>
        </div>
        <Badge variant="outline" className="rounded-2xl px-4 py-1 text-xs uppercase tracking-[0.3em]">
          {filteredCustomers.length} Müşteri
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-none bg-gradient-to-br from-card to-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Değer</CardTitle>
            <Icon name="Wallet" className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">₺{(totalValue / 1000).toFixed(0)}K</p>
            <p className="text-xs text-muted-foreground mt-2">Toplam müşteri değeri</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Aktif</CardTitle>
            <Icon name="Users" className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{statusCounts.Aktif}</p>
            <p className="text-xs text-muted-foreground mt-2">Aktif müşteriler</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Potansiyel</CardTitle>
            <Icon name="TrendingUp" className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{statusCounts.Potansiyel}</p>
            <p className="text-xs text-muted-foreground mt-2">Potansiyel müşteriler</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Beklemede</CardTitle>
            <Icon name="Activity" className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{statusCounts.Beklemede}</p>
            <p className="text-xs text-muted-foreground mt-2">Bekleyen müşteriler</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none bg-card">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Müşteri Listesi</CardTitle>
              <p className="text-sm text-muted-foreground">Tüm müşteri ilişkilerini yönetin</p>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Müşteri ara..."
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
                <option value="Aktif">Aktif</option>
                <option value="Potansiyel">Potansiyel</option>
                <option value="Beklemede">Beklemede</option>
                <option value="Kayıp">Kayıp</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Şirket</TableHead>
                <TableHead>İletişim</TableHead>
                <TableHead>E-posta</TableHead>
                <TableHead>Bölge</TableHead>
                <TableHead>Değer</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Son İletişim</TableHead>
                <TableHead>Sonraki Takip</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-semibold">{customer.company}</TableCell>
                  <TableCell>{customer.contact}</TableCell>
                  <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                  <TableCell>{customer.region}</TableCell>
                  <TableCell className="font-medium">₺{(customer.value / 1000).toFixed(0)}K</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(customer.status)}>{customer.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{customer.lastContact}</TableCell>
                  <TableCell className="text-muted-foreground">{customer.nextFollowUp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

