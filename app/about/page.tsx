import type { Metadata } from 'next';
import AboutClient from '@/components/AboutClient';

export const metadata: Metadata = {
    title: 'About',
    description: 'Software Engineer specializing in MLOps, Distributed Systems, and Cloud Infrastructure.',
};

export default function AboutPage() {
    return <AboutClient />;
}
