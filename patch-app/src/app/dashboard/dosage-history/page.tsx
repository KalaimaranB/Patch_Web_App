'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, Text, Badge, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from '@tremor/react'
import { Calendar, Download, ChevronLeft, ChevronRight, Activity } from 'lucide-react'
import { format, subDays, startOfDay, endOfDay, eachDayOfInterval, parseISO } from 'date-fns'
import { createClient } from '@/lib/supabase/client'
import DateRangePicker from '@/components/ui/DateRangePicker'
import DosageChart from '@/components/charts/DosageChart'
import type { MedicalRaw } from '@/types/database'

interface DateRange {
    from: Date
    to: Date
}

interface ChartData {
    date: string
    successful: number
    failed: number
    total: number
}

const PAGE_SIZE = 20

export default function DosageHistoryPage() {
    const [dateRange, setDateRange] = useState<DateRange>({
        from: startOfDay(subDays(new Date(), 30)), // Extended to 30 days by default
        to: endOfDay(new Date())
    })
    const [dosages, setDosages] = useState<MedicalRaw[]>([])
    const [chartData, setChartData] = useState<ChartData[]>([])
    const [loading, setLoading] = useState(true)
    const [initialLoading, setInitialLoading] = useState(true) // Separate initial load state
    const [page, setPage] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [deviceIds, setDeviceIds] = useState<string[]>([])
    const [hasDevices, setHasDevices] = useState<boolean | null>(null) // Track if user has devices

    // Fetch user's device IDs
    useEffect(() => {
        async function fetchDeviceIds() {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const { data: userDevices } = await supabase
                    .from('user_devices')
                    .select('device_id')
                    .eq('user_id', user.id)

                const ids = userDevices?.map(ud => ud.device_id) || []
                setDeviceIds(ids)
                setHasDevices(ids.length > 0)
            }
            setInitialLoading(false)
        }
        fetchDeviceIds()
    }, [])

    // Fetch dosage data when date range or page changes
    const fetchData = useCallback(async () => {
        // Don't fetch until we know if user has devices
        if (hasDevices === null) return

        // If user has no devices, nothing to fetch
        if (!hasDevices) {
            setLoading(false)
            return
        }

        setLoading(true)
        const supabase = createClient()

        // Fetch paginated records
        const start = page * PAGE_SIZE
        const end = start + PAGE_SIZE - 1

        const { data, count } = await supabase
            .from('medical_raw')
            .select('*', { count: 'exact' })
            .in('device_id', deviceIds)
            .gte('dosage_start_time', dateRange.from.toISOString())
            .lte('dosage_start_time', dateRange.to.toISOString())
            .order('dosage_start_time', { ascending: false })
            .range(start, end)

        setDosages(data || [])
        setTotalCount(count || 0)

        // Fetch all records for chart (aggregated by day)
        const { data: allRecords } = await supabase
            .from('medical_raw')
            .select('dosage_start_time, status_log')
            .in('device_id', deviceIds)
            .gte('dosage_start_time', dateRange.from.toISOString())
            .lte('dosage_start_time', dateRange.to.toISOString())

        // Aggregate by day for chart
        const days = eachDayOfInterval({ start: dateRange.from, end: dateRange.to })
        const aggregated: ChartData[] = days.map(day => {
            const dayStr = format(day, 'yyyy-MM-dd')
            const dayRecords = (allRecords || []).filter(r =>
                format(parseISO(r.dosage_start_time), 'yyyy-MM-dd') === dayStr
            )
            const successful = dayRecords.filter(r => r.status_log === 'Success').length
            const failed = dayRecords.length - successful

            return {
                date: format(day, 'MMM d'),
                successful,
                failed,
                total: dayRecords.length
            }
        })

        setChartData(aggregated)
        setLoading(false)
    }, [deviceIds, dateRange, page, hasDevices])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    // Reset page when date range changes
    useEffect(() => {
        setPage(0)
    }, [dateRange])

    const totalPages = Math.ceil(totalCount / PAGE_SIZE)

    const handleExport = () => {
        // Create CSV from dosages data
        const headers = ['Date/Time', 'Status', 'Duration', 'Device ID']
        const rows = dosages.map(d => {
            const duration = d.dosage_end_time
                ? Math.round((new Date(d.dosage_end_time).getTime() - new Date(d.dosage_start_time).getTime()) / 1000)
                : 'N/A'
            return [
                new Date(d.dosage_start_time).toLocaleString(),
                d.status_log || 'Unknown',
                `${duration}s`,
                d.device_id
            ]
        })

        const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `dosage-history-${format(dateRange.from, 'yyyy-MM-dd')}-${format(dateRange.to, 'yyyy-MM-dd')}.csv`
        a.click()
        window.URL.revokeObjectURL(url)
    }

    // Show loading while fetching device IDs
    if (initialLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto" />
                    <p className="text-gray-500 dark:text-gray-400 mt-4">Loading your data...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dosage History</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Track and analyze medication administration records
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <DateRangePicker value={dateRange} onChange={setDateRange} />
                    <button
                        onClick={handleExport}
                        disabled={dosages.length === 0}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Export</span>
                    </button>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card decoration="left" decorationColor="blue">
                    <Text className="!text-gray-600 dark:!text-gray-300">Total Doses</Text>
                    <Text className="!text-3xl !font-bold !text-gray-900 dark:!text-white mt-2">{totalCount}</Text>
                    <Text className="!text-gray-500 dark:!text-gray-400 !text-sm mt-1">in selected period</Text>
                </Card>

                <Card decoration="left" decorationColor="emerald">
                    <Text className="!text-gray-600 dark:!text-gray-300">Successful</Text>
                    <Text className="!text-3xl !font-bold !text-emerald-600 dark:!text-emerald-400 mt-2">
                        {chartData.reduce((sum, d) => sum + d.successful, 0)}
                    </Text>
                    <Text className="!text-gray-500 dark:!text-gray-400 !text-sm mt-1">doses completed</Text>
                </Card>

                <Card decoration="left" decorationColor="amber">
                    <Text className="!text-gray-600 dark:!text-gray-300">Other/Failed</Text>
                    <Text className="!text-3xl !font-bold !text-amber-600 dark:!text-amber-400 mt-2">
                        {chartData.reduce((sum, d) => sum + d.failed, 0)}
                    </Text>
                    <Text className="!text-gray-500 dark:!text-gray-400 !text-sm mt-1">need attention</Text>
                </Card>
            </div>

            {/* Chart */}
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <Text className="!text-lg !font-semibold !text-gray-900 dark:!text-white">Adherence Overview</Text>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-300">
                        {format(dateRange.from, 'MMM d')} - {format(dateRange.to, 'MMM d, yyyy')}
                    </span>
                </div>

                {loading ? (
                    <div className="h-[300px] flex items-center justify-center">
                        <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full" />
                    </div>
                ) : (
                    <DosageChart data={chartData} />
                )}
            </Card>

            {/* Data Table */}
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <Text className="!text-lg !font-semibold !text-gray-900 dark:!text-white">Dosage Log</Text>
                    <Text className="!text-gray-500 dark:!text-gray-400 !text-sm">
                        Showing {dosages.length} of {totalCount} records
                    </Text>
                </div>

                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full" />
                    </div>
                ) : dosages.length > 0 ? (
                    <>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell className="text-center">Date & Time</TableHeaderCell>
                                    <TableHeaderCell className="text-center">Status</TableHeaderCell>
                                    <TableHeaderCell className="text-center">Duration</TableHeaderCell>
                                    <TableHeaderCell className="text-center">Device</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dosages.map((dosage) => {
                                    const duration = dosage.dosage_end_time
                                        ? Math.round((new Date(dosage.dosage_end_time).getTime() - new Date(dosage.dosage_start_time).getTime()) / 1000)
                                        : null

                                    return (
                                        <TableRow key={dosage.id}>
                                            <TableCell className="text-center">
                                                <div>
                                                    <Text className="!font-medium !text-gray-900 dark:!text-white">
                                                        {format(parseISO(dosage.dosage_start_time), 'MMM d, yyyy')}
                                                    </Text>
                                                    <Text className="!text-xs !text-gray-500 dark:!text-gray-400">
                                                        {format(parseISO(dosage.dosage_start_time), 'h:mm a')}
                                                    </Text>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${dosage.status_log === 'Success'
                                                    ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-300'
                                                    : 'bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-300'
                                                    }`}>
                                                    {dosage.status_log || 'Unknown'}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center text-gray-700 dark:text-gray-300">
                                                {duration !== null ? `${duration}s` : '—'}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Text className="!text-xs !font-mono !text-gray-500 dark:!text-gray-400">
                                                    {dosage.device_id.slice(0, 8)}...
                                                </Text>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <Text className="!text-sm !text-gray-500 dark:!text-gray-400">
                                    Page {page + 1} of {totalPages}
                                </Text>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setPage(p => Math.max(0, p - 1))}
                                        disabled={page === 0}
                                        className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    </button>
                                    <button
                                        onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                                        disabled={page >= totalPages - 1}
                                        className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                        <Text className="!text-gray-900 dark:!text-white !font-medium">No Records Found</Text>
                        <Text className="!text-gray-500 dark:!text-gray-400 !text-sm mt-1">
                            Try adjusting the date range to find dosage records
                        </Text>
                    </div>
                )}
            </Card>
        </div>
    )
}
