'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AtSign, ArrowRight } from 'lucide-react';
// COMMENTED OUT: import { subscribeToNewsletter } from '@/app/actions/newsletter';

export default function HeroHandshake() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        /*
        // COMMENTED OUT: Supabase subscription logic
        setStatus('submitting');

        const formData = new FormData();
        formData.append('email', email);

        const result = await subscribeToNewsletter(formData);

        if (result.success) {
            setStatus('success');
            localStorage.setItem('bhawuk_subscribed', 'true');
        } else {
            setStatus('error');
            setError(result.error || 'Handshake failed');
        }
        */

        // Route to email client via mailto
        const subject = encodeURIComponent("Portfolio Connection Request");
        const body = encodeURIComponent(`Hello Bhawuk,\n\nI visited your portfolio and would like to connect.\n\nMy Email: ${email}`);
        const mailtoUrl = `mailto:contact@bhawukarora.app?subject=${subject}&body=${body}`;
        
        window.location.href = mailtoUrl;
        setStatus('success');
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-green-500/5 border border-green-500/20 max-w-xl flex items-center gap-4"
            >
                <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
                    <CheckCircle size={20} />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-green-400 uppercase tracking-widest font-mono">Link Routing Active</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Opening your email client to complete the message.</p>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] max-w-2xl relative overflow-hidden group">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] bg-[size:24px_24px] opacity-10" />

            <div className="relative">
                <div className="flex items-center justify-between mb-6 border-b border-[var(--border)] pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <h3 className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-[0.3em] flex items-center gap-2">
                            Operational Sync Update
                            <span className="w-1.5 h-3 bg-blue-500 animate-[blink_1s_step-end_infinite]" />
                        </h3>
                    </div>
                    <span className="text-[8px] font-mono text-[var(--text-muted)] uppercase opacity-30 tracking-widest">Optional Handshake</span>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2 tracking-tight">Stay in the Loop</h4>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                            I occasionally dispatch system updates and architecture notes. Subscribe to bypass the noise and get direct technical updates.
                        </p>
                        <p className="text-[9px] font-mono text-[var(--text-muted)] uppercase italic">
                            Skip this and keep exploring if you prefer.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <div className="relative group/input">
                            <AtSign size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within/input:text-[var(--accent-blue)] transition-colors" />
                            <input
                                required
                                type="email"
                                placeholder="identity@endpoint.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl pl-10 pr-4 py-3 text-xs font-mono focus:outline-none focus:border-[var(--accent-blue)] transition-all"
                            />
                        </div>

                        {status === 'error' && (
                            <p className="text-[9px] font-mono text-red-400 uppercase tracking-wider">{error}</p>
                        )}

                        <button
                            disabled={status === 'submitting'}
                            className="w-full h-11 rounded-xl bg-[var(--accent-blue)] text-white font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 group/btn"
                        >
                            {status === 'submitting' ? 'Processing...' : (
                                <>
                                    Establish Link
                                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
