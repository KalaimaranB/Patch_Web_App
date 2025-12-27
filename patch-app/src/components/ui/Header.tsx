'use client'

import { LogOut, Bell, Menu } from 'lucide-react'
import { logout } from '@/app/login/actions'
import { useSidebar } from './SidebarContext'
import { useUser } from '@/components/providers/UserContext'

export default function Header() {
    const { toggle } = useSidebar()
    const { user, loading } = useUser()

    const displayName = user?.profile?.preferred_name || user?.email?.split('@')[0] || 'User'

    return (
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 lg:px-6">
            {/* Left side - Mobile menu + Page title area */}
            <div className="flex items-center gap-3">
                {/* Hamburger menu - mobile only */}
                <button
                    onClick={toggle}
                    className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white transition-all"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div id="page-title-portal" />
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
                {/* Notifications */}
                <button className="relative p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-white transition-all">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
                </button>

                {/* User dropdown */}
                <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-gray-200 dark:border-gray-700">
                    {loading ? (
                        <div className="animate-pulse flex items-center gap-2">
                            <div className="hidden sm:block">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-1" />
                                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-16" />
                            </div>
                            <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-full" />
                        </div>
                    ) : (
                        <>
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{displayName}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Caregiver</p>
                            </div>

                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-sm shadow-md shadow-blue-500/20">
                                {displayName.charAt(0).toUpperCase()}
                            </div>
                        </>
                    )}

                    <form action={logout}>
                        <button
                            type="submit"
                            className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                            title="Sign out"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </header>
    )
}
