'use client'

import Sidebar from '@/components/ui/Sidebar'
import Header from '@/components/ui/Header'
import { SidebarProvider } from '@/components/ui/SidebarContext'
import { UserProvider } from '@/components/providers/UserContext'
import { NotificationProvider } from '@/components/providers/NotificationProvider'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <UserProvider>
            <NotificationProvider>
                <SidebarProvider>
                    <div className="min-h-screen bg-slate-50 dark:bg-gray-950">
                        <Sidebar />
                        <div className="lg:ml-64 transition-all duration-300">
                            <Header />
                            <main className="p-4 lg:p-6">
                                {children}
                            </main>
                        </div>
                    </div>
                </SidebarProvider>
            </NotificationProvider>
        </UserProvider>
    )
}
