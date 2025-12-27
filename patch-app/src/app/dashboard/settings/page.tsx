'use client'

import { useState, useEffect } from 'react'
import { Card, Text } from '@tremor/react'
import { User, Bell, Shield, Moon, Sun, Save, Check } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function SettingsPage() {
    const [preferredName, setPreferredName] = useState('')
    const [email, setEmail] = useState('')
    const [notifications, setNotifications] = useState({
        dosageAlerts: true,
        deviceStatus: true,
        weeklyReport: false,
    })
    const [darkMode, setDarkMode] = useState(false)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        async function loadSettings() {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                setEmail(user.email || '')

                const { data: profile } = await supabase
                    .from('profiles')
                    .select('preferred_name')
                    .eq('id', user.id)
                    .single()

                if (profile?.preferred_name) {
                    setPreferredName(profile.preferred_name)
                }
            }
        }

        // Check system dark mode preference
        if (typeof window !== 'undefined') {
            setDarkMode(document.documentElement.classList.contains('dark'))
        }

        loadSettings()
    }, [])

    const handleSave = async () => {
        setSaving(true)
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
            await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    preferred_name: preferredName,
                    updated_at: new Date().toISOString(),
                })
        }

        setSaving(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    const toggleDarkMode = () => {
        const newMode = !darkMode
        setDarkMode(newMode)

        if (newMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }

    return (
        <div className="space-y-6 animate-fade-in max-w-3xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Manage your account preferences and notifications
                </p>
            </div>

            {/* Profile Settings */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                        <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <Text className="!text-lg !font-semibold !text-gray-900 dark:!text-white">Profile</Text>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Display Name
                        </label>
                        <input
                            type="text"
                            value={preferredName}
                            onChange={(e) => setPreferredName(e.target.value)}
                            placeholder="Enter your preferred name"
                            className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            disabled
                            className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                    </div>
                </div>
            </Card>

            {/* Notification Settings */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
                        <Bell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <Text className="!text-lg !font-semibold !text-gray-900 dark:!text-white">Notifications</Text>
                </div>

                <div className="space-y-4">
                    {[
                        { key: 'dosageAlerts', label: 'Dosage Alerts', desc: 'Get notified when a dose is administered' },
                        { key: 'deviceStatus', label: 'Device Status', desc: 'Alerts when device goes offline' },
                        { key: 'weeklyReport', label: 'Weekly Report', desc: 'Summary of weekly dosage activity' },
                    ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-2">
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                            </div>
                            <button
                                onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                                className={`relative w-11 h-6 rounded-full transition-colors ${notifications[item.key as keyof typeof notifications]
                                        ? 'bg-blue-600'
                                        : 'bg-gray-200 dark:bg-gray-700'
                                    }`}
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${notifications[item.key as keyof typeof notifications] ? 'translate-x-5' : ''
                                        }`}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Appearance */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                        {darkMode ? (
                            <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        ) : (
                            <Sun className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        )}
                    </div>
                    <Text className="!text-lg !font-semibold !text-gray-900 dark:!text-white">Appearance</Text>
                </div>

                <div className="flex items-center justify-between py-2">
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Switch between light and dark theme</p>
                    </div>
                    <button
                        onClick={toggleDarkMode}
                        className={`relative w-11 h-6 rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                    >
                        <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${darkMode ? 'translate-x-5' : ''
                                }`}
                        />
                    </button>
                </div>
            </Card>

            {/* Save Button */}
            <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
            >
                {saved ? (
                    <>
                        <Check className="w-5 h-5" />
                        Saved!
                    </>
                ) : saving ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                    </>
                ) : (
                    <>
                        <Save className="w-5 h-5" />
                        Save Changes
                    </>
                )}
            </button>
        </div>
    )
}
