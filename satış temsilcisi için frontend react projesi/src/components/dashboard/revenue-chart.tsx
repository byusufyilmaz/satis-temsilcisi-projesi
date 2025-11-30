import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'

import { monthlyRevenue } from '@/data/mock'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
  activeMonth?: string | null
  onSelectMonth?: (month: string) => void
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-xl border border-border bg-background/95 px-3 py-2 text-xs shadow-xl">
        <p className="font-semibold text-foreground">₺{payload[0].value}k</p>
        <p className="text-muted-foreground">{payload[0].payload.month}</p>
      </div>
    )
  }
  return null
}

export const RevenueChart = ({ activeMonth: _activeMonth, onSelectMonth }: Props) => {
  return (
    <Card className="h-full border-none bg-gradient-to-br from-primary/5 via-card to-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Aylık Gelir Eğrisi</CardTitle>
        <p className="text-sm text-muted-foreground">
          Ocak - Aralık 2025 arası gelir trendi
        </p>
      </CardHeader>
      <CardContent className="h-[320px] pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={monthlyRevenue}
            margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
            onClick={(e) => {
              if (!onSelectMonth || !e?.activeLabel) return
              onSelectMonth(String(e.activeLabel))
            }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="90%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₺${value}k`}
              stroke="hsl(var(--muted-foreground))"
              tickMargin={12}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '4 4' }} />
            <Line
              type="monotone"
              dataKey="gelir"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 7,
                strokeWidth: 0,
              }}
            />
            <Line
              type="monotone"
              dataKey="gelir"
              stroke="url(#lineGradient)"
              strokeOpacity={0}
              activeDot={{ r: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

