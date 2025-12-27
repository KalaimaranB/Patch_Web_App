import Link from 'next/link'
import { Cpu, Wifi, UserPlus, ArrowLeft } from 'lucide-react'

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
            <div className="w-full max-w-lg">
                {/* Back to Login */}
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to login
                </Link>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-500/30 mb-4">
                        <Cpu className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Device Registration</h1>
                    <p className="text-gray-500 mt-2">
                        Register through your Patch Medical device
                    </p>
                </div>

                {/* Instructions Card */}
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                        How to Register
                    </h2>

                    <div className="space-y-6">
                        {/* Step 1 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
                                1
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Power on your Patch device</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Ensure your ESP32-based Patch Medical device is powered on and the LED indicator is blinking.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
                                2
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                                    <Wifi className="w-4 h-4" />
                                    Connect to device WiFi
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    On your phone or computer, connect to the WiFi network named <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">Patch-XXXX</code> (where XXXX is your device ID).
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
                                3
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Open device portal</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Once connected, a setup page will automatically open. If not, navigate to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">192.168.4.1</code> in your browser.
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
                                4
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                                    <UserPlus className="w-4 h-4" />
                                    Create your account
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Follow the on-screen instructions to create your caregiver account and link it to your device.
                                </p>
                            </div>
                        </div>

                        {/* Step 5 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-semibold text-sm">
                                ✓
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Return here to login</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Once registration is complete, return to this dashboard and log in with your new credentials.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Help Section */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <div className="bg-blue-50 rounded-xl p-4">
                            <h4 className="font-medium text-blue-900 text-sm">Need help?</h4>
                            <p className="text-sm text-blue-700 mt-1">
                                If you&apos;re having trouble with device setup, please contact your healthcare provider or visit our support page.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-400 mt-6">
                    Secure device-based registration for patient safety
                </p>
            </div>
        </div>
    )
}
