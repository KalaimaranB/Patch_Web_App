'use client'

import { useState } from 'react'
import { Card, Text } from '@tremor/react'
import { HelpCircle, ChevronDown, Mail, MessageCircle, FileText, ExternalLink } from 'lucide-react'

const faqs = [
    {
        question: 'How do I connect a new device?',
        answer: 'To connect a new device, power on your Patch Medical device and follow the setup instructions. The device will automatically appear in your dashboard once connected via your WiFi network.'
    },
    {
        question: 'Why is my device showing as offline?',
        answer: 'A device may show as offline if it has lost WiFi connection or has been powered off. Check that the device is plugged in and your WiFi network is working. The device should reconnect automatically.'
    },
    {
        question: 'How accurate is the dosage tracking?',
        answer: 'Our devices use precision sensors to track medication dispensing with high accuracy. Each dose is timestamped and logged automatically to ensure reliable records.'
    },
    {
        question: 'Can I export my dosage history?',
        answer: 'Yes! Go to the Dosage History page and click the Export button to download your records as a CSV file. You can select a custom date range before exporting.'
    },
    {
        question: 'How do I add another caregiver?',
        answer: 'Currently, additional caregivers can be added by your device administrator. Contact support to request access for additional caregivers.'
    },
    {
        question: 'Is my health data secure?',
        answer: 'Yes, all data is encrypted in transit and at rest. We comply with HIPAA requirements and use industry-standard security practices to protect your information.'
    },
]

export default function HelpPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    return (
        <div className="space-y-6 animate-fade-in max-w-3xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help & Support</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Find answers to common questions or get in touch with our team
                </p>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                    href="mailto:support@patchmedical.com"
                    className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
                >
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                        <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Email Support</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Get help via email</p>
                    </div>
                </a>

                <a
                    href="#"
                    className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors group"
                >
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors">
                        <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Live Chat</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Chat with support</p>
                    </div>
                </a>

                <a
                    href="#"
                    className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-purple-300 dark:hover:border-purple-700 transition-colors group"
                >
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-xl group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition-colors">
                        <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Documentation</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Read the docs</p>
                    </div>
                </a>
            </div>

            {/* FAQs */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-xl">
                        <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <Text className="!text-lg !font-semibold !text-gray-900 dark:!text-white">
                        Frequently Asked Questions
                    </Text>
                </div>

                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                            >
                                <span className="text-sm font-medium text-gray-900 dark:text-white pr-4">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            {openFaq === index && (
                                <div className="px-4 pb-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Contact Card */}
            <Card className="!bg-gradient-to-br !from-blue-600 !to-blue-700 !border-0">
                <div className="text-center py-4">
                    <h3 className="text-xl font-bold text-white mb-2">Still need help?</h3>
                    <p className="text-blue-100 mb-6">
                        Our support team is available Monday-Friday, 9am-5pm PST
                    </p>
                    <a
                        href="mailto:support@patchmedical.com"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-colors"
                    >
                        Contact Support
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </Card>
        </div>
    )
}
