'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { X, CheckCircle2, AlertCircle } from 'lucide-react'

interface Notification {
    id: string
    type: 'success' | 'warning' | 'info'
    title: string
    message: string
    timestamp: Date
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [deviceIds, setDeviceIds] = useState<string[]>([])

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
            }
        }
        fetchDeviceIds()
    }, [])

    // Subscribe to real-time dosage events
    useEffect(() => {
        if (deviceIds.length === 0) return

        const supabase = createClient()

        const channel = supabase
            .channel('dosage-notifications')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'medical_raw',
                    filter: `device_id=in.(${deviceIds.join(',')})`
                },
                (payload) => {
                    const record = payload.new as { status_log?: string; dosage_start_time?: string }
                    const isSuccess = record.status_log === 'Success'

                    const notification: Notification = {
                        id: crypto.randomUUID(),
                        type: isSuccess ? 'success' : 'warning',
                        title: isSuccess ? 'Dose Administered' : 'Dose Attempted',
                        message: isSuccess
                            ? 'A new dose was successfully administered.'
                            : 'A dose was attempted but may need attention.',
                        timestamp: new Date(),
                    }

                    setNotifications(prev => [notification, ...prev.slice(0, 4)])

                    // Auto-dismiss after 5 seconds
                    setTimeout(() => {
                        setNotifications(prev => prev.filter(n => n.id !== notification.id))
                    }, 5000)
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [deviceIds])

    const dismissNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
    }

    return (
        <>
            {children}

            {/* Toast notifications */}
            <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`
                            flex items-start gap-3 p-4 rounded-xl shadow-lg border animate-fade-in
                            ${notification.type === 'success'
                                ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800'
                                : 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800'
                            }
                        `}
                    >
                        {notification.type === 'success' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        ) : (
                            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${notification.type === 'success'
                                    ? 'text-emerald-900 dark:text-emerald-100'
                                    : 'text-amber-900 dark:text-amber-100'
                                }`}>
                                {notification.title}
                            </p>
                            <p className={`text-xs mt-0.5 ${notification.type === 'success'
                                    ? 'text-emerald-700 dark:text-emerald-300'
                                    : 'text-amber-700 dark:text-amber-300'
                                }`}>
                                {notification.message}
                            </p>
                        </div>
                        <button
                            onClick={() => dismissNotification(notification.id)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}
