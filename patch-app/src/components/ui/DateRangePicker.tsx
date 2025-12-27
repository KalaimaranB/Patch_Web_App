'use client'

import { useState, useEffect } from 'react'
import { Calendar, ChevronDown } from 'lucide-react'
import { format, subDays, startOfDay, endOfDay } from 'date-fns'

interface DateRange {
    from: Date
    to: Date
}

interface DateRangePickerProps {
    value: DateRange
    onChange: (range: DateRange) => void
}

const presets = [
    { label: 'Today', days: 0 },
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 30 days', days: 30 },
    { label: 'Last 90 days', days: 90 },
]

export default function DateRangePicker({ value, onChange }: DateRangePickerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [tempFrom, setTempFrom] = useState(format(value.from, 'yyyy-MM-dd'))
    const [tempTo, setTempTo] = useState(format(value.to, 'yyyy-MM-dd'))

    useEffect(() => {
        setTempFrom(format(value.from, 'yyyy-MM-dd'))
        setTempTo(format(value.to, 'yyyy-MM-dd'))
    }, [value])

    const handlePreset = (days: number) => {
        const to = endOfDay(new Date())
        const from = startOfDay(days === 0 ? new Date() : subDays(new Date(), days))
        onChange({ from, to })
        setIsOpen(false)
    }

    const handleApply = () => {
        const from = startOfDay(new Date(tempFrom))
        const to = endOfDay(new Date(tempTo))
        if (from <= to) {
            onChange({ from, to })
            setIsOpen(false)
        }
    }

    const formatDisplayDate = () => {
        const fromStr = format(value.from, 'MMM d, yyyy')
        const toStr = format(value.to, 'MMM d, yyyy')
        if (fromStr === toStr) return fromStr
        return `${fromStr} - ${toStr}`
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
            >
                <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatDisplayDate()}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50 min-w-[320px]">
                        {/* Presets */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {presets.map((preset) => (
                                <button
                                    key={preset.label}
                                    onClick={() => handlePreset(preset.days)}
                                    className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
                                Custom Range
                            </p>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">From</label>
                                    <input
                                        type="date"
                                        value={tempFrom}
                                        onChange={(e) => setTempFrom(e.target.value)}
                                        max={tempTo}
                                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">To</label>
                                    <input
                                        type="date"
                                        value={tempTo}
                                        onChange={(e) => setTempTo(e.target.value)}
                                        min={tempFrom}
                                        max={format(new Date(), 'yyyy-MM-dd')}
                                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleApply}
                                className="w-full mt-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Apply Range
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
