import React from 'react'
import Card from '../cards/Card'
import { Skeleton } from '../ui/skeleton'

type Props = {}

export default function HourlySkeleton({}: Props) {
  return (
    <Card title="Hourly Forecast" childrenClassName="flex gap-4 overflow-x-scroll">
          {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2 items-center p-2">
                <Skeleton className="w-15 h-6" />
                <Skeleton className="size-8" />
                <Skeleton className="w-8 h-6" />
              </div>
          ))}
    </Card>
  )
}