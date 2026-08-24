import type { Metadata } from 'next';
import Link from 'next/link';
import { Github, ExternalLink, ArrowLeft, Terminal, Cpu, Database, Cloud, ArrowRight } from 'lucide-react';
import { projects } from '@/lib/data';
import AnimatedSection from '@/components/AnimatedSection';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'High-performance infrastructure, MLOps pipelines, and cloud-native modules architected for scale.',
};

export default function ProjectsPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 w-full flex flex-col items-center">
            <div className="w-full max-w-5xl mx-auto px-6 md:px-8">

                {/* Header Section */}
                <AnimatedSection>
                    <div className="mb-20">
                        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold font-mono text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-all mb-12 group uppercase tracking-widest">
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>

                        <div className="flex flex-col gap-6">
                            <h1 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] tracking-tighter leading-[0.9]">
                                Systems / <br />
                                <span className="text-[var(--accent-blue)]">Solutions.</span>
                            </h1>
                            <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed py-1">
                                High-performance infrastructure, MLOps pipelines, and cloud-native solutions architected for scale.
                            </p>
                        </div>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {projects.map((project, i) => (
                        <AnimatedSection key={project.title} delay={i * 100}>
                            <div className="group relative flex flex-col p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent-blue)]/30 transition-all duration-500 h-full overflow-hidden">
                                {/* Technical Grid Overlay */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] bg-[size:24px_24px] opacity-10 pointer-events-none" />

                                <div className="flex justify-between items-start mb-6 gap-4">
                                    <div className="space-y-3">
                                        {project.featured && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono font-bold tracking-[0.2em] uppercase">
                                                Featured
                                            </span>
                                        )}
                                        <h2 className="text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors leading-tight">
                                            {project.title}
                                        </h2>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-muted)] hover:text-white hover:border-[var(--text-muted)] transition-all shadow-sm" title="View Source">
                                                <Github size={18} />
                                            </a>
                                        )}
                                        {project.demo && (
                                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-muted)] hover:text-white hover:border-[var(--text-muted)] transition-all shadow-sm" title="Live Demo">
                                                <ExternalLink size={18} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed mb-10 flex-1">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-[var(--border)]">
                                    {project.tech.map(t => (
                                        <span key={t} className="px-3 py-1 rounded-lg text-xs font-mono bg-[var(--bg)] text-[var(--text-muted)] border border-[var(--border)] group-hover:border-[var(--accent-blue)]/20 transition-colors">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                {/* Bottom CTA */}
                <AnimatedSection delay={400}>
                    <div className="mt-28 p-10 md:p-16 rounded-[2rem] bg-[var(--bg-card)] border border-[var(--border)] text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] bg-[size:32px_32px] opacity-10" />

                        <h3 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6 tracking-tight relative z-10">Start a technical session?</h3>
                        <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-xl mx-auto leading-relaxed relative z-10">
                            I'm available for collaborations on cloud infrastructure, MLOps automation, and architecture design.
                        </p>
                        <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[var(--accent-blue)] text-white font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 relative z-10">
                            Get in Touch <ArrowRight size={18} />
                        </Link>
                    </div>
                </AnimatedSection>

            </div>
        </main>
    );
}
