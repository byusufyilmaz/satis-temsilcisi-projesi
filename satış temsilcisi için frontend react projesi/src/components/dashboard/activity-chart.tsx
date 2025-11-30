import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'

import { weeklyActivity } from '@/data/mock'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const TooltipContent = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-border bg-background/95 px-3 py-2 text-xs shadow-xl">
      <p className="font-semibold text-foreground">{payload[0].payload.day}</p>
      <p className="text-muted-foreground">{payload[0].value} giriş</p>
    </div>
  )
}

export const ActivityChart = () => {
  return (
    <Card className="border-none bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Kullanıcı Aktivitesi</CardTitle>
        <p className="text-sm text-muted-foreground">Haftalık oturum sayısı</p>
      </CardHeader>
      <CardContent className="h-[320px] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tickMargin={12}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip cursor={{ fill: 'hsl(var(--muted) / 0.2)' }} content={<TooltipContent />} />
            <Bar
              dataKey="giriş"
              radius={[12, 12, 12, 12]}
              fill="url(#barGradient)"
              className="drop-shadow-sm"
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.9} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}




