import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Advertising & Sponsor Placement',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-[#111A05] tracking-tight">
          Partner & Directory Inquiries
        </h1>
        <p className="text-xs sm:text-sm text-[#54653D] mt-1 font-medium">
          Have an affiliate network, CPA offer, or want to reserve a top banner ad space? Reach our team below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Info Box */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#D2D9C5] bg-white p-5 space-y-3 shadow-xs">
            <h3 className="text-sm font-extrabold text-[#111A05]">Advertising & Listings</h3>
            <p className="text-xs text-[#54653D] leading-relaxed break-words font-medium">
              We connect premier CPA networks, direct advertisers, and SaaS tracking providers with 40,000+ active performance affiliates.
            </p>

            <div className="space-y-2 pt-2 border-t border-[#D2D9C5] text-xs">
              <div className="flex items-center gap-2 text-[#111A05]">
                <Mail className="w-4 h-4 text-[#54653D]" />
                <span className="font-mono font-bold">partners@cpahub.directory</span>
              </div>
              <div className="flex items-center gap-2 text-[#111A05]">
                <MessageSquare className="w-4 h-4 text-[#54653D]" />
                <span className="font-mono font-bold">Telegram: @CPAHubSupport</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#D2D9C5] bg-[#FAF7F2] p-5 text-xs text-[#54653D] space-y-2">
            <div className="font-extrabold text-[#111A05] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#54653D]" />
              <span>Publisher Privacy Notice</span>
            </div>
            <p className="leading-relaxed break-words font-medium">
              All submissions are strictly vetted. We never share your contact details or tracking variables with third parties.
            </p>
          </div>
        </div>

        {/* Form Box */}
        <div className="md:col-span-2 rounded-2xl border border-[#D2D9C5] bg-white p-6 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="inline-flex p-3 rounded-2xl bg-[#B5F714] text-[#111A05] border border-[#111A05]/20">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-black text-[#111A05]">Message Received!</h3>
              <p className="text-xs text-[#54653D] max-w-sm mx-auto font-medium">
                Thank you for contacting CPAHub. An affiliate account manager will review your request within 24 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE9DE] text-[#111A05] border border-[#D2D9C5] text-xs font-bold cursor-pointer transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#54653D] font-bold mb-1">Your Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full bg-[#FAF7F2] border border-[#D2D9C5] rounded-xl p-2.5 text-[#111A05] focus:outline-none focus:ring-1 focus:ring-[#B5F714]"
                  />
                </div>
                <div>
                  <label className="block text-[#54653D] font-bold mb-1">Corporate Email</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@network.com"
                    className="w-full bg-[#FAF7F2] border border-[#D2D9C5] rounded-xl p-2.5 text-[#111A05] focus:outline-none focus:ring-1 focus:ring-[#B5F714]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#54653D] font-bold mb-1">Inquiry Topic</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#D2D9C5] rounded-xl p-2.5 text-[#111A05] focus:outline-none focus:ring-1 focus:ring-[#B5F714]"
                >
                  <option value="Advertising & Sponsor Placement">Advertising & Sponsor Placement</option>
                  <option value="Submit New CPA Network">Submit New CPA Network</option>
                  <option value="Adsterra Banner Sponsorship">Adsterra Banner Sponsorship</option>
                  <option value="Report Broken Offer Link">Report Broken Offer Link</option>
                  <option value="Editorial & Guest Posting">Editorial & Guest Posting</option>
                </select>
              </div>

              <div>
                <label className="block text-[#54653D] font-bold mb-1">Details / Offer Specifications</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding your network, offer payouts, targeted GEOs, or ad placement requirements..."
                  className="w-full bg-[#FAF7F2] border border-[#D2D9C5] rounded-xl p-2.5 text-[#111A05] focus:outline-none focus:ring-1 focus:ring-[#B5F714]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#B5F714] hover:bg-[#A2E20E] text-[#111A05] font-black text-xs border border-[#111A05]/20 shadow-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  <span>Transmit Inquiry</span>
                  <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
