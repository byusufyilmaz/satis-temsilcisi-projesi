import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type PlaceholderProps = {
  title: string
  description: string
}

export const PlaceholderPage = ({ title, description }: PlaceholderProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-20 text-center">
      <Card className="w-full max-w-2xl border-none bg-card/80">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Bu modül demo sürümde henüz aktif değil. KPI kartları, özel grafikler ve kullanıcı
            hikayeleri için taslaklar hazırlandı. Müşteri geri bildirimine göre devreye
            alınabilir.
          </p>
          <Button className="rounded-2xl">Önceliklendirme Talep Et</Button>
        </CardContent>
      </Card>
    </div>
  )
}




