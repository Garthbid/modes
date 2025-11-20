'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ActiveBlock from '@/components/ActiveBlock';
import Timeline from '@/components/Timeline';
import ToastContainer, { useToast } from '@/components/Toast';
import ModeSwitcher from '@/components/ModeSwitcher';
import { Bell, Settings, Plus, X, Save, Edit2, RotateCcw, Trophy, Flame, Globe, ChevronLeft, ChevronRight, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { MOCK_SCHEDULE, USE_MOCK_DATA, MOCK_FOUNDERS } from '@/lib/mock-data';
import { format, addDays, startOfWeek, isSameDay, isToday } from 'date-fns';

const TIMEZONES = [
    { label: 'MST', value: 'America/Denver' },
    { label: 'PST', value: 'America/Los_Angeles' },
    { label: 'EST', value: 'America/New_York' },
    { label: 'UTC', value: 'UTC' },
];

interface GoalLog {
    id: string;
    text: string;
    duration: number;
    type: 'completed' | 'adjusted';
    timestamp: string;
    blockId: string;
}

export default function DashboardPage() {
    const [schedule, setSchedule] = useState<any>(null);
    const [activeBlock, setActiveBlock] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [dayLoading, setDayLoading] = useState(false);
    const [editingBlock, setEditingBlock] = useState<any>(null);
    const [editForm, setEditForm] = useState({ label: '', instructions: '' });
    const [stats, setStats] = useState({ points: 0, streak: 0 });
    const [timezone, setTimezone] = useState('America/Denver');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedFounderId, setSelectedFounderId] = useState<string>('elon-123');

    // ModeGoal State
    const [goalProgress, setGoalProgress] = useState<GoalLog[]>([]);
    const [currentBlockGoal, setCurrentBlockGoal] = useState<string>('');

    // Toast notifications
    const { toasts, addToast, removeToast } = useToast();

    // Ref for active block auto-scroll
    const activeBlockRef = useRef<HTMLDivElement>(null);

    const router = useRouter();

    // Generate the current week's dates starting from Monday
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    useEffect(() => {
        fetchSchedule(selectedDate);
        fetchStats();

        const savedTimezone = localStorage.getItem('mock_timezone');
        if (savedTimezone) setTimezone(savedTimezone);

        // Load selected founder
        const savedFounder = localStorage.getItem('mock_selected_founder');
        if (savedFounder) setSelectedFounderId(savedFounder);

        // Request Notification Permission
        if ('Notification' in window) {
            Notification.requestPermission();
        }

        // Register SW
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js');
        }
    }, []);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Don't trigger if user is typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            // Arrow keys for day navigation
            if (e.key === 'ArrowLeft') {
                const currentIndex = weekDates.findIndex(d => isSameDay(d, selectedDate));
                if (currentIndex > 0) {
                    setSelectedDate(weekDates[currentIndex - 1]);
                    addToast('Previous day', 'info');
                }
            } else if (e.key === 'ArrowRight') {
                const currentIndex = weekDates.findIndex(d => isSameDay(d, selectedDate));
                if (currentIndex < weekDates.length - 1) {
                    setSelectedDate(weekDates[currentIndex + 1]);
                    addToast('Next day', 'info');
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedDate, weekDates]);

    // Re-fetch when selectedDate changes
    useEffect(() => {
        setDayLoading(true);
        fetchSchedule(selectedDate);
    }, [selectedDate]);

    // Auto-scroll to active block
    useEffect(() => {
        if (activeBlock && activeBlockRef.current) {
            activeBlockRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [activeBlock]);

    useEffect(() => {
        if (schedule?.user_block_runs && isSameDay(selectedDate, new Date())) {
            const now = new Date();
            const current = schedule.user_block_runs.find((b: any) => {
                const start = new Date(b.actual_start);
                const end = new Date(b.actual_end);
                return now >= start && now < end;
            });
            setActiveBlock(current || null);
        } else {
            setActiveBlock(null);
        }
    }, [schedule, selectedDate]);

    // Load Goal Data when activeBlock changes
    useEffect(() => {
        if (activeBlock) {
            if (USE_MOCK_DATA) {
                const savedProgress = localStorage.getItem(`mock_goal_progress_${activeBlock.id}`);
                if (savedProgress) {
                    setGoalProgress(JSON.parse(savedProgress));
                } else {
                    setGoalProgress([]);
                }

                const savedCurrentGoal = localStorage.getItem(`mock_current_goal_${activeBlock.id}`);
                if (savedCurrentGoal) {
                    setCurrentBlockGoal(savedCurrentGoal);
                } else {
                    setCurrentBlockGoal('');
                }
            }
        } else {
            setGoalProgress([]);
            setCurrentBlockGoal('');
        }
    }, [activeBlock]);

    const handleTimezoneChange = (newTz: string) => {
        setTimezone(newTz);
        localStorage.setItem('mock_timezone', newTz);
        addToast('Timezone updated', 'success');
    };

    const handleModeSwitch = async (founderId: string) => {
        setSelectedFounderId(founderId);
        localStorage.setItem('mock_selected_founder', founderId);

        // Clear all date-specific schedules to regenerate with new founder
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith('mock_schedule_')) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));

        // Refresh current schedule
        await fetchSchedule(selectedDate);

        const founder = MOCK_FOUNDERS.find(f => f.id === founderId);
        addToast(`Switched to ${founder?.display_name} Mode`, 'success');
    };

    const fetchStats = () => {
        if (USE_MOCK_DATA) {
            const localStats = localStorage.getItem('mock_stats');
            if (localStats) {
                setStats(JSON.parse(localStats));
            }
        }
    };

    const updateStats = (pointsToAdd: number) => {
        const newStats = {
            points: stats.points + pointsToAdd,
            streak: stats.streak + 1
        };
        setStats(newStats);
        if (USE_MOCK_DATA) {
            localStorage.setItem('mock_stats', JSON.stringify(newStats));
        }
        addToast(`+${pointsToAdd} points!`, 'success');
    };

    const fetchSchedule = async (date: Date) => {
        setLoading(true);
        try {
            if (USE_MOCK_DATA) {
                const dateKey = format(date, 'yyyy-MM-dd');
                // Check for specific date schedule first
                const localSchedule = localStorage.getItem(`mock_schedule_${dateKey}`);

                if (localSchedule) {
                    setSchedule(JSON.parse(localSchedule));
                } else {
                    // Auto-generate schedule from founder templates
                    // Get the selected founder ID, default to Elon
                    const selectedFounderId = localStorage.getItem('mock_selected_founder') || 'elon-123';
                    const { generateMockScheduleForDate } = await import('@/lib/mock-data');
                    const generatedSchedule = generateMockScheduleForDate(date, selectedFounderId);
                    if (generatedSchedule) {
                        setSchedule(generatedSchedule);
                        // Save it to localStorage for this date
                        localStorage.setItem(`mock_schedule_${dateKey}`, JSON.stringify(generatedSchedule));
                    } else {
                        setSchedule(null);
                    }
                }
            } else {
                const res = await fetch(`/api/schedule/today?date=${format(date, 'yyyy-MM-dd')}`);
                const data = await res.json();
                setSchedule(data);
            }
        } catch (error) {
            console.error('Failed to fetch schedule:', error);
            addToast('Failed to load schedule', 'error');
        } finally {
            setLoading(false);
            setDayLoading(false);
        }
    };

    const handleStartDay = async () => {
        if (USE_MOCK_DATA) {
            // Create a deep copy of MOCK_SCHEDULE
            const newSchedule = JSON.parse(JSON.stringify(MOCK_SCHEDULE));
            newSchedule.date = format(selectedDate, 'yyyy-MM-dd');

            // Update block times to match selectedDate
            newSchedule.user_block_runs = newSchedule.user_block_runs.map((block: any) => {
                const start = new Date(block.actual_start);
                const end = new Date(block.actual_end);

                // Set date to selectedDate while preserving time
                const newStart = new Date(selectedDate);
                newStart.setHours(start.getHours(), start.getMinutes(), start.getSeconds());

                const newEnd = new Date(selectedDate);
                newEnd.setHours(end.getHours(), end.getMinutes(), end.getSeconds());

                return {
                    ...block,
                    actual_start: newStart.toISOString(),
                    actual_end: newEnd.toISOString()
                };
            });

            setSchedule(newSchedule);
            const dateKey = format(selectedDate, 'yyyy-MM-dd');
            localStorage.setItem(`mock_schedule_${dateKey}`, JSON.stringify(newSchedule));

            // Also update generic key if it's today, for backward compatibility/safety
            if (isSameDay(selectedDate, new Date())) {
                localStorage.setItem('mock_schedule', JSON.stringify(newSchedule));
            }
            return;
        }

        const res = await fetch('/api/modes');
        const modes = await res.json();

        if (modes && modes.length > 0) {
            const modeId = modes[0].id;
            await fetch('/api/schedule/generate', {
                method: 'POST',
                body: JSON.stringify({ modeId, isHybrid: true, date: format(selectedDate, 'yyyy-MM-dd') }),
            });
            fetchSchedule(selectedDate);
        } else {
            alert('Please create a mode first or complete onboarding.');
            router.push('/onboarding');
        }
    };

    const handleResetDay = () => {
        if (confirm('Are you sure you want to reset this day? This will clear the schedule.')) {
            if (USE_MOCK_DATA) {
                const dateKey = format(selectedDate, 'yyyy-MM-dd');
                localStorage.removeItem(`mock_schedule_${dateKey}`);
                if (isSameDay(selectedDate, new Date())) {
                    localStorage.removeItem('mock_schedule');
                }
                setSchedule(null);
                setActiveBlock(null);
            }
        }
    };

    const handleBlockClick = (block: any) => {
        setEditingBlock(block);
        setEditForm({
            label: block.label,
            instructions: block.instructions || ''
        });
    };

    const handleSaveEdit = () => {
        if (!editingBlock || !schedule) return;

        const newRuns = schedule.user_block_runs.map((b: any) =>
            b.id === editingBlock.id
                ? { ...b, label: editForm.label, instructions: editForm.instructions }
                : b
        );

        const newSchedule = { ...schedule, user_block_runs: newRuns };
        setSchedule(newSchedule);

        if (USE_MOCK_DATA) {
            const dateKey = format(selectedDate, 'yyyy-MM-dd');
            localStorage.setItem(`mock_schedule_${dateKey}`, JSON.stringify(newSchedule));
            if (isSameDay(selectedDate, new Date())) {
                localStorage.setItem('mock_schedule', JSON.stringify(newSchedule));
            }
        }

        setEditingBlock(null);
    };

    // ModeGoal Handlers
    const handleGoalComplete = (goal: { text: string, duration: number, type: 'completed' }) => {
        if (!activeBlock) return;

        const newLog: GoalLog = {
            id: Math.random().toString(36).substr(2, 9),
            text: goal.text,
            duration: goal.duration,
            type: 'completed',
            timestamp: new Date().toISOString(),
            blockId: activeBlock.id
        };

        const newProgress = [newLog, ...goalProgress];
        setGoalProgress(newProgress);
        setCurrentBlockGoal('');

        if (USE_MOCK_DATA) {
            localStorage.setItem(`mock_goal_progress_${activeBlock.id}`, JSON.stringify(newProgress));
            localStorage.removeItem(`mock_current_goal_${activeBlock.id}`);
        }
    };

    const handleGoalAdjust = (goal: { text: string, duration: number, type: 'adjusted' }) => {
        if (!activeBlock) return;

        const newLog: GoalLog = {
            id: Math.random().toString(36).substr(2, 9),
            text: goal.text,
            duration: goal.duration,
            type: 'adjusted',
            timestamp: new Date().toISOString(),
            blockId: activeBlock.id
        };

        const newProgress = [newLog, ...goalProgress];
        setGoalProgress(newProgress);
    };

    const handleGoalChange = (newGoalText: string) => {
        if (!activeBlock) return;
        if (USE_MOCK_DATA) {
            if (newGoalText) {
                localStorage.setItem(`mock_current_goal_${activeBlock.id}`, newGoalText);
            } else {
                localStorage.removeItem(`mock_current_goal_${activeBlock.id}`);
            }
        }
        setCurrentBlockGoal(newGoalText);
    };

    // Helper to format duration
    const formatDuration = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}m ${s}s`;
    };

    if (loading) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white pb-20 relative">
            {/* Header */}
            <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-20">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
                        <Link href="/modes" className="hover:opacity-80 transition-opacity">
                            MODES
                        </Link>
                        {stats.points > 0 && (
                            <div className="flex items-center gap-3 ml-4 text-sm font-normal bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <Trophy className="w-3 h-3" />
                                    <span>{stats.points}</span>
                                </div>
                                <div className="w-px h-3 bg-white/20" />
                                <div className="flex items-center gap-1 text-orange-400">
                                    <Flame className="w-3 h-3" />
                                    <span>{stats.streak}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <ModeSwitcher
                            currentFounderId={selectedFounderId}
                            onSwitch={handleModeSwitch}
                        />
                        <div className="hidden md:flex items-center gap-2 text-xs text-gray-500 bg-white/5 px-3 py-1.5 rounded-full">
                            <Globe className="w-3 h-3" />
                            <select
                                value={timezone}
                                onChange={(e) => handleTimezoneChange(e.target.value)}
                                className="bg-transparent outline-none cursor-pointer"
                            >
                                {TIMEZONES.map((tz) => (
                                    <option key={tz.value} value={tz.value} className="bg-black">
                                        {tz.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Bell className="w-5 h-5" />
                        </button>
                        <Link href="/settings" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Settings className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8 space-y-8">
                {/* Day Selector */}
                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-2">
                    {weekDates.map((date) => {
                        const isSelected = isSameDay(date, selectedDate);
                        const isCurrentDay = isToday(date);
                        return (
                            <button
                                key={date.toISOString()}
                                onClick={() => setSelectedDate(date)}
                                className={`flex-1 flex flex-col items-center justify-center py-3 rounded-xl transition-all ${isSelected
                                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                                    : 'hover:bg-white/5 text-gray-400 hover:text-white'
                                    }`}
                            >
                                <span className="text-xs font-medium uppercase tracking-wider opacity-80">
                                    {format(date, 'EEE')}
                                </span>
                                <span className={`text-lg font-bold ${isSelected ? 'text-black' : isCurrentDay ? 'text-emerald-400' : 'text-white'}`}>
                                    {format(date, 'd')}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {!schedule ? (
                    <div className="text-center py-20 space-y-6">
                        <h2 className="text-3xl font-bold">
                            {isSameDay(selectedDate, new Date()) ? "Ready to start your day?" : `Plan for ${format(selectedDate, 'EEEE')}`}
                        </h2>
                        <p className="text-gray-400">Select a mode to generate your schedule.</p>
                        <button
                            onClick={handleStartDay}
                            className="px-8 py-4 rounded-full bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors"
                        >
                            {isSameDay(selectedDate, new Date()) ? "Start Day" : "Plan Day"}
                        </button>
                    </div>
                ) : (
                    <>
                        {schedule?.activeTemplate && (
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-white">{schedule.activeTemplate.name}</h2>
                                <p className="text-gray-400">{schedule.activeTemplate.description}</p>
                            </div>
                        )}

                        {isSameDay(selectedDate, new Date()) && (
                            activeBlock ? (
                                <ActiveBlock
                                    block={activeBlock}
                                    onGoalComplete={handleGoalComplete}
                                    onGoalAdjust={handleGoalAdjust}
                                    onGoalChange={handleGoalChange}
                                    initialGoal={currentBlockGoal}
                                />
                            ) : (
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                                    <h2 className="text-2xl font-bold mb-2">No Active Block</h2>
                                    <p className="text-gray-400">You are currently between blocks or the day has ended.</p>
                                </div>
                            )
                        )}

                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold">
                                    {isSameDay(selectedDate, new Date()) ? "Your Schedule" : `${format(selectedDate, 'EEEE')}'s Schedule`}
                                </h3>
                            </div>

                            <Timeline
                                blocks={schedule.user_block_runs}
                                activeBlockId={activeBlock?.id}
                                onEdit={handleBlockClick}
                            />
                        </div>

                        {/* Progress Section */}
                        {goalProgress.length > 0 && (
                            <div className="space-y-4 pt-8 border-t border-white/10">
                                <h3 className="text-xl font-bold">Progress</h3>
                                <div className="space-y-3">
                                    {goalProgress.map((log) => (
                                        <div key={log.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {log.type === 'completed' ? (
                                                    <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-full">
                                                        <CheckCircle className="w-4 h-4" />
                                                    </div>
                                                ) : (
                                                    <div className="p-2 bg-yellow-500/20 text-yellow-400 rounded-full">
                                                        <Edit2 className="w-4 h-4" />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-medium text-white">{log.text}</div>
                                                    <div className="text-xs text-gray-500 flex items-center gap-2">
                                                        <span>{format(new Date(log.timestamp), 'h:mm a')}</span>
                                                        <span>•</span>
                                                        <span className="uppercase tracking-wider">{log.type}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-400 text-sm font-mono">
                                                <Clock className="w-3 h-3" />
                                                {formatDuration(log.duration)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* Edit Modal */}
            {editingBlock && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold">Edit Block</h3>
                            <button
                                onClick={() => setEditingBlock(null)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Block Name</label>
                                <input
                                    type="text"
                                    value={editForm.label}
                                    onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 text-white"
                                    placeholder="e.g. Deep Work"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Instructions</label>
                                <textarea
                                    value={editForm.instructions}
                                    onChange={(e) => setEditForm({ ...editForm, instructions: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 text-white h-32 resize-none"
                                    placeholder="What should you be doing?"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setEditingBlock(null)}
                                className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                className="px-6 py-3 rounded-full bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" /> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notifications */}
            <ToastContainer toasts={toasts} removeToast={removeToast} />

            {/* Day Loading Overlay */}
            {dayLoading && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white/10 border border-white/20 rounded-2xl p-8 flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm text-gray-400">Loading schedule...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
