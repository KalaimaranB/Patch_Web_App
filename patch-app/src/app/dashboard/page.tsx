import { createClient } from '@/lib/supabase/server'
import DashboardContent from '@/components/dashboard/DashboardContent'

interface DeviceData {
    device_id: string
    mac_address: string
    firmware_version: string | null
    is_active: boolean | null
}

interface UserDeviceRow {
    device_id: string
    devices: DeviceData | null
}

async function getDashboardData(userId: string) {
    const supabase = await createClient()

    // Get user's devices
    const { data: userDevices } = await supabase
        .from('user_devices')
        .select(`
      device_id,
      devices (
        device_id,
        mac_address,
        firmware_version,
        is_active
      )
    `)
        .eq('user_id', userId)

    const typedUserDevices = (userDevices as unknown as UserDeviceRow[]) || []
    const deviceIds = typedUserDevices.map(ud => ud.device_id)

    // Get recent medical records for these devices
    const { data: recentDosages } = await supabase
        .from('medical_raw')
        .select('id, dosage_start_time, status_log')
        .in('device_id', deviceIds.length > 0 ? deviceIds : ['none'])
        .order('dosage_start_time', { ascending: false })
        .limit(10)

    // Get today's count
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { count: todayCount } = await supabase
        .from('medical_raw')
        .select('*', { count: 'exact', head: true })
        .in('device_id', deviceIds.length > 0 ? deviceIds : ['none'])
        .gte('dosage_start_time', today.toISOString())

    // Get last 7 days count
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)

    const { count: weekCount } = await supabase
        .from('medical_raw')
        .select('*', { count: 'exact', head: true })
        .in('device_id', deviceIds.length > 0 ? deviceIds : ['none'])
        .gte('dosage_start_time', weekAgo.toISOString())

    return {
        recentDosages: recentDosages || [],
        todayCount: todayCount || 0,
        weekCount: weekCount || 0,
        activeDevices: typedUserDevices.filter(ud => ud.devices?.is_active).length,
        totalDevices: typedUserDevices.length
    }
}

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    // Get profile for greeting
    const { data: profile } = await supabase
        .from('profiles')
        .select('preferred_name')
        .eq('id', user.id)
        .single()

    const dashboardData = await getDashboardData(user.id)
    const displayName = profile?.preferred_name || user.email?.split('@')[0] || 'Caregiver'

    return (
        <DashboardContent
            displayName={displayName}
            dashboardData={dashboardData}
        />
    )
}
