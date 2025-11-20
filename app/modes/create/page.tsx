'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Save, Clock } from 'lucide-react';
import Link from 'next/link';

export default function CreateModePage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [blocks, setBlocks] = useState<any[]>([
        { id: 1, mode_name: 'Morning Routine', start_time: '07:00', end_time: '09:00', instructions: 'Wake up, exercise, breakfast.' }
    ]);

    const addBlock = () => {
        setBlocks([
            ...blocks,
            {
                id: Date.now(),
                mode_name: 'New Block',
                start_time: '09:00',
                end_time: '10:00',
                instructions: ''
            }
        ]);
    };

    const removeBlock = (id: number) => {
        setBlocks(blocks.filter(b => b.id !== id));
    };

    const updateBlock = (id: number, field: string, value: string) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, [field]: value } : b));
    };

    const handleSave = () => {
        if (!name) return alert('Please enter a mode name');

        const newMode = {
            id: `custom-${Date.now()}`,
            display_name: name,
            bio: bio || 'A custom mode.',
            day_templates: [{
                template_blocks: blocks
            }]
        };

        // Save to localStorage
        const existing = localStorage.getItem('mock_custom_modes');
        const customModes = existing ? JSON.parse(existing) : [];
        customModes.push(newMode);
        localStorage.setItem('mock_custom_modes', JSON.stringify(customModes));

        router.push('/modes');
    };

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            <div className="container mx-auto px-6 py-12 max-w-3xl">
                <Link href="/modes" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Marketplace
                </Link>

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold">Create New Mode</h1>
                    <button
                        onClick={handleSave}
                        className="px-6 py-3 rounded-full bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" /> Save Mode
                    </button>
                </div>

                <div className="space-y-8">
                    {/* Basic Info */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Mode Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 text-white"
                                placeholder="e.g. My Power Routine"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 text-white h-24 resize-none"
                                placeholder="What is this mode about?"
                            />
                        </div>
                    </div>

                    {/* Blocks */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Clock className="w-5 h-5 text-emerald-500" /> Schedule Blocks
                            </h2>
                            <button
                                onClick={addBlock}
                                className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" /> Add Block
                            </button>
                        </div>

                        {blocks.map((block, index) => (
                            <div key={block.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 relative group">
                                <button
                                    onClick={() => removeBlock(block.id)}
                                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Block Name</label>
                                        <input
                                            type="text"
                                            value={block.mode_name}
                                            onChange={(e) => updateBlock(block.id, 'mode_name', e.target.value)}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Start Time</label>
                                        <input
                                            type="time"
                                            value={block.start_time}
                                            onChange={(e) => updateBlock(block.id, 'start_time', e.target.value)}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">End Time</label>
                                        <input
                                            type="time"
                                            value={block.end_time}
                                            onChange={(e) => updateBlock(block.id, 'end_time', e.target.value)}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 text-white"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Instructions</label>
                                        <input
                                            type="text"
                                            value={block.instructions}
                                            onChange={(e) => updateBlock(block.id, 'instructions', e.target.value)}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                                            placeholder="Instructions..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
