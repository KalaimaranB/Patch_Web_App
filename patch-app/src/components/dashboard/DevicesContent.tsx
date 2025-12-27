'use client'

import { Card, Text, Flex } from '@tremor/react'
import { Smartphone, Wifi, WifiOff, Battery, Settings } from 'lucide-react'

interface DeviceStats {
    device_id: string
    mac_address: string
    firmware_version: string | null
    is_active: boolean | null
    role: string | null
    lastActivity: string | null
    lastStatus: string | null
    totalDosages: number
}

interface DevicesContentProps {
    devices: DeviceStats[]
}

export default function DevicesContent({ devices }: DevicesContentProps) {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Devices</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Manage and monitor your connected medical devices
                    </p>
                </div>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-300">
                    {devices.length} Device{devices.length !== 1 ? 's' : ''} Connected
                </span>
            </div>

            {/* Devices Grid */}
            {devices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {devices.map((device) => (
                        <Card key={device.device_id} className="hover:shadow-md transition-shadow">
                            <Flex alignItems="start" justifyContent="between" className="mb-4">
                                <div className={`p-3 rounded-2xl ${device.is_active ? 'bg-emerald-50 dark:bg-emerald-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                                    <Smartphone className={`w-6 h-6 ${device.is_active ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`} />
                                </div>
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${device.is_active ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-300' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                                    {device.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </Flex>

                            <Text className="!text-lg !font-semibold !text-gray-900 dark:!text-white">
                                Device
                            </Text>
                            <Text className="!text-sm !text-gray-500 dark:!text-gray-400 font-mono mt-1">
                                {device.mac_address}
                            </Text>

                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 space-y-3">
                                {/* Connection Status */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                        {device.is_active ? (
                                            <Wifi className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                                        ) : (
                                            <WifiOff className="w-4 h-4 text-gray-400" />
                                        )}
                                        <span className="text-sm">Connection</span>
                                    </div>
                                    <span className={`text-sm font-medium ${device.is_active ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
                                        {device.is_active ? 'Online' : 'Offline'}
                                    </span>
                                </div>

                                {/* Firmware */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                        <Settings className="w-4 h-4" />
                                        <span className="text-sm">Firmware</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {device.firmware_version || 'Unknown'}
                                    </span>
                                </div>

                                {/* Total Dosages */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                        <Battery className="w-4 h-4" />
                                        <span className="text-sm">Total Doses</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {device.totalDosages}
                                    </span>
                                </div>

                                {/* Last Activity */}
                                {device.lastActivity && (
                                    <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                                        <Text className="!text-xs !text-gray-400">Last Activity</Text>
                                        <Text className="!text-sm !text-gray-700 dark:!text-gray-300 mt-0.5">
                                            {new Date(device.lastActivity).toLocaleString()}
                                        </Text>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold mt-1 ${device.lastStatus === 'Success' ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-300'}`}>
                                            {device.lastStatus || 'Unknown'}
                                        </span>
                                    </div>
                                )}

                                {/* Role */}
                                <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                                    <Text className="!text-xs !text-gray-400">Your Role</Text>
                                    <Text className="!text-sm !text-gray-700 dark:!text-gray-300 mt-0.5 capitalize">
                                        {device.role || 'Owner'}
                                    </Text>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="text-center py-12">
                    <Smartphone className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <Text className="!text-lg !font-semibold !text-gray-900 dark:!text-white">No Devices Found</Text>
                    <Text className="!text-gray-500 dark:!text-gray-400 mt-2">
                        Devices linked to your account will appear here.
                    </Text>
                    <Text className="!text-sm !text-gray-400 mt-4">
                        Contact your administrator to link a device to your account.
                    </Text>
                </Card>
            )}
        </div>
    )
}
