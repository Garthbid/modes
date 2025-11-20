import { format } from 'date-fns';
import { CheckCircle2, Circle, Clock, Edit2 } from 'lucide-react';

export default function Timeline({ blocks, activeBlockId, onEdit }: { blocks: any[], activeBlockId: string | null, onEdit: (block: any) => void }) {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Today's Timeline</h3>
            <div className="relative border-l border-white/10 ml-3 space-y-8 pb-8">
                {blocks.map((block, index) => {
                    const isActive = block.id === activeBlockId;
                    const isPast = !isActive && new Date(block.actual_end) < new Date();

                    return (
                        <div
                            key={block.id}
                            className={`relative pl-8 group transition-all duration-300 ${isActive ? 'scale-[1.02]' : ''
                                }`}
                            id={isActive ? 'active-block-timeline' : undefined}
                        >
                            {/* Enhanced dot with pulse effect for active block */}
                            <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${isActive
                                    ? 'bg-emerald-500 border-emerald-500 ring-4 ring-emerald-500/20 animate-pulse'
                                    : isPast
                                        ? 'bg-emerald-900 border-emerald-900'
                                        : 'bg-black border-gray-600'
                                }`}>
                                {/* Additional glow for active block */}
                                {isActive && (
                                    <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                                )}
                            </div>

                            <div className={`p-4 rounded-xl border transition-all duration-300 ${isActive
                                    ? 'bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                                    : 'bg-transparent border-white/5 hover:bg-white/5 hover:border-white/10'
                                }`}>
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex-1">
                                        <h4 className={`font-medium transition-colors ${isActive ? 'text-white text-lg' : 'text-gray-300'
                                            }`}>
                                            {block.label || 'Block'}
                                        </h4>
                                        <div className={`text-sm flex items-center gap-2 mt-1 transition-colors ${isActive ? 'text-emerald-400' : 'text-gray-500'
                                            }`}>
                                            <Clock className="w-3 h-3" />
                                            {format(new Date(block.actual_start), 'h:mm a')} - {format(new Date(block.actual_end), 'h:mm a')}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => onEdit(block)}
                                        className="p-2 hover:bg-white/10 rounded-full text-gray-500 hover:text-emerald-500 transition-all hover:scale-110"
                                        title="Edit block"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                </div>
                                {isActive && block.instructions && (
                                    <p className="text-sm text-gray-300 mt-3 border-t border-white/10 pt-3 leading-relaxed animate-in fade-in duration-300">
                                        {block.instructions}
                                    </p>
                                )}
                                {isPast && (
                                    <div className="mt-2 flex items-center gap-2 text-xs text-emerald-600">
                                        <CheckCircle2 className="w-3 h-3" />
                                        <span>Completed</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
