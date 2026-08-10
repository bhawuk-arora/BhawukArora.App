'use client';

import React, { useEffect, useState } from 'react';
import { Terminal, Cpu, Database, Activity, RefreshCw } from 'lucide-react';

const logSequences = [
    "pulling model weights v2.4.1...",
    "model validation check: PASSED",
    "initializing distributed train cluster...",
    "deploying inference container to pod-b4...",
    "proxy: rewrites enabled for blog.bhawukarora.app",
    "clerk: session handler initialized",
    "supabase: client pool connected (ready)",
    "system status: operational."
];

export default function OperationsMonitor() {
    const [logs, setLogs] = useState<string[]>([
        "system boot sequence active...",
        "monitoring telemetry endpoints..."
    ]);
    const [logIndex, setLogIndex] = useState(0);
    const [cpuLoad, setCpuLoad] = useState(12);

    useEffect(() => {
        // Rotate console logs to simulate a real-time monitor
        const logTimer = setInterval(() => {
            setLogs(prev => {
                const nextLog = `[${new Date().toLocaleTimeString()}] ${logSequences[logIndex]}`;
                const newLogs = [...prev, nextLog];
                if (newLogs.length > 5) newLogs.shift();
                return newLogs;
            });
            setLogIndex(prev => (prev + 1) % logSequences.length);
        }, 3500);

        // Animate CPU load variations slightly
        const cpuTimer = setInterval(() => {
            setCpuLoad(prev => {
                const change = Math.floor(Math.random() * 5) - 2; // change by -2 to +2
                const newVal = prev + change;
                return Math.max(8, Math.min(24, newVal));
            });
        }, 1500);

        return () => {
            clearInterval(logTimer);
            clearInterval(cpuTimer);
        };
    }, [logIndex]);

    return (
        <div className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl relative group/monitor flex flex-col h-[340px]">
            {/* Header Terminal Style */}
            <div className="bg-[var(--bg-secondary)] px-4 py-3 border-b border-[var(--border)] flex items-center justify-between shrink-0 select-none">
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                </div>
                <div className="text-[10px] font-mono text-[var(--text-muted)] flex items-center gap-1.5 uppercase tracking-widest">
                    <Terminal size={10} className="text-[var(--accent-blue)]" /> telemetry: bhawuk-ops
                </div>
                <div className="w-12" /> {/* Spacer */}
            </div>

            {/* Metrics Dashboard Grid */}
            <div className="grid grid-cols-2 border-b border-[var(--border)] divide-x divide-[var(--border)] bg-[var(--bg)]/30 shrink-0">
                {/* System Status */}
                <div className="p-4 flex flex-col gap-1">
                    <span className="text-[9px] font-mono uppercase text-[var(--text-muted)] tracking-wider flex items-center gap-1.5">
                        <Activity size={10} /> Cluster Status
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">ONLINE</span>
                    </div>
                </div>

                {/* CPU Utilization */}
                <div className="p-4 flex flex-col gap-1">
                    <span className="text-[9px] font-mono uppercase text-[var(--text-muted)] tracking-wider flex items-center gap-1.5">
                        <Cpu size={10} /> Node Load
                    </span>
                    <div className="flex items-center justify-between gap-3 mt-1">
                        <span className="text-xs font-mono font-bold text-white">{cpuLoad}%</span>
                        <div className="flex-1 bg-[var(--bg-elevated)] h-1.5 rounded-full overflow-hidden border border-[var(--border)] max-w-[80px]">
                            <div 
                                className="bg-[var(--accent-blue)] h-full transition-all duration-1000" 
                                style={{ width: `${cpuLoad}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Real-time Console Log Output */}
            <div className="p-5 font-mono text-[10px] text-[var(--text-secondary)] flex-1 overflow-hidden flex flex-col gap-2 bg-[var(--bg)]/10">
                <div className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider flex items-center justify-between border-b border-[var(--border)] pb-2 mb-1">
                    <span>Active Containers</span>
                    <RefreshCw size={10} className="animate-spin text-[var(--accent-blue)]/50" />
                </div>
                <div className="flex-1 flex flex-col gap-2 overflow-y-auto no-scrollbar font-medium">
                    {logs.map((log, i) => (
                        <div key={i} className="flex gap-2 items-start transition-opacity duration-300">
                            <span className="text-[var(--accent-blue)] shrink-0">&gt;</span>
                            <span className="break-all text-slate-300 font-mono tracking-wide">{log}</span>
                        </div>
                    ))}
                    <div className="flex gap-2 items-center text-[var(--text-muted)] mt-1 select-none animate-pulse">
                        <span className="text-[var(--accent-blue)]">&gt;</span>
                        <span className="w-1.5 h-3 bg-[var(--text-muted)]/50 inline-block" />
                    </div>
                </div>
            </div>

            {/* Micro-Telemetry Footer */}
            <div className="bg-[var(--bg-secondary)] px-4 py-2.5 border-t border-[var(--border)] flex items-center justify-between text-[8px] font-mono text-[var(--text-muted)] uppercase tracking-widest shrink-0">
                <span className="flex items-center gap-1"><Database size={8} /> supabase: pool_ok</span>
                <span>lat: ~12ms</span>
            </div>
        </div>
    );
}
