import { ArrowRight, Search, X } from 'lucide-react';

type SearchModalProps = {
    open: boolean;
    onClose: () => void;
};

export function SearchModal({ open, onClose }: SearchModalProps) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center bg-zinc-900/40 pt-24"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-2 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
                    <Search className="h-4 w-4 text-zinc-400" />
                    <input
                        autoFocus
                        placeholder="Search the docs..."
                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400 dark:text-zinc-100"
                    />
                    <button type="button" onClick={onClose} className="text-zinc-400 hover:text-zinc-600">
                        <X className="h-4 w-4" />
                    </button>
                </div>
                <div className="max-h-72 overflow-y-auto p-2">
                    {['Installation', 'Routing', 'Eloquent: Getting Started', 'Middleware'].map((result) => (
                        <button
                            key={result}
                            type="button"
                            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        >
                            {result}
                            <ArrowRight className="h-3.5 w-3.5 text-zinc-300" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
