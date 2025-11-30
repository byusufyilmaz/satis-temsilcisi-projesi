import { useEffect, useState } from 'react'
import { Activity, Clock } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type FeedItem = {
  id: number
  label: string
  time: string
}

const seed: FeedItem[] = [
  { id: 1, label: 'Satış ekibi 3 yeni fırsat ekledi', time: 'Şimdi' },
  { id: 2, label: 'Finans paneli dışa aktarma aldı', time: '1 dk' },
  { id: 3, label: 'Operasyon SLA raporu güncellendi', time: '3 dk' },
]

const templates = [
  'Yeni kullanıcı kayıt oldu',
  'Yüksek hacimli sipariş oluşturuldu',
  'Riskli müşteri eşiği aşıldı',
  'Destek bileti “kritik” seviyeye yükseldi',
  'Abonelik planı güncellendi',
]

export const LiveActivityFeed = () => {
  const [items, setItems] = useState<FeedItem[]>(seed)
  const [counter, setCounter] = useState(seed.length + 1)

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const template =
          templates[Math.floor(Math.random() * templates.length)]
        const nextItem: FeedItem = {
          id: counter + 1,
          label: template,
          time: 'az önce',
        }
        const merged = [nextItem, ...prev]
        return merged.slice(0, 6)
      })
      setCounter((c) => c + 1)
    }, 7000)

    return () => clearInterval(interval)
  }, [counter])

  return (
    <Card className="border-none bg-card/90">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm font-semibold">Canlı Akış</CardTitle>
        </div>
        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Clock className="h-3 w-3" />
          Mock realtime
        </span>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-2xl bg-muted/60 px-3 py-2"
          >
            <p className="text-[11px] text-foreground">{item.label}</p>
            <span className="text-[10px] text-muted-foreground">{item.time}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}





