'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { USE_MOCK_DATA } from '@/lib/mock-data';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const supabase = createClient();
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (USE_MOCK_DATA) {
            setTimeout(() => {
                router.push('/modes');
            }, 500);
            return;
        }

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
                data: {
                    // Optional: Add metadata
                }
            },
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage('Check your email to confirm your account!');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Start Your Mode</h1>
                    <p className="text-gray-400 mt-2">Create your account</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
                            placeholder="jensen@nvidia.com"
                        />
                    </div>

                    {message && (
                        <div className={`p-4 rounded-lg text-sm ${message.includes('Check') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-full bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Sending Magic Link...' : 'Sign Up'}
                    </button>
                </form>

                <div className="text-center text-sm text-gray-500">
                    Already have an account? <Link href="/auth/login" className="text-white hover:underline">Log in</Link>
                </div>
            </div>
        </div>
    );
}
