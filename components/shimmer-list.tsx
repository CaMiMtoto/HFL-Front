import React from 'react'
import {Skeleton} from "@/components/ui/skeleton";

function ShimmerList() {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full bg-gray-100 shrink-0"/>
            <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-1/2 bg-gray-100"/>
                <Skeleton className="h-4 w-1/4 bg-gray-100"/>
            </div>
        </div>
    )
}

export default ShimmerList
