'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Get In Touch</span>
        <h1 className="text-4xl font-black text-white tracking-tight">We are Here to Help You Grow</h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Have questions about plan limits, agency onboarding, or API integrations? Drop us a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Email Support</h4>
                <p className="text-xs text-slate-400 mt-0.5">support@360gmb.demo</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Phone Support</h4>
                <p className="text-xs text-slate-400 mt-0.5">+1 (800) 555-0360</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Headquarters</h4>
                <p className="text-xs text-slate-400 mt-0.5">Seattle, WA 98101, United States</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 p-8 rounded-3xl bg-slate-900 border border-slate-800">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Thank you for contacting 360 GMB. Our team will review your inquiry and respond within 24 hours.
              </p>
              <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                  placeholder="Inquiry or feedback topic"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                  placeholder="How can we assist your business or agency?"
                />
              </div>

              <Button variant="gradient" size="lg" type="submit" className="w-full">
                <Send className="w-4 h-4 mr-2" /> Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
