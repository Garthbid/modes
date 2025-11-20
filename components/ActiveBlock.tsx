'use client';

import { useEffect, useState, useRef } from 'react';
import { differenceInSeconds, format } from 'date-fns';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, CheckCircle, Edit2, Plus, StickyNote, X } from 'lucide-react';

interface ModeGoal {
    text: string;
    startTime: number; // timestamp
}

export default function ActiveBlock({
    block,
    onGoalComplete,
    onGoalAdjust,
    onGoalChange,
    initialGoal
}: {
    block: any,
    onGoalComplete?: (goal: { text: string, duration: number, type: 'completed' }) => void,
    onGoalAdjust?: (goal: { text: string, duration: number, type: 'adjusted' }) => void,
    onGoalChange?: (goal: string) => void,
    initialGoal?: string
}) {
    const [timeLeft, setTimeLeft] = useState<string>('');
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // ModeGoal State
    const [currentGoal, setCurrentGoal] = useState<ModeGoal | null>(initialGoal ? { text: initialGoal, startTime: Date.now() } : null);
    const [isEditingGoal, setIsEditingGoal] = useState(false);
    const [goalInput, setGoalInput] = useState('');

    // ModeNotes State
    const [isNotesOpen, setIsNotesOpen] = useState(false);
    const [notesContent, setNotesContent] = useState('');

    // Load Notes
    useEffect(() => {
        if (block?.id) {
            const savedNotes = localStorage.getItem(`mock_notes_${block.id}`);
            if (savedNotes) {
                setNotesContent(savedNotes);
            } else {
                setNotesContent('');
            }
        }
    }, [block?.id]);

    // Save Notes
    useEffect(() => {
        if (block?.id) {
            localStorage.setItem(`mock_notes_${block.id}`, notesContent);
        }
    }, [notesContent, block?.id]);

    useEffect(() => {
        if (onGoalChange) {
            onGoalChange(currentGoal ? currentGoal.text : '');
        }
    }, [currentGoal, onGoalChange]);

    useEffect(() => {
        if (initialGoal && !currentGoal) {
            setCurrentGoal({ text: initialGoal, startTime: Date.now() });
        }
    }, [initialGoal]);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const end = new Date(block.actual_end);
            const start = new Date(block.actual_start);
            const totalDuration = differenceInSeconds(end, start);
            const remaining = differenceInSeconds(end, now);
            const elapsed = totalDuration - remaining;

            if (remaining <= 0) {
                setTimeLeft('00:00:00');
                setProgress(100);
            } else {
                const hours = Math.floor(remaining / 3600);
                const minutes = Math.floor((remaining % 3600) / 60);
                const seconds = remaining % 60;
                setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
                setProgress((elapsed / totalDuration) * 100);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [block]);

    // ModeGoal Handlers
    const handleSetGoal = () => {
        if (!goalInput.trim()) return;
        setCurrentGoal({ text: goalInput, startTime: Date.now() });
        setGoalInput('');
        setIsEditingGoal(false);
    };

    const handleCompleteGoal = () => {
        if (!currentGoal) return;
        const duration = Math.floor((Date.now() - currentGoal.startTime) / 1000);

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10B981', '#34D399', '#059669']
        });

        if (onGoalComplete) {
            onGoalComplete({ text: currentGoal.text, duration, type: 'completed' });
        }
        setCurrentGoal(null);
    };

    const handleAdjustGoal = () => {
        setIsEditingGoal(true);
        setGoalInput(currentGoal?.text || '');
    };

    const handleSaveAdjustedGoal = () => {
        if (!currentGoal || !goalInput.trim()) return;
        const duration = Math.floor((Date.now() - currentGoal.startTime) / 1000);

        if (onGoalAdjust) {
            onGoalAdjust({ text: currentGoal.text, duration, type: 'adjusted' });
        }

        setCurrentGoal({ text: goalInput, startTime: Date.now() }); // Reset start time for new goal segment? Or keep original? 
        // User requirement: "logging these actions". Usually adjustment implies a change in direction, so maybe log old and start new.
        // Implementation plan said: "Update currentGoal to new text. Reset goalStartTime".
        setIsEditingGoal(false);
        setGoalInput('');
    };

    return (
        <div className="bg-gradient-to-br from-emerald-900/20 to-black border border-emerald-500/30 rounded-2xl p-8 text-center space-y-8 relative overflow-hidden min-h-[500px] flex flex-col justify-center">
            {/* ModeNotes Button - Top Right */}
            <div className="absolute top-6 right-6 z-30">
                <button
                    onClick={() => setIsNotesOpen(true)}
                    className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    title="ModeNotes"
                >
                    <StickyNote className="w-5 h-5" />
                </button>
            </div>

            {/* Progress Bar Background */}
            <div className="absolute bottom-0 left-0 h-1 bg-emerald-500/20 w-full">
                <div
                    className="h-full bg-emerald-500 transition-all duration-1000 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
                        Current Mode
                    </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    {block.label}
                </h2>

                {block.instructions && (
                    <p className="text-gray-400 max-w-lg mx-auto text-lg leading-relaxed">
                        {block.instructions}
                    </p>
                )}
            </div>

            {/* Timer Section - White and Above Goal */}
            <div className="relative z-10 py-4">
                <div className="text-7xl md:text-9xl font-black tabular-nums tracking-tighter text-white scale-y-90 select-none">
                    {timeLeft || "00:00:00"}
                </div>
            </div>

            {/* ModeGoal Section */}
            <div className="relative z-20 py-6 max-w-2xl mx-auto w-full">
                {!currentGoal ? (
                    <div className="flex gap-2 max-w-md mx-auto">
                        <input
                            type="text"
                            value={goalInput}
                            onChange={(e) => setGoalInput(e.target.value)}
                            placeholder="What is your main goal?"
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-emerald-500 text-white placeholder-gray-500 text-center"
                            onKeyDown={(e) => e.key === 'Enter' && handleSetGoal()}
                        />
                        <button
                            onClick={handleSetGoal}
                            disabled={!goalInput.trim()}
                            className="p-3 bg-emerald-500 text-black rounded-xl hover:bg-emerald-400 disabled:opacity-50 transition-colors font-bold"
                        >
                            Set Goal
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {isEditingGoal ? (
                            <div className="flex gap-2 max-w-md mx-auto">
                                <input
                                    type="text"
                                    value={goalInput}
                                    onChange={(e) => setGoalInput(e.target.value)}
                                    className="flex-1 bg-transparent border-b-2 border-emerald-500 focus:outline-none text-2xl font-bold text-white text-center pb-2"
                                    autoFocus
                                    onKeyDown={(e) => e.key === 'Enter' && handleSaveAdjustedGoal()}
                                />
                                <button
                                    onClick={handleSaveAdjustedGoal}
                                    className="px-4 py-2 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-400"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="group relative inline-block">
                                <div className="text-3xl md:text-4xl font-bold text-white leading-tight flex items-center justify-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                                    <span>{currentGoal.text}</span>
                                    <button
                                        onClick={handleAdjustGoal}
                                        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-white transition-all absolute -right-12 top-1/2 -translate-y-1/2"
                                        title="Adjust Goal"
                                    >
                                        <Edit2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={handleCompleteGoal}
                                        className="flex items-center gap-2 px-6 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-sm font-bold hover:bg-emerald-500 hover:text-black transition-all"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Complete Goal
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* ModeNotes Modal */}
            {isNotesOpen && (
                <div className="absolute inset-0 z-50 bg-[#1c1c1e] flex flex-col animate-in slide-in-from-bottom duration-300">
                    <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#2c2c2e]">
                        <div className="flex items-center gap-2 text-yellow-500">
                            <StickyNote className="w-5 h-5" />
                            <span className="font-bold">ModeNotes</span>
                        </div>
                        <button
                            onClick={() => setIsNotesOpen(false)}
                            className="text-yellow-500 font-medium hover:opacity-80"
                        >
                            Done
                        </button>
                    </div>
                    <textarea
                        value={notesContent}
                        onChange={(e) => setNotesContent(e.target.value)}
                        className="flex-1 bg-transparent p-6 text-lg text-white/90 resize-none focus:outline-none font-mono leading-relaxed"
                        placeholder="Type your notes here..."
                        autoFocus
                    />
                    <div className="p-2 text-xs text-center text-gray-500 border-t border-white/5">
                        Notes are saved automatically to this block.
                    </div>
                </div>
            )}
        </div>
    );
}
