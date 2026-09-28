import React, { useState } from 'react';
import { INITIAL_BLOG_POSTS } from '../data/initialData';
import { BlogPost } from '../types';
import { User, ArrowRight, ArrowLeft } from 'lucide-react';

export const BlogView: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <button
          onClick={() => setSelectedPost(null)}
          className="inline-flex items-center gap-2 text-xs font-black text-[#111A05] hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Back to Articles</span>
        </button>

        <article className="rounded-3xl border border-[#D2D9C5] bg-white p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-xs text-[#54653D] font-mono">
            <span className="text-[#111A05] font-black bg-[#B5F714] px-2 py-0.5 rounded border border-[#111A05]/20">{selectedPost.category}</span>
            <span>·</span>
            <span>{selectedPost.readTime}</span>
            <span>·</span>
            <span>{selectedPost.date}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#111A05] leading-tight break-words">
            {selectedPost.title}
          </h1>

          <div className="flex items-center gap-2 pt-2 border-b border-[#D2D9C5] pb-4 text-xs text-[#54653D]">
            <User className="w-3.5 h-3.5 text-[#111A05]" />
            <span>By {selectedPost.author}</span>
          </div>

          <p className="text-base text-[#111A05] font-semibold leading-relaxed break-words">
            {selectedPost.summary}
          </p>

          <div className="max-w-none text-[#54653D] text-sm leading-relaxed space-y-4 pt-4 border-t border-[#D2D9C5] break-words font-medium">
            <p>{selectedPost.content}</p>

            <h3 className="text-lg font-black text-[#111A05] mt-6">Key Publisher Takeaways</h3>
            <ul className="list-disc pl-5 space-y-2 text-[#54653D]">
              <li>Always test both Single Opt-In and high-tier FTD offers to establish your baseline EPC.</li>
              <li>When integrating Adsterra script placements, leverage async container tags to maintain high page speeds.</li>
              <li>Monitor carrier billing changes in Tier 2 & Tier 3 GEOs where mobile 1-click flows drive 30%+ higher CR.</li>
              <li>Use Decap CMS to rapidly swap sponsor links and test ad networks without committing code changes.</li>
            </ul>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-[#111A05] tracking-tight">
          Affiliate & Media Buying Knowledge Base
        </h1>
        <p className="text-xs sm:text-sm text-[#54653D] mt-1 font-medium">
          Tactical guides on Smartlink optimization, Adsterra monetization, and CPA traffic arbitrage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {INITIAL_BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="rounded-2xl border border-[#D2D9C5] bg-white p-5 hover:border-[#111A05]/40 transition-all cursor-pointer group flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[#54653D] font-mono mb-2">
                <span className="text-[#111A05] font-black bg-[#EFE9DE] px-2 py-0.5 rounded border border-[#D2D9C5]">{post.category}</span>
                <span>{post.readTime}</span>
              </div>

              <h2 className="text-base font-extrabold text-[#111A05] group-hover:text-black transition-colors leading-snug break-words">
                {post.title}
              </h2>

              <p className="mt-2 text-xs text-[#54653D] line-clamp-3 leading-relaxed break-words font-medium">
                {post.summary}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#D2D9C5] flex items-center justify-between text-xs text-[#54653D]">
              <span className="font-mono text-[11px]">{post.date}</span>
              <span className="text-[#111A05] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
