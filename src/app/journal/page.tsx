import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { articles } from "@/data/articles";

export default function JournalPage() {

    return (
        <main className="pt-32 min-h-screen bg-brand-green text-white pb-24">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mb-16">
                    <span className="text-brand-gold font-sans uppercase tracking-widest text-sm font-bold mb-4 block">The Estate Journal</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-8">Stories from the Garden</h1>
                    <p className="text-xl text-white/70 font-sans leading-relaxed">
                        Explore the stories, traditions, and brewing techniques behind our exceptional teas.
                        From the misty hills of our estates to your morning cup.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <article key={article.id} className="group flex flex-col h-full bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-brand-gold/50 transition-colors duration-300">
                            {/* Image Placeholder */}
                            <div className={`h-64 w-full ${article.image} relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-brand-gold text-brand-green text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-sm">
                                        {article.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs text-brand-gold/80 font-sans mb-4 uppercase tracking-wider">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                                    <span className="flex items-center gap-1"><User size={12} /> {article.readTime}</span>
                                </div>

                                <h2 className="text-2xl font-serif text-white mb-4 group-hover:text-brand-gold transition-colors leading-tight">
                                    {article.title}
                                </h2>

                                <p className="text-white/60 font-sans text-sm leading-relaxed mb-8 flex-grow">
                                    {article.excerpt}
                                </p>

                                <div className="mt-auto">
                                    <Link href={`/journal/${article.slug}`} className="inline-flex items-center gap-2 text-brand-gold font-sans font-bold uppercase tracking-widest text-xs hover:gap-3 transition-all">
                                        Read Article <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}
