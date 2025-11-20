'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Trash2, Download, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
    const [loading, setLoading] = useState(false);
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleManageSubscription = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/stripe/portal', { method: 'POST' });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error(error);
            alert('Failed to load portal');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    const handleResetAllData = () => {
        // Clear all localStorage data
        localStorage.clear();
        setShowResetConfirm(false);
        alert('All data has been reset! Redirecting to dashboard...');
        router.push('/dashboard');
    };

    const handleExportData = () => {
        const data: {
            schedules: Record<string, string | null>;
            stats: string | null;
            timezone: string | null;
            selectedFounder: string | null;
            goalProgress: Record<string, string | null>;
            notes: Record<string, string | null>;
        } = {
            schedules: {},
            stats: localStorage.getItem('mock_stats'),
            timezone: localStorage.getItem('mock_timezone'),
            selectedFounder: localStorage.getItem('mock_selected_founder'),
            goalProgress: {},
            notes: {},
        };

        // Collect all schedule data
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith('mock_schedule_')) {
                data.schedules[key] = localStorage.getItem(key);
            } else if (key?.startsWith('mock_goal_progress_')) {
                data.goalProgress[key] = localStorage.getItem(key);
            } else if (key?.startsWith('mock_notes_')) {
                data.notes[key] = localStorage.getItem(key);
            }
        }

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `modes-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-3xl font-bold">Settings</h1>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                    <h2 className="text-xl font-semibold">Subscription</h2>
                    <p className="text-gray-400">Manage your billing and subscription status.</p>
                    <button
                        onClick={handleManageSubscription}
                        disabled={loading}
                        className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Manage Subscription'}
                    </button>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                    <h2 className="text-xl font-semibold">Data Management</h2>
                    <p className="text-gray-400">Export or reset your data.</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleExportData}
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Export Data
                        </button>
                        <button
                            onClick={() => setShowResetConfirm(true)}
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            Reset All Data
                        </button>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                    <h2 className="text-xl font-semibold">Account</h2>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-3 rounded-full border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                        Log Out
                    </button>
                </div>
            </div>

            {/* Reset Confirmation Modal */}
            {showResetConfirm && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
                    <div className="bg-[#111] border border-red-500/30 rounded-2xl p-8 max-w-md w-full space-y-6">
                        <div className="flex items-center gap-3 text-red-500">
                            <AlertTriangle className="w-6 h-6" />
                            <h3 className="text-xl font-bold">Reset All Data?</h3>
                        </div>
                        <p className="text-gray-400">
                            This will permanently delete all your schedules, goals, notes, and progress. This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowResetConfirm(false)}
                                className="flex-1 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleResetAllData}
                                className="flex-1 px-6 py-3 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
                            >
                                Reset Everything
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
