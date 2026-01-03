'use client'

import { Card, Metric, Text, Flex, ProgressBar } from '@tremor/react'
import { Smartphone, Activity, Clock, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

interface DashboardData {
    recentDosages: Array<{
        id: string
        dosage_start_time: string
        status_log: string | null
    }>
    todayCount: number
    weekCount: number
    activeDevices: number
    totalDevices: number
}

interface DashboardContentProps {
    displayName: string
    dashboardData: DashboardData
}

function formatTimeAgo(date: Date): string {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} min ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return 'Yesterday'
    return `${diffDays} days ago`
}

export default function DashboardContent({ displayName, dashboardData }: DashboardContentProps) {
    const lastDosage = dashboardData.recentDosages[0]
    const lastDosageTime = lastDosage
        ? formatTimeAgo(new Date(lastDosage.dosage_start_time))
        : 'No data'

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Welcome back, {displayName}!
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Here&apos;s an overview of your patient&apos;s medical activity.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Last Dose Card */}
                <Card className="!bg-gradient-to-br !from-blue-600 !to-blue-700 !border-0">
                    <Flex alignItems="start" justifyContent="between">
                        <div>
                            <Text className="!text-blue-100">Last Dose</Text>
                            <Metric className="!text-white mt-1">{lastDosageTime}</Metric>
                            <Text className="!text-blue-200 mt-2">
                                {lastDosage?.status_log === 'Success' ? '✓ Successful' : lastDosage ? '⚠ Check status' : '—'}
                            </Text>
                        </div>
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                    </Flex>
                </Card>

                {/* Today's Doses */}
                <Card decoration="top" decorationColor="emerald">
                    <Flex alignItems="start" justifyContent="between">
                        <div>
                            <Text className="!text-gray-600 dark:!text-gray-300">Today&apos;s Doses</Text>
                            <Metric className="mt-1 !text-gray-900 dark:!text-white">{dashboardData.todayCount}</Metric>
                            <Text className="!text-gray-500 dark:!text-gray-400 mt-2">doses administered</Text>
                        </div>
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                    </Flex>
                </Card>

                {/* Weekly Total */}
                <Card decoration="top" decorationColor="blue">
                    <Flex alignItems="start" justifyContent="between">
                        <div>
                            <Text className="!text-gray-600 dark:!text-gray-300">This Week</Text>
                            <Metric className="mt-1 !text-gray-900 dark:!text-white">{dashboardData.weekCount}</Metric>
                            <Text className="!text-gray-500 dark:!text-gray-400 mt-2">total doses</Text>
                        </div>
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                            <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                    </Flex>
                </Card>

                {/* Device Status */}
                <Card decoration="top" decorationColor="cyan">
                    <Flex alignItems="start" justifyContent="between">
                        <div>
                            <Text className="!text-gray-600 dark:!text-gray-300">Active Devices</Text>
                            <Metric className="mt-1 !text-gray-900 dark:!text-white">
                                {dashboardData.activeDevices}/{dashboardData.totalDevices}
                            </Metric>
                            <ProgressBar
                                value={dashboardData.totalDevices > 0
                                    ? (dashboardData.activeDevices / dashboardData.totalDevices) * 100
                                    : 0
                                }
                                color="cyan"
                                className="mt-3"
                            />
                        </div>
                        <div className="p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl">
                            <Smartphone className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                        </div>
                    </Flex>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/dashboard/devices">
                    <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer group">
                        <Flex alignItems="center" justifyContent="start" className="gap-4">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                                <Smartphone className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <Text className="!text-lg !font-semibold !text-gray-900 dark:!text-white">Device Information</Text>
                                <Text className="!text-gray-500 dark:!text-gray-400">View device status, firmware, and connection details</Text>
                            </div>
                        </Flex>
                    </Card>
                </Link>

                <Link href="/dashboard/dosage-history">
                    <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer group">
                        <Flex alignItems="center" justifyContent="start" className="gap-4">
                            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors">
                                <Activity className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <Text className="!text-lg !font-semibold !text-gray-900 dark:!text-white">Dosage History</Text>
                                <Text className="!text-gray-500 dark:!text-gray-400">View dose records, charts, and export reports</Text>
                            </div>
                        </Flex>
                    </Card>
                </Link>
            </div>

            {/* Recent Activity */}
            <Card>
                <Text className="!text-lg !font-semibold !text-gray-900 dark:!text-white mb-4">Recent Activity</Text>
                <div className="space-y-3">
                    {dashboardData.recentDosages.length > 0 ? (
                        dashboardData.recentDosages.slice(0, 5).map((dosage) => (
                            <div
                                key={dosage.id}
                                className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${dosage.status_log === 'Success' ? 'bg-emerald-500' : 'bg-amber-500'
                                        }`} />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Dose {dosage.status_log === 'Success' ? 'Administered' : 'Attempted'}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {new Date(dosage.dosage_start_time).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${dosage.status_log === 'Success'
                                    ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-300'
                                    : 'bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-300'
                                    }`}>
                                    {dosage.status_log || 'Pending'}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                            <p>No dosage records yet</p>
                            <p className="text-sm">Data will appear here once devices start logging</p>
                        </div>
                    )}
                </div>

                {dashboardData.recentDosages.length > 5 && (
                    <Link
                        href="/dashboard/dosage-history"
                        className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-4 font-medium"
                    >
                        View all history →
                    </Link>
                )}
            </Card>
        </div>
    )
}
