'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, Text } from '@tremor/react'
import { User, Bell, Moon, Sun, Save, Check, Trash2, AlertTriangle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function SettingsPage() {
    const router = useRouter()
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

    // Delete account modal states
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false)
    const [deleteConfirmText, setDeleteConfirmText] = useState('')
    const [deletingAccount, setDeletingAccount] = useState(false)

    // Wipe data modal states
    const [showWipeDataModal, setShowWipeDataModal] = useState(false)
    const [wipingData, setWipingData] = useState(false)

    // Error/success states
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

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

    const handleDeleteAccount = async () => {
        if (deleteConfirmText !== 'DELETE MY ACCOUNT') {
            setError('Please type the confirmation phrase exactly')
            return
        }

        setDeletingAccount(true)
        setError('')

        try {
            const supabase = createClient()
            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                setError('Not authenticated')
                setDeletingAccount(false)
                return
            }

            const response = await fetch('https://rylgzpjewjamxkvhtbos.supabase.co/functions/v1/delete-user-rpc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({ confirm: true }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to delete account')
            }

            // Account deleted successfully, sign out and redirect
            await supabase.auth.signOut()
            router.push('/account-deleted')
        } catch (err: any) {
            setError(err.message || 'Failed to delete account')
            setDeletingAccount(false)
        }
    }

    const handleWipeData = async () => {
        setWipingData(true)
        setError('')
        setSuccess('')

        try {
            const supabase = createClient()
            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                setError('Not authenticated')
                setWipingData(false)
                return
            }

            const response = await fetch('https://rylgzpjewjamxkvhtbos.supabase.co/functions/v1/delete_user_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({ confirm: true }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to wipe data')
            }

            setSuccess('All medical data has been permanently deleted')
            setShowWipeDataModal(false)
            setWipingData(false)

            // Reload the page after 2 seconds
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        } catch (err: any) {
            setError(err.message || 'Failed to wipe data')
            setWipingData(false)
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

            {/* Danger Zone */}
            <Card className="border-red-200 dark:border-red-900/50">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-xl">
                        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <Text className="!text-lg !font-semibold !text-red-900 dark:!text-red-400">Danger Zone</Text>
                </div>

                {/* Error/Success Messages */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}
                {success && (
                    <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                        <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
                    </div>
                )}

                <div className="space-y-4">
                    {/* Wipe Data Button */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                        <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Wipe My Data</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Permanently delete all your medical data</p>
                        </div>
                        <button
                            onClick={() => setShowWipeDataModal(true)}
                            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            Wipe Data
                        </button>
                    </div>

                    {/* Delete Account Button */}
                    <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-xl bg-red-50/50 dark:bg-red-900/10">
                        <div>
                            <p className="text-sm font-medium text-red-900 dark:text-red-400">Delete My Account and All My Data</p>
                            <p className="text-xs text-red-600 dark:text-red-500">This action cannot be undone</p>
                        </div>
                        <button
                            onClick={() => setShowDeleteAccountModal(true)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </Card>

            {/* Delete Account Modal */}
            {showDeleteAccountModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-xl animate-scale-in">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl">
                                <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Delete Account</h3>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            This will permanently delete your account and all associated data. This action cannot be undone.
                        </p>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Type <span className="font-bold text-red-600 dark:text-red-400">DELETE MY ACCOUNT</span> to confirm
                            </label>
                            <input
                                type="text"
                                value={deleteConfirmText}
                                onChange={(e) => {
                                    setDeleteConfirmText(e.target.value)
                                    setError('')
                                }}
                                placeholder="DELETE MY ACCOUNT"
                                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowDeleteAccountModal(false)
                                    setDeleteConfirmText('')
                                    setError('')
                                }}
                                disabled={deletingAccount}
                                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={deletingAccount || deleteConfirmText !== 'DELETE MY ACCOUNT'}
                                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {deletingAccount ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4" />
                                        Delete Forever
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Wipe Data Modal */}
            {showWipeDataModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-xl animate-scale-in">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                                <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Wipe Medical Data</h3>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                            This will permanently delete all your medical data including dosage history and device information. This action cannot be undone.
                        </p>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowWipeDataModal(false)
                                    setError('')
                                }}
                                disabled={wipingData}
                                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleWipeData}
                                disabled={wipingData}
                                className="flex-1 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {wipingData ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Wiping...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4" />
                                        Wipe Data
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
