import { useState, useMemo } from 'react'
import { salesReports, type SalesReport } from '@/data/mock'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Icon } from '@/components/icon'

export const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const filteredReports = useMemo(() => {
    return salesReports.filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.period.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = typeFilter === 'all' || report.type === typeFilter
      return matchesSearch && matchesType
    })
  }, [searchTerm, typeFilter])

  const overallStats = useMemo(() => {
    const totalRevenue = salesReports.reduce((sum, r) => sum + r.revenue, 0)
    const totalDeals = salesReports.reduce((sum, r) => sum + r.deals, 0)
    const avgConversion = salesReports.reduce((sum, r) => sum + r.conversionRate, 0) / salesReports.length
    return { totalRevenue, totalDeals, avgConversion }
  }, [])

  const getTypeVariant = (type: SalesReport['type']) => {
    switch (type) {
      case 'Aylık':
        return 'default'
      case 'Üç Aylık':
        return 'secondary'
      case 'Yıllık':
        return 'success'
      case 'Özel':
        return 'outline'
      default:
        return 'outline'
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Satış Raporları
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">CRM Verileri & Satış Raporları</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="rounded-2xl text-xs">
            <Icon name="FileText" className="mr-2 h-4 w-4" />
            Yeni Rapor Oluştur
          </Button>
          <Badge variant="outline" className="rounded-2xl px-4 py-1 text-xs uppercase tracking-[0.3em]">
            {filteredReports.length} Rapor
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none bg-gradient-to-br from-card to-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Gelir</CardTitle>
            <Icon name="Wallet" className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">₺{(overallStats.totalRevenue / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-muted-foreground mt-2">Tüm raporlar toplamı</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Anlaşma</CardTitle>
            <Icon name="Briefcase" className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{overallStats.totalDeals}</p>
            <p className="text-xs text-muted-foreground mt-2">Tamamlanan anlaşmalar</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ort. Dönüşüm Oranı</CardTitle>
            <Icon name="TrendingUp" className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{overallStats.avgConversion.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground mt-2">Ortalama dönüşüm</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none bg-card">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Rapor Listesi</CardTitle>
              <p className="text-sm text-muted-foreground">
                Doğru CRM verilerini koruyun ve satış raporları hazırlayın
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Rapor ara..."
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
                <option value="Aylık">Aylık</option>
                <option value="Üç Aylık">Üç Aylık</option>
                <option value="Yıllık">Yıllık</option>
                <option value="Özel">Özel</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rapor Başlığı</TableHead>
                <TableHead>Dönem</TableHead>
                <TableHead>Tip</TableHead>
                <TableHead>Gelir</TableHead>
                <TableHead>Anlaşma</TableHead>
                <TableHead>Dönüşüm Oranı</TableHead>
                <TableHead>Ort. Anlaşma</TableHead>
                <TableHead>En İyi Müşteri</TableHead>
                <TableHead>Oluşturulma</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-semibold">{report.title}</TableCell>
                  <TableCell className="text-muted-foreground">{report.period}</TableCell>
                  <TableCell>
                    <Badge variant={getTypeVariant(report.type)}>{report.type}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    ₺{(report.revenue / 1000).toFixed(0)}K
                  </TableCell>
                  <TableCell>{report.deals}</TableCell>
                  <TableCell className="font-medium">{report.conversionRate}%</TableCell>
                  <TableCell className="text-muted-foreground">
                    ₺{(report.avgDealSize / 1000).toFixed(0)}K
                  </TableCell>
                  <TableCell className="text-sm">{report.topCustomer}</TableCell>
                  <TableCell className="text-muted-foreground">{report.generatedAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        Görüntüle
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        İndir
                      </Button>
                    </div>
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

