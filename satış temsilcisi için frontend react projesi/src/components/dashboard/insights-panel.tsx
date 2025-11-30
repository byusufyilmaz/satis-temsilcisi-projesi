import { Lightbulb, ShieldCheck, TrendingUp } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type Props = {
  activeRangeLabel: string
}

export const InsightsPanel = ({ activeRangeLabel }: Props) => {
  return (
    <Card className="border-none bg-gradient-to-br from-emerald-500/10 via-card to-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div>
          <CardTitle className="text-sm font-semibold">Öne Çıkan İçgörüler</CardTitle>
          <p className="text-xs text-muted-foreground">
            {activeRangeLabel} aralığı için yapay içgörü simülasyonu
          </p>
        </div>
        <Badge className="rounded-full bg-emerald-500/15 text-[11px] text-emerald-500">
          AI-Like Demo
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <InsightRow
          icon={<TrendingUp className="h-4 w-4 text-emerald-500" />}
          title="Büyüme oranı hızlandı"
          body="Son dönemde gelir artışı trendi %12 yukarı yönlü; satış ekibi pipeline optimizasyonu etkili görünüyor."
        />
        <InsightRow
          icon={<ShieldCheck className="h-4 w-4 text-sky-500" />}
          title="Churn riski kontrol altında"
          body="Riskli müşteri segmentinde iptal oranı önceki periyoda göre %3 azaldı. Destek SLA performansı katkı sağlıyor."
        />
        <InsightRow
          icon={<Lightbulb className="h-4 w-4 text-amber-400" />}
          title="Hafta içi akşam saatleri fırsatlı"
          body="Kullanıcı aktivitesi özellikle hafta içi 20:00 sonrası yoğunlaşıyor; kampanya iletişimini bu saatlere kaydırmak avantajlı olabilir."
        />
      </CardContent>
    </Card>
  )
}

const InsightRow = ({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode
  title: string
  body: string
}) => {
  return (
    <div className="flex gap-3 rounded-2xl bg-background/60 p-3">
      <div className="mt-1 h-7 w-7 shrink-0 rounded-full bg-muted/80 p-1.5">{icon}</div>
      <div>
        <p className="text-xs font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{body}</p>
      </div>
    </div>
  )
}





