'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Check, Zap, Play, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { MOCK_FOUNDERS, USE_MOCK_DATA } from '@/lib/mock-data';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function ModeDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [founder, setFounder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState<string>('Monday');
    const [dayStartIndex, setDayStartIndex] = useState(0);

    const visibleDays = DAYS.slice(dayStartIndex, dayStartIndex + 3);

    const handleNextDays = () => {
        if (dayStartIndex + 3 < DAYS.length) {
            setDayStartIndex(dayStartIndex + 1);
        }
    };

    const handlePrevDays = () => {
        if (dayStartIndex > 0) {
            setDayStartIndex(dayStartIndex - 1);
        }
    };

    useEffect(() => {
        // Set default day to today
        const todayIndex = new Date().getDay(); // 0 is Sunday
        const dayName = DAYS[todayIndex === 0 ? 6 : todayIndex - 1]; // Convert to Mon-Sun array index
        setSelectedDay(dayName);

        if (USE_MOCK_DATA) {
            const found = MOCK_FOUNDERS.find(f => f.id === params.id);
            setFounder(found);
            setLoading(false);
            return;
        }
        // Fallback fetch
        fetch(`/api/founders/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setFounder(data);
                setLoading(false);
            });
    }, [params.id]);

    const getTemplateForDay = (day: string) => {
        if (!founder) return null;
        return founder.day_templates.find((t: any) => t.days?.includes(day)) ||
            founder.day_templates.find((t: any) => t.is_default);
    };

    const handleEnterMode = () => {
        if (!founder) return;

        // Get template for TODAY, not selected day (or maybe selected day? User request implies "Enter Mode" applies to current context)
        // "So each day in the week can be different."
        // When entering mode, we should probably generate the schedule for TODAY.

        const todayIndex = new Date().getDay();
        const todayName = DAYS[todayIndex === 0 ? 6 : todayIndex - 1];
        const template = getTemplateForDay(todayName);

        if (!template) return;

        // Create a schedule object based on the template
        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];

        const userBlockRuns = template.template_blocks.map((block: any, index: number) => {
            const [startH, startM] = block.start_time.split(':');
            const [endH, endM] = block.end_time.split(':');

            const startTime = new Date(now);
            startTime.setHours(parseInt(startH), parseInt(startM), 0, 0);

            const endTime = new Date(now);
            endTime.setHours(parseInt(endH), parseInt(endM), 0, 0);

            return {
                id: `run-${Math.random().toString(36).substr(2, 9)}`,
                label: block.mode_name,
                actual_start: startTime.toISOString(),
                actual_end: endTime.toISOString(),
                status: 'planned',
                instructions: block.instructions,
            };
        });

        const newSchedule = {
            id: `schedule-${Date.now()}`,
            user_id: 'mock-user-123',
            date: todayStr,
            status: 'in_progress',
            activeTemplate: {
                name: template.name,
                description: template.description,
            },
            user_block_runs: userBlockRuns,
        };

        // Save to date-specific key
        localStorage.setItem(`mock_schedule_${todayStr}`, JSON.stringify(newSchedule));

        // Store the selected founder ID so dashboard knows which founder to use
        localStorage.setItem('mock_selected_founder', founder.id);

        router.push('/dashboard');
    };

    if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
    if (!founder) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Mode not found</div>;

    const activeTemplate = getTemplateForDay(selectedDay);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <div className="relative min-h-[30vh] md:h-[40vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-black z-10" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

                <div className="container mx-auto px-4 sm:px-6 h-full flex flex-col justify-end pb-8 md:pb-12 relative z-20">
                    <Link href="/modes" className="inline-flex items-center text-gray-400 hover:text-white mb-6 md:mb-8 transition-colors text-sm md:text-base">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Marketplace
                    </Link>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-4 tracking-tight">{founder.display_name}</h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">{founder.bio}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Left Column: Schedule */}
                    <div className="lg:col-span-2 space-y-6 md:space-y-8">

                        {/* Day Tabs */}
                        <div className="relative flex items-center gap-2">
                            <div className="flex-1 flex items-center gap-2">
                                {visibleDays.map((day) => {
                                    const isSelected = selectedDay === day;
                                    return (
                                        <button
                                            key={day}
                                            onClick={() => setSelectedDay(day)}
                                            className={`flex-1 px-3 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${isSelected
                                                ? 'bg-emerald-500 text-black'
                                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                                }`}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Navigation button */}
                            {dayStartIndex > 0 && (
                                <button
                                    onClick={handlePrevDays}
                                    className="flex-shrink-0 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                                    aria-label="Previous days"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                            )}
                            {dayStartIndex + 3 < DAYS.length && (
                                <button
                                    onClick={handleNextDays}
                                    className="flex-shrink-0 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                                    aria-label="Next days"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Clock className="w-6 h-6 text-emerald-500" /> {activeTemplate?.name || 'Daily Routine'}
                            </h2>
                            <span className="text-sm text-gray-500">{activeTemplate?.template_blocks.length || 0} blocks</span>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                            {activeTemplate?.template_blocks.map((block: any, index: number) => (
                                <div key={block.id} className="flex gap-3 sm:gap-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-colors">
                                    <div className="flex flex-col items-center pt-1">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-xs sm:text-sm flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        {index !== activeTemplate.template_blocks.length - 1 && (
                                            <div className="w-px h-full bg-white/10 my-2" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 overflow-hidden">
                                        <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2 truncate">{block.mode_name}</h3>
                                        <div className="text-xs sm:text-sm font-mono text-emerald-400 mb-2">
                                            {block.start_time.slice(0, 5)} - {block.end_time.slice(0, 5)}
                                        </div>
                                        <p className="text-sm sm:text-base text-gray-400 leading-relaxed break-words">{block.instructions}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Action Card */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-24 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 space-y-6 md:space-y-8 backdrop-blur-xl mx-auto max-w-md lg:max-w-none">
                            <div className="overflow-hidden">
                                <h3 className="text-lg md:text-xl font-bold mb-2 break-words">Enter {founder.display_name.split(' ')[0]} Mode</h3>
                                <p className="text-gray-400 text-sm leading-relaxed break-words">
                                    Adopt this schedule immediately. Your dashboard will be updated to track this routine for today.
                                </p>
                            </div>

                            <div className="space-y-3 md:space-y-4">
                                <div className="flex items-start gap-3 text-sm text-gray-300">
                                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    <span className="break-words">Full daily schedule</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-gray-300">
                                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    <span className="break-words">Specific instructions per block</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-gray-300">
                                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    <span className="break-words">Real-time tracking</span>
                                </div>
                            </div>

                            <button
                                onClick={handleEnterMode}
                                className="w-full py-3.5 md:py-4 rounded-xl bg-emerald-500 text-black font-bold text-base md:text-lg hover:bg-emerald-400 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                            >
                                <Play className="w-5 h-5 fill-current flex-shrink-0" />
                                <span className="truncate">Enter Mode</span>
                            </button>

                            <p className="text-xs text-center text-gray-500 leading-relaxed break-words">
                                You can switch back or change modes at any time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
