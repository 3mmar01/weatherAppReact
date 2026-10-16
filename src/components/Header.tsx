import { CloudSun } from 'lucide-react';

export default function Header() {
    return (
        <header className="relative mx-auto flex min-h-16 w-full max-w-6xl items-center justify-center gap-2 text-center text-2xl font-bold text-yellow-500 sm:min-h-20 sm:gap-3 sm:text-3xl">
            <CloudSun className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" aria-hidden="true" />
            <h1>Live Weather</h1>

            {/* Live indicator — top-right corner */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full bg-gray-800 px-3 py-1 text-xs font-semibold text-red-400 ring-1 ring-red-500/30">
                <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                Live
            </div>
        </header>
    );
}