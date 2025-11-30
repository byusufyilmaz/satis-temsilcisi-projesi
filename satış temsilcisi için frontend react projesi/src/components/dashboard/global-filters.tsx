import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export type DateRange = 'today' | '7d' | '30d' | 'custom'
export type Segment = 'all' | 'enterprise' | 'smb' | 'internal'

export type DashboardFilters = {
  range: DateRange
  segment: Segment
}

type Props = {
  value: DashboardFilters
  onChange: (value: DashboardFilters) => void
}

export const GlobalFilters = ({ value, onChange }: Props) => {
  const [customOpen, setCustomOpen] = useState(false)

  const setRange = (range: DateRange) => {
    onChange({ ...value, range })
    if (range !== 'custom') setCustomOpen(false)
  }

  const setSegment = (segment: Segment) => {
    onChange({ ...value, segment })
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Zaman
        </span>
        <div className="flex gap-2 rounded-full bg-muted/60 p-1">
          <FilterChip
            active={value.range === 'today'}
            label="Bugün"
            onClick={() => setRange('today')}
          />
          <FilterChip
            active={value.range === '7d'}
            label="Son 7 gün"
            onClick={() => setRange('7d')}
          />
          <FilterChip
            active={value.range === '30d'}
            label="Son 30 gün"
            onClick={() => setRange('30d')}
          />
          <FilterChip
            active={value.range === 'custom'}
            label="Özel"
            onClick={() => {
              setRange('custom')
              setCustomOpen(true)
            }}
          />
        </div>
        {value.range !== 'today' && (
          <Badge variant="outline" className="rounded-full border-dashed text-[11px]">
            Demo filtresi · {value.range === '7d' ? '7 günlük' : value.range === '30d' ? '30 günlük' : 'Özel'}
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Segment
        </span>
        <div className="flex gap-2 rounded-full bg-muted/60 p-1">
          <FilterChip
            active={value.segment === 'all'}
            label="Tümü"
            onClick={() => setSegment('all')}
          />
          <FilterChip
            active={value.segment === 'enterprise'}
            label="Kurumsal"
            onClick={() => setSegment('enterprise')}
          />
          <FilterChip
            active={value.segment === 'smb'}
            label="KOBİ"
            onClick={() => setSegment('smb')}
          />
          <FilterChip
            active={value.segment === 'internal'}
            label="İç kullanıcı"
            onClick={() => setSegment('internal')}
          />
        </div>
        {customOpen && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Özel tarih seçimi mock’tur
          </Button>
        )}
      </div>
    </div>
  )
}

const FilterChip = ({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
        active
          ? 'bg-background text-foreground shadow-sm'
          : 'text-muted-foreground hover:bg-background/60 hover:text-foreground'
      }`}
    >
      {label}
    </button>
  )
}





