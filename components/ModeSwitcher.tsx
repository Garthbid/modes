'use client';

import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { MOCK_FOUNDERS } from '@/lib/mock-data';

interface ModeSwitcherProps {
    currentFounderId: string;
    onSwitch: (founderId: string) => void;
}

export default function ModeSwitcher({ currentFounderId, onSwitch }: ModeSwitcherProps) {
    const [isOpen, setIsOpen] = useState(false);

    const currentFounder = MOCK_FOUNDERS.find(f => f.id === currentFounderId);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
                <span className="text-sm font-medium">
                    {currentFounder?.display_name || 'Select Mode'}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full right-0 mt-2 w-64 bg-black border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                        <div className="p-2">
                            <div className="text-xs text-gray-500 px-3 py-2 font-medium uppercase tracking-wider">
                                Switch Mode
                            </div>
                            {MOCK_FOUNDERS.map((founder) => {
                                const isActive = founder.id === currentFounderId;
                                return (
                                    <button
                                        key={founder.id}
                                        onClick={() => {
                                            onSwitch(founder.id);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive
                                                ? 'bg-emerald-500/10 text-emerald-400'
                                                : 'hover:bg-white/5 text-white'
                                            }`}
                                    >
                                        <div className="flex-1 text-left">
                                            <div className="font-medium text-sm">{founder.display_name}</div>
                                            <div className="text-xs text-gray-500 line-clamp-1">{founder.bio}</div>
                                        </div>
                                        {isActive && <Check className="w-4 h-4 text-emerald-400" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
