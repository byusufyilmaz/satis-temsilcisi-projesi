import { useState } from 'react'

import { ActivityChart } from '@/components/dashboard/activity-chart'
import { ActivityTable } from '@/components/dashboard/activity-table'
import { GlobalFilters, type DashboardFilters } from '@/components/dashboard/global-filters'
import { InsightsPanel } from '@/components/dashboard/insights-panel'
import { KpiGrid } from '@/components/dashboard/kpi-grid'
import { LiveActivityFeed } from '@/components/dashboard/live-activity-feed'
import { RevenueChart } from '@/components/dashboard/revenue-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const automationRules = [
  { id: 1, label: 'Satış pipeline uyarıları', status: 'Aktif', enabled: true },
  { id: 2, label: 'Riskli müşteri alarmı', status: 'Test aşamasında', enabled: false },
  { id: 3, label: 'Operasyon SLA takibi', status: 'Aktif', enabled: true },
]

export const DashboardPage = () => {
  const [filters, setFilters] = useState<DashboardFilters>({
    range: '30d',
    segment: 'all',
  })
  const [layoutPreset, setLayoutPreset] = useState<'default' | 'manager' | 'sales' | 'ops'>(
    'default',
  )
  const [presentation, setPresentation] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)

  const rangeLabel =
    filters.range === 'today'
      ? 'Bugün'
      : filters.range === '7d'
      ? 'Son 7 gün'
      : filters.range === '30d'
      ? 'Son 30 gün'
      : 'Özel dönem'

  return (
    <div className={`space-y-8 ${presentation ? 'max-w-6xl' : ''}`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Dijital Dönüşüm Paneli
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            {presentation ? 'Yönetim Sunumu' : 'Dijital Dönüşüm Dashboard'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="rounded-2xl px-4 py-1 text-xs uppercase tracking-[0.3em]"
          >
            Realtime Mock
          </Badge>
          <Button
            variant={presentation ? 'secondary' : 'soft'}
            size="sm"
            className="rounded-2xl text-xs"
            onClick={() => setPresentation((prev) => !prev)}
          >
            {presentation ? 'Normal görünüme dön' : 'Presentation mode'}
          </Button>
        </div>
      </div>

      <GlobalFilters value={filters} onChange={setFilters} />

      {/* Üst orta blok: Aylık Gelir grafiği + içgörüler / canlı akış */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
        <RevenueChart
          activeMonth={selectedMonth}
          onSelectMonth={(month) => setSelectedMonth(month)}
        />
        <div className="space-y-4">
          <InsightsPanel activeRangeLabel={rangeLabel} />
          <LiveActivityFeed />
        </div>
      </div>

      {/* KPI kartları ve preset seçimleri */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <p className="text-xs text-muted-foreground">
          Aktif preset:{' '}
          <span className="font-medium text-foreground">
            {layoutPreset === 'default'
              ? 'Genel görünüm'
              : layoutPreset === 'manager'
              ? 'Yönetici'
              : layoutPreset === 'sales'
              ? 'Satış'
              : 'Operasyon'}
          </span>
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={layoutPreset === 'default' ? 'secondary' : 'outline'}
            className="rounded-2xl text-xs"
            onClick={() => setLayoutPreset('default')}
          >
            Genel
          </Button>
          <Button
            size="sm"
            variant={layoutPreset === 'manager' ? 'secondary' : 'outline'}
            className="rounded-2xl text-xs"
            onClick={() => setLayoutPreset('manager')}
          >
            Yönetici
          </Button>
          <Button
            size="sm"
            variant={layoutPreset === 'sales' ? 'secondary' : 'outline'}
            className="rounded-2xl text-xs"
            onClick={() => setLayoutPreset('sales')}
          >
            Satış
          </Button>
          <Button
            size="sm"
            variant={layoutPreset === 'ops' ? 'secondary' : 'outline'}
            className="rounded-2xl text-xs"
            onClick={() => setLayoutPreset('ops')}
          >
            Operasyon
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
        <KpiGrid layoutPreset={layoutPreset} />
        <ActivityChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <ActivityTable />
        <Card className="border-none bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {selectedMonth ? `${selectedMonth} otomasyon kuralları` : 'Operasyon Kuralları'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Mock otomasyon senaryolarınızı buradan yönetin
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {automationRules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/30 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{rule.label}</p>
                  <p className="text-xs text-muted-foreground">{rule.status}</p>
                </div>
                <Switch defaultChecked={rule.enabled} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

