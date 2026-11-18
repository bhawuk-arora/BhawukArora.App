'use client';

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { CheckCircle, Github, Linkedin, Mail } from "lucide-react";
import Loader from "./Loader";

const ContactForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!formRef.current) return;

        emailjs
            .sendForm("service_r3d3clv", "template_61u37om", formRef.current, "kCjs4Oa7WYESJHpxp")
            .then(() => {
                setIsSubmitting(false);
                setIsSubmitted(true);
                setFormData({ name: "", email: "", subject: "", message: "" });
            }, () => {
                setIsSubmitting(false);
                alert("Failed to send message.");
            });
    };

    return (
        <div className="w-full max-w-lg mx-auto py-4">
            <div className="mb-10 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>CHANNELS // OPEN FOR INQUIRIES</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight mb-3 font-heading">
                    Let&apos;s Connect<span className="text-[var(--accent-blue)]">.</span>
                </h1>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    Open for discussions regarding distributed systems, MLOps architecture, production reliability, or engineering opportunities.
                </p>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] pointer-events-none" />
                {!isSubmitted ? (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 relative z-10">
                        <div className="space-y-2">
                            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">Name</label>
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-blue-500/50 outline-none text-sm transition-all"
                                placeholder="Your name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">Email Address</label>
                            <input
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-blue-500/50 outline-none text-sm transition-all"
                                placeholder="name@domain.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">Subject</label>
                            <input
                                required
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-blue-500/50 outline-none text-sm transition-all"
                                placeholder="System design / Consulting / Hello"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">Message</label>
                            <textarea
                                required
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-blue-500/50 outline-none text-sm transition-all resize-none"
                                placeholder="Your message..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-[0_0_20px_rgba(37,99,235,0.25)] flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {isSubmitting ? <Loader /> : "Transmit Message"}
                        </button>
                    </form>
                ) : (
                    <div className="py-12 text-center relative z-10">
                        <CheckCircle className="mx-auto text-emerald-400 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 font-heading">Message Dispatched</h3>
                        <p className="text-sm text-[var(--text-secondary)] max-w-xs mx-auto">
                            Thank you for reaching out. I will respond to your transmission promptly.
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-[var(--text-muted)]">
                <a href="mailto:contact@bhawukarora.app" className="flex items-center gap-2 text-xs font-mono hover:text-white transition-colors">
                    <Mail size={14} /> contact@bhawukarora.app
                </a>
            </div>
        </div>
    );
};

export default ContactForm;
