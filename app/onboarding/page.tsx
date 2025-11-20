'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Check, Clock, User } from 'lucide-react';
import { MOCK_FOUNDERS, USE_MOCK_DATA } from '@/lib/mock-data';

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const [founders, setFounders] = useState<any[]>([]);
    const [selectedFounderId, setSelectedFounderId] = useState<string | null>(null);
    const [wakeTime, setWakeTime] = useState('07:00');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        async function fetchFounders() {
            if (USE_MOCK_DATA) {
                setFounders(MOCK_FOUNDERS);
                return;
            }
            const res = await fetch('/api/founders');
            if (res.ok) {
                const data = await res.json();
                setFounders(data);
            }
        }
        fetchFounders();
    }, []);

    const handleComplete = async () => {
        setLoading(true);
        try {
            if (USE_MOCK_DATA) {
                // In mock mode, just redirect to dashboard
                setTimeout(() => {
                    router.push('/dashboard');
                }, 500);
                return;
            }

            // Real backend logic would go here
            router.push('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Failed to save setup');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
            <div className="max-w-2xl w-full space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">Setup Your Mode</h1>
                    <p className="text-gray-400">Step {step} of 2</p>
                </div>

                {step === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-center">Choose Your Archetype</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {founders.map((founder) => (
                                <button
                                    key={founder.id}
                                    onClick={() => setSelectedFounderId(founder.id)}
                                    className={`p-6 rounded-xl border text-left transition-all ${selectedFounderId === founder.id
                                        ? 'border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500'
                                        : 'border-white/10 bg-white/5 hover:border-white/20'
                                        }`}
                                >
                                    <div className="font-bold text-lg mb-2">{founder.display_name}</div>
                                    <p className="text-sm text-gray-400 line-clamp-3">{founder.bio}</p>
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <button
                                disabled={!selectedFounderId}
                                onClick={() => setStep(2)}
                                className="px-6 py-3 rounded-full bg-white text-black font-medium disabled:opacity-50 hover:bg-gray-200 transition-colors"
                            >
                                Next Step
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-center">Set Your Wake Time</h2>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-center space-y-6">
                            <Clock className="w-12 h-12 text-emerald-400" />
                            <div className="text-center space-y-2">
                                <p className="text-gray-400">
                                    All modes are relative to your wake time.
                                </p>
                            </div>
                            <input
                                type="time"
                                value={wakeTime}
                                onChange={(e) => setWakeTime(e.target.value)}
                                className="bg-black border border-white/20 rounded-lg px-4 py-3 text-2xl text-center focus:outline-none focus:border-emerald-500"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setStep(1)}
                                className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleComplete}
                                disabled={loading}
                                className="px-6 py-3 rounded-full bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Complete Setup'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
