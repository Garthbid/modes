'use client';

import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastProps {
    toasts: Toast[];
    removeToast: (id: string) => void;
}

export default function ToastContainer({ toasts, removeToast }: ToastProps) {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
            ))}
        </div>
    );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const icons = {
        success: <CheckCircle className="w-5 h-5" />,
        error: <AlertCircle className="w-5 h-5" />,
        info: <Info className="w-5 h-5" />,
    };

    const colors = {
        success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        error: 'bg-red-500/10 border-red-500/30 text-red-400',
        info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    };

    return (
        <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl animate-in slide-in-from-right duration-300 ${colors[toast.type]}`}
        >
            {icons[toast.type]}
            <span className="flex-1 text-sm font-medium">{toast.message}</span>
            <button
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

// Hook for using toasts
export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return { toasts, addToast, removeToast };
}
