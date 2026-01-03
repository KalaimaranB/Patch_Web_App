'use client'

import { useEffect } from 'react'
import { Check, Trash2, Heart } from 'lucide-react'
import Link from 'next/link'

export default function AccountDeletedPage() {
    useEffect(() => {
        // Ensure user is fully logged out
        if (typeof window !== 'undefined') {
            // Clear any remaining session data
            localStorage.clear()
            sessionStorage.clear()
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-100 dark:bg-green-900/30 rounded-full blur-xl opacity-50"></div>
                            <div className="relative p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                                <Check className="w-12 h-12 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>

                    {/* Main Message */}
                    <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
                        Account Successfully Deleted
                    </h1>

                    <p className="text-center text-gray-600 dark:text-gray-400 text-lg mb-8">
                        Your account and all associated data have been permanently removed from our systems.
                    </p>

                    {/* What Was Deleted Section */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-4">
                            <Trash2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                What We Deleted
                            </h2>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                Your account credentials and profile information
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                All medical dosage history and records
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                Device connections and settings
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                All personal preferences and configurations
                            </li>
                        </ul>
                    </div>

                    {/* Important Notice */}
                    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 mb-8 border border-amber-200 dark:border-amber-800">
                        <p className="text-sm text-amber-900 dark:text-amber-200 font-medium mb-2">
                            🔒 This action is permanent
                        </p>
                        <p className="text-sm text-amber-800 dark:text-amber-300">
                            All your data has been completely erased from our servers and cannot be recovered.
                            If you created a new account with the same email address, it will start fresh with no connection to your previous data.
                        </p>
                    </div>

                    {/* Thank You Message */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-3">
                            <Heart className="w-6 h-6 text-pink-500 dark:text-pink-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Thank You for Using Patch Medical
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            We appreciate the time you spent with us. We're sorry to see you go, and we hope our service was helpful during your time with us.
                        </p>
                    </div>

                    {/* Next Steps */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                            What's Next?
                        </h3>
                        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 mb-6">
                            <p className="flex items-start gap-2">
                                <span className="font-bold text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                                <span>You can create a new account anytime at our registration page</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <span className="font-bold text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                                <span>If you have any feedback about why you left, we'd love to hear from you</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <span className="font-bold text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                                <span>Contact our support team if you have any questions</span>
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/register"
                                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors text-center"
                            >
                                Create New Account
                            </Link>
                            <Link
                                href="/"
                                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
                            >
                                Return to Home
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                    Your privacy is important to us. All data deletion is permanent and irreversible.
                </p>
            </div>
        </div>
    )
}
