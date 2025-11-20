'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, Users, Star, Plus } from 'lucide-react';
import { MOCK_FOUNDERS, USE_MOCK_DATA } from '@/lib/mock-data';

export default function ModesPage() {
    const [modes, setModes] = useState<any[]>([]);
    const [customModes, setCustomModes] = useState<any[]>([]);

    useEffect(() => {
        async function fetchModes() {
            if (USE_MOCK_DATA) {
                setModes(MOCK_FOUNDERS);
                const localCustom = localStorage.getItem('mock_custom_modes');
                if (localCustom) {
                    setCustomModes(JSON.parse(localCustom));
                }
                return;
            }
            // Real API call would go here
        }
        fetchModes();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            <div className="container mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">Mode Marketplace</h1>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            Discover and adopt the daily routines of world-class founders and thinkers.
                        </p>
                    </div>
                    <Link
                        href="/modes/create"
                        className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2 font-medium"
                    >
                        <Plus className="w-5 h-5" /> Create Custom Mode
                    </Link>
                </div>

                {customModes.length > 0 && (
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500" /> Your Custom Modes
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {customModes.map((mode) => (
                                <Link href={`/modes/${mode.id}`} key={mode.id} className="group relative bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/20">
                                    <div className="p-8 h-full flex flex-col">
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{mode.display_name}</h3>
                                            <p className="text-gray-400 line-clamp-2">{mode.bio}</p>
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-sm text-gray-500">
                                            <span className="flex items-center gap-2">
                                                <Users className="w-4 h-4" /> You
                                            </span>
                                            <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-emerald-500">
                                                View Mode <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <h2 className="text-2xl font-bold mb-6">Featured Modes</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modes.map((mode) => (
                        <Link href={`/modes/${mode.id}`} key={mode.id} className="group relative bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/20">
                            <div className="absolute top-4 right-4 bg-white/5 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-emerald-400 border border-emerald-500/20">
                                PRO
                            </div>

                            <div className="p-8 h-full flex flex-col">
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{mode.display_name}</h3>
                                    <p className="text-gray-400 line-clamp-2">{mode.bio}</p>
                                </div>

                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-sm text-gray-500">
                                    <span className="flex items-center gap-2">
                                        <Users className="w-4 h-4" /> {Math.floor(Math.random() * 1000) + 100} users
                                    </span>
                                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-emerald-500">
                                        View Mode <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
