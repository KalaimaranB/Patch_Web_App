'use client'

export function SkeletonCard({ className = '' }: { className?: string }) {
    return (
        <div className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 animate-pulse ${className}`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-3" />
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2" />
                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-28" />
                </div>
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl" />
            </div>
        </div>
    )
}

export function SkeletonDeviceCard() {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 animate-pulse">
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
            </div>
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2" />
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-32 mb-4" />

            <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-24" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export function SkeletonActivityItem() {
    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0 animate-pulse">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28 mb-1" />
                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-36" />
                </div>
            </div>
            <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded-full w-16" />
        </div>
    )
}

export function SkeletonTableRow() {
    return (
        <tr className="animate-pulse">
            <td className="py-4 px-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mx-auto mb-1" />
                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-16 mx-auto" />
            </td>
            <td className="py-4 px-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16 mx-auto" />
            </td>
            <td className="py-4 px-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10 mx-auto" />
            </td>
            <td className="py-4 px-4">
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-20 mx-auto" />
            </td>
        </tr>
    )
}

export function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            {/* Header skeleton */}
            <div className="mb-8">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-72 mb-2 animate-pulse" />
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-96 animate-pulse" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 animate-pulse">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl" />
                            <div>
                                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2" />
                                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-48" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4 animate-pulse" />
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <SkeletonActivityItem key={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export function DevicesSkeleton() {
    return (
        <div className="space-y-6">
            {/* Header skeleton */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse" />
                    <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-64 animate-pulse" />
                </div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-36 animate-pulse" />
            </div>

            {/* Devices Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <SkeletonDeviceCard key={i} />
                ))}
            </div>
        </div>
    )
}
