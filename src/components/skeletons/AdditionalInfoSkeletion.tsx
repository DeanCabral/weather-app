import React from 'react'
import Card from '../cards/Card'
import { Skeleton } from '../ui/skeleton'

type Props = {}

export default function AdditionalInfoSkeletion({}: Props) {
  return (
    <Card title="Additional Weather Info" childrenClassName="flex flex-col gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex justify-between">
                <div className="flex gap-4">                    
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="w-20 h-8" />
                </div>
                <Skeleton className="size-8" />
            </div>
        ))}    
    </Card>
  )
}