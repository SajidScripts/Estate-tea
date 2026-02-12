"use client";

import { useParams, useRouter } from "next/navigation";
import { articles } from "@/data/articles";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { motion } from "framer-motion";

export default function ArticlePage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.id as string;

    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        return (
            <main className="pt-32 min-h-screen bg-brand-green text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-serif text-brand-gold mb-4">Article Not Found</h1>
                    <button
                        onClick={() => router.push('/journal')}
                        className="text-white/60 hover:text-brand-gold transition-colors"
                    >
                        ← Back to Journal
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="pt-24 pb-16 md:pb-24 min-h-screen bg-brand-green text-white">
            <article className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-4xl">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => router.push('/journal')}
                    className="flex items-center gap-2 text-white/60 hover:text-brand-gold transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-sans text-sm uppercase tracking-wider">Back to Journal</span>
                </motion.button>

                {/* Article Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-brand-gold text-brand-green text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-sm">
                            {article.category}
                        </span>
                        <span className="flex items-center gap-2 text-brand-gold/80 text-xs uppercase tracking-wider">
                            <Calendar size={12} /> {article.date}
                        </span>
                        <span className="flex items-center gap-2 text-brand-gold/80 text-xs uppercase tracking-wider">
                            <User size={12} /> {article.readTime}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
                        {article.title}
                    </h1>

                    <p className="text-xl text-white/70 font-sans leading-relaxed mb-6">
                        {article.excerpt}
                    </p>

                    <div className="flex items-center gap-3 text-white/50 text-sm font-sans">
                        <User size={16} />
                        <span>By {article.author}</span>
                    </div>
                </motion.div>

                {/* Featured Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`w-full h-64 md:h-96 ${article.image} rounded-lg mb-12 relative overflow-hidden`}
                >
                    <div className="absolute inset-0 bg-black/20" />
                </motion.div>

                {/* Article Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="prose prose-invert prose-lg max-w-none
                        prose-headings:font-serif prose-headings:text-brand-gold
                        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                        prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-6
                        prose-strong:text-brand-gold prose-strong:font-bold
                        prose-ul:text-white/80 prose-ul:my-6
                        prose-li:my-2
                    "
                >
                    {article.content.split('\n').map((paragraph, index) => {
                        // Handle markdown-style headings
                        if (paragraph.trim().startsWith('## ')) {
                            return <h2 key={index}>{paragraph.replace('## ', '')}</h2>;
                        }
                        if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                            return <h3 key={index} className="text-brand-gold font-bold text-lg">{paragraph.replace(/\*\*/g, '')}</h3>;
                        }
                        // Handle bold text inline
                        if (paragraph.includes('**')) {
                            const parts = paragraph.split('**');
                            return (
                                <p key={index}>
                                    {parts.map((part, i) =>
                                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                                    )}
                                </p>
                            );
                        }
                        // Regular paragraphs
                        if (paragraph.trim()) {
                            return <p key={index}>{paragraph}</p>;
                        }
                        return null;
                    })}
                </motion.div>

                {/* Share/Back CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center"
                >
                    <button
                        onClick={() => router.push('/journal')}
                        className="flex items-center gap-2 text-brand-gold font-sans font-bold uppercase tracking-widest text-sm hover:gap-3 transition-all"
                    >
                        <ArrowLeft size={16} /> More Articles
                    </button>
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                        <Tag size={16} />
                        <span>{article.category}</span>
                    </div>
                </motion.div>
            </article>
        </main>
    );
}
