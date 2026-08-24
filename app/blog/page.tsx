import { Metadata } from "next";
import BlogClient from "@/components/BlogClient";
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { Post } from "@/lib/data";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Deep dives into MLOps, Distributed Systems, and High-Performance Infrastructure by Bhawuk Arora.",
};

// Enable ISR (Incremental Static Regeneration) - Revalidate every 60 seconds
export const revalidate = 60;

export default async function BlogPage() {
    const supabase = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data } = await supabase
        .from('posts')
        .select(`
            slug, title, description, category, tags, reading_time, published_at, 
            featured, emoji, pattern_type, accent_color, author, author_bio,
            ratings(rating)
        `)
        .eq('enabled', true)
        .order('published_at', { ascending: false })
        .limit(50);

    const posts = (data || []).map((p: any) => {
        const ratings = p.ratings || [];
        const total = ratings.length;
        const score = ratings.reduce((acc: number, r: any) => acc + r.rating, 0);

        return {
            ...p,
            readingTime: p.reading_time || 5,
            publishedAt: p.published_at,
            patternType: p.pattern_type || 'dots',
            accentColor: p.accent_color || '#6366f1',
            authorBio: p.author_bio || '',
            score,
            totalVotes: total
        };
    }) as Post[];

    return <BlogClient initialPosts={posts} />;
}
