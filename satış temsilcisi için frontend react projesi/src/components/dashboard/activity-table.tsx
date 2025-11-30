import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { latestActivities } from '@/data/mock'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type SortKey = 'date' | 'user'

export const ActivityTable = () => {
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [direction, setDirection] = useState<'asc' | 'desc'>('desc')

  const sortedData = useMemo(() => {
    return [...latestActivities].sort((a, b) => {
      if (sortKey === 'date') {
        const [aDay, aMonth, aYear] = a.date.split('.').map(Number)
        const [bDay, bMonth, bYear] = b.date.split('.').map(Number)
        const dateA = new Date(aYear, aMonth - 1, aDay).getTime()
        const dateB = new Date(bYear, bMonth - 1, bDay).getTime()
        return direction === 'asc' ? dateA - dateB : dateB - dateA
      }
      return direction === 'asc'
        ? a.user.localeCompare(b.user)
        : b.user.localeCompare(a.user)
    })
  }, [sortKey, direction])

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setDirection('asc')
    }
  }

  return (
    <Card className="border-none bg-card">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Son Aktiviteler</CardTitle>
          <p className="text-sm text-muted-foreground">Gerçek zamanlı mock işlemler</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => toggleSort('date')}
          >
            Tarih
            <ChevronDown
              className={`h-4 w-4 transition ${sortKey === 'date' && direction === 'asc' ? 'rotate-180' : ''}`}
            />
          </Button>
          <Button variant="outline" size="sm" className="gap-1" onClick={() => toggleSort('user')}>
            Kullanıcı
            <ChevronDown
              className={`h-4 w-4 transition ${sortKey === 'user' && direction === 'asc' ? 'rotate-180' : ''}`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tarih</TableHead>
              <TableHead>Kullanıcı</TableHead>
              <TableHead>İşlem</TableHead>
              <TableHead className="text-right">Durum</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((activity) => (
              <TableRow key={`${activity.user}-${activity.date}`}>
                <TableCell className="font-medium text-foreground">
                  {activity.date}
                </TableCell>
                <TableCell className="text-foreground">{activity.user}</TableCell>
                <TableCell>{activity.action}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={
                      activity.status === 'Tamamlandı'
                        ? 'success'
                        : activity.status === 'Başarılı'
                        ? 'secondary'
                        : 'warning'
                    }
                  >
                    {activity.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}




