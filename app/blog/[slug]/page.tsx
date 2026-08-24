import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Post } from "@/lib/data";
import ArticleClient from "@/components/ArticleClient";
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

interface Props {
    params: Promise<{ slug: string }>;
}

// Enable ISR (Incremental Static Regeneration) - Revalidate cache every 60 seconds
export const revalidate = 60;

// generateStaticParams runs at build time to statically generate all slug routes
export async function generateStaticParams() {
    try {
        const { data: posts } = await supabase
            .from('posts')
            .select('slug')
            .eq('enabled', true);

        return (posts || []).map((post) => ({
            slug: post.slug,
        }));
    } catch (e) {
        console.error("Error in generateStaticParams:", e);
        return [];
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const { slug } = await params;
        const { data: post, error } = await supabase
            .from('posts')
            .select('*')
            .eq('slug', slug)
            .eq('enabled', true)
            .maybeSingle();

        if (error || !post) return { title: "Post Not Found" };

        return {
            title: post.title,
            description: post.description,
            keywords: post.tags,
            openGraph: {
                title: post.title,
                description: post.description,
                type: "article",
                publishedTime: post.published_at,
                authors: [post.author],
            },
        };
    } catch (err) {
        return { title: "Blog" };
    }
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('enabled', true)
        .maybeSingle();

    if (error || !data) {
        console.error("Post not found for slug:", slug, error);
        notFound();
    }

    // Mapping helper to bridge Supabase underscored names to camelCase interface
    const mapPost = (p: any): Post => ({
        ...p,
        readingTime: p.reading_time || 5,
        publishedAt: p.published_at,
        patternType: p.pattern_type || 'dots',
        accentColor: p.accent_color || '#6366f1',
        authorBio: p.author_bio || ''
    });

    const post = mapPost(data);

    // Fetch related posts in the same category
    const { data: relatedData } = await supabase
        .from('posts')
        .select('*')
        .eq('category', data.category)
        .eq('enabled', true)
        .neq('slug', slug)
        .limit(2);

    const relatedPosts = (relatedData || []).map(mapPost);

    // Fetch comments and ratings
    const { data: commentsData } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', data.id)
        .order('created_at', { ascending: false });

    const { data: ratingsData } = await supabase
        .from('ratings')
        .select('rating')
        .eq('post_id', data.id);

    const comments = commentsData || [];
    const totalVotes = ratingsData?.length || 0;
    const score = ratingsData?.reduce((acc, curr) => acc + curr.rating, 0) || 0;

    return (
        <ArticleClient 
            post={post} 
            relatedPosts={relatedPosts} 
            engagement={{
                comments,
                score,
                totalVotes,
                postId: data.id,
                slug: data.slug
            }}
        />
    );
}
