import { createClient } from '@/lib/supabase/server'
import DevicesContent from '@/components/dashboard/DevicesContent'

interface DeviceData {
    device_id: string
    mac_address: string
    firmware_version: string | null
    is_active: boolean | null
    created_at: string
}

interface UserDeviceRow {
    device_id: string
    role: string | null
    devices: DeviceData | null
}

async function getDevicesData(userId: string) {
    const supabase = await createClient()

    // Get user's devices with their details
    const { data: userDevices } = await supabase
        .from('user_devices')
        .select(`
      device_id,
      role,
      devices (
        device_id,
        mac_address,
        firmware_version,
        is_active,
        created_at
      )
    `)
        .eq('user_id', userId)

    // For each device, get the latest medical record
    const devicesWithStats = await Promise.all(
        ((userDevices as unknown as UserDeviceRow[]) || []).map(async (ud) => {
            const device = ud.devices
            if (!device) return null

            const { data: latestRecord } = await supabase
                .from('medical_raw')
                .select('dosage_start_time, status_log')
                .eq('device_id', device.device_id)
                .order('dosage_start_time', { ascending: false })
                .limit(1)
                .single()

            const { count: totalRecords } = await supabase
                .from('medical_raw')
                .select('*', { count: 'exact', head: true })
                .eq('device_id', device.device_id)

            return {
                device_id: device.device_id,
                mac_address: device.mac_address,
                firmware_version: device.firmware_version,
                is_active: device.is_active,
                role: ud.role,
                lastActivity: latestRecord?.dosage_start_time || null,
                lastStatus: latestRecord?.status_log || null,
                totalDosages: totalRecords || 0
            }
        })
    )

    return devicesWithStats.filter((d): d is NonNullable<typeof d> => d !== null)
}

export default async function DevicesPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const devices = await getDevicesData(user.id)

    return <DevicesContent devices={devices} />
}
