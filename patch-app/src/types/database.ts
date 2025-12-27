// Database types based on Supabase schema

export interface Profile {
    id: string
    preferred_name: string | null
    age: number | null
    date_of_birth: string | null
    created_at: string
}

export interface Device {
    device_id: string
    mac_address: string
    firmware_version: string | null
    is_active: boolean | null
    created_at: string
}

export interface UserDevice {
    id: number
    user_id: string
    device_id: string
    role: string | null
}

export interface MedicalRaw {
    id: string
    device_id: string
    dosage_start_time: string
    dosage_end_time: string | null
    status_log: string | null
    created_at: string | null
    payload: Record<string, unknown> | null
}

// Extended types with relations
export interface MedicalRawWithDevice extends MedicalRaw {
    devices?: Device
}

export interface DeviceWithMedicalHistory extends Device {
    medical_raw?: MedicalRaw[]
}

// Dashboard display types
export interface DosageHistoryItem {
    id: string
    dosage_start_time: string
    dosage_end_time: string | null
    status_log: string | null
    device_mac: string
    duration_seconds: number | null
}

export interface DosageChartData {
    date: string
    count: number
    successful: number
    failed: number
}

export interface DeviceStatusCard {
    device_id: string
    mac_address: string
    firmware_version: string | null
    is_active: boolean
    last_dosage: string | null
    total_dosages: number
}
