import { motion } from 'framer-motion'
import { Icon } from '@/components/icon'
import { kpiCards } from '@/data/mock'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type Props = {
  layoutPreset: 'default' | 'manager' | 'sales' | 'ops'
}

export const KpiGrid = ({ layoutPreset }: Props) => {
  const cards = getCardsForPreset(layoutPreset)

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="overflow-hidden border-none bg-gradient-to-br from-card to-card/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.label}
              </CardTitle>
              <span className="rounded-2xl bg-primary/10 p-2 text-primary">
                <Icon name={card.icon as any} className="h-5 w-5" />
              </span>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-semibold tracking-tight text-foreground">
                  {card.value}
                </p>
                <Badge
                  variant={card.trend === 'up' ? 'success' : 'warning'}
                  className={cn(
                    'gap-1 text-xs',
                    card.trend === 'down' && 'text-amber-600 dark:text-amber-300',
                  )}
                >
                  {card.trend === 'up' ? '+' : ''}
                  {card.change}%
                </Badge>
              </div>
              <CardDescription className="mt-2 flex items-center justify-between text-[11px]">
                <span>Önceki aya göre</span>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full bg-muted/70 px-2 py-0.5 text-[10px]',
                    card.trend === 'up'
                      ? 'text-emerald-500'
                      : 'text-amber-500',
                  )}
                >
                  <span
                    className={cn(
                      'h-1.5 w-8 overflow-hidden rounded-full bg-muted',
                      card.trend === 'up'
                        ? 'bg-emerald-500/20'
                        : 'bg-amber-500/20',
                    )}
                  >
                    <span
                      className={cn(
                        'block h-full rounded-full',
                        card.trend === 'up'
                          ? 'bg-emerald-500'
                          : 'bg-amber-500',
                      )}
                      style={{ width: `${Math.min(Math.abs(card.change) * 4, 100)}%` }}
                    />
                  </span>
                  {card.trend === 'up' ? 'Fırsat' : 'Risk'}
                </span>
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

const getCardsForPreset = (
  preset: 'default' | 'manager' | 'sales' | 'ops',
) => {
  if (preset === 'sales') {
    return [kpiCards[0], kpiCards[2], kpiCards[3], kpiCards[1]]
  }
  if (preset === 'ops') {
    return [kpiCards[1], kpiCards[3], kpiCards[2], kpiCards[0]]
  }
  if (preset === 'manager') {
    return [kpiCards[3], kpiCards[0], kpiCards[1], kpiCards[2]]
  }
  return kpiCards
}


