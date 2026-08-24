'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bell, CheckCircle } from 'lucide-react';
// COMMENTED OUT: import { subscribeToNewsletter } from '@/app/actions/newsletter';

export default function NewsletterModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Show modal after 3 seconds if not already subscribed (could use localStorage)
        const hasSubscribed = localStorage.getItem('bhawuk_subscribed');
        const hasDismissed = localStorage.getItem('bhawuk_dismissed');

        if (!hasSubscribed && !hasDismissed) {
            const timer = setTimeout(() => setIsOpen(true), 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setIsOpen(false);
        localStorage.setItem('bhawuk_dismissed', 'true');
    };

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
            setTimeout(() => setIsOpen(false), 3000);
        } else {
            setStatus('error');
            setMessage(result.error || 'Something went wrong');
        }
        */

        // Route to email client via mailto
        const subject = encodeURIComponent("Portfolio Connection Request");
        const body = encodeURIComponent(`Hello Bhawuk,\n\nI visited your portfolio and would like to connect.\n\nMy Email: ${email}`);
        const mailtoUrl = `mailto:contact@bhawukarora.app?subject=${subject}&body=${body}`;
        
        window.location.href = mailtoUrl;

        setStatus('success');
        localStorage.setItem('bhawuk_subscribed', 'true');
        setTimeout(() => setIsOpen(false), 3000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleDismiss}
                        className="absolute inset-0 bg-[#070707]/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header Image/Background */}
                        <div className="h-32 bg-gradient-to-br from-blue-600 to-indigo-900 relative">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[size:16px_16px]" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Bell className="text-white/20 w-16 h-16 animate-pulse" />
                            </div>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={handleDismiss}
                            className="absolute top-4 right-4 p-2 rounded-lg bg-black/20 text-white/70 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8">
                            <h3 className="text-2xl font-black text-[var(--text-primary)] font-['Space_Grotesk'] tracking-tighter mb-2">
                                Stay Operational.
                            </h3>
                            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
                                I occasionally dispatch technical updates, system design patterns, and new project builds. Join the communication protocol to stay in sync.
                            </p>

                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center py-4 text-center"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
                                            <CheckCircle size={24} />
                                        </div>
                                        <p className="text-sm font-bold text-green-400 uppercase tracking-widest">Handshake Complete</p>
                                        <p className="text-xs text-[var(--text-muted)] mt-1">You are now in the loop.</p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        onSubmit={handleSubmit}
                                        className="space-y-4"
                                    >
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-widest ml-1">
                                                Inbound Endpoint
                                            </label>
                                            <input
                                                required
                                                type="email"
                                                placeholder="your@email.com"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-5 py-3 text-sm font-mono focus:outline-none focus:border-[var(--accent-blue)]/50 focus:ring-4 focus:ring-[var(--accent-blue)]/5 transition-all"
                                            />
                                        </div>

                                        {status === 'error' && (
                                            <p className="text-[10px] font-mono text-red-400 ml-1 uppercase">{message}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className="w-full h-12 rounded-xl bg-[var(--accent-blue)] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
                                        >
                                            {status === 'submitting' ? 'Processing...' : (
                                                <>
                                                    Subscribe <Send size={14} />
                                                </>
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleDismiss}
                                            className="w-full py-2 text-[10px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors uppercase tracking-[0.2em]"
                                        >
                                            Continue Exploring
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
