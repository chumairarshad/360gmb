'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Briefcase, Plus, Users, Building2, Search, ArrowRight, ShieldCheck, Download } from 'lucide-react';

export default function AgencyClientsPage() {
  const [clients, setClients] = useState([
    {
      id: 'c1',
      clientName: 'Apex Dental Studio',
      companyName: 'Apex Dental Group LLC',
      clientEmail: 'marcus@apexdentalstudio.demo',
      businessesCount: 2,
      avgScore: 74,
      status: 'ACTIVE',
    },
    {
      id: 'c2',
      clientName: 'Artisan Bakery & Cafe',
      companyName: 'Artisan Food Concepts Inc',
      clientEmail: 'hello@artisanbakerycafe.demo',
      businessesCount: 3,
      avgScore: 89,
      status: 'ACTIVE',
    },
    {
      id: 'c3',
      clientName: 'Quantum Performance Gym',
      companyName: 'Quantum Fitness Ltd',
      clientEmail: 'info@quantumfitness.demo',
      businessesCount: 1,
      avgScore: 62,
      status: 'ACTIVE',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      id: `c-${Date.now()}`,
      clientName: clientName || 'New Client',
      companyName: companyName || 'Client Organization',
      clientEmail: clientEmail || 'client@demo.com',
      businessesCount: 1,
      avgScore: 70,
      status: 'ACTIVE',
    };
    setClients([...clients, created]);
    setIsModalOpen(false);
    setClientName('');
    setCompanyName('');
    setClientEmail('');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Agency Multi-Client Dashboard</h1>
            <Badge variant="info">Agency Plan</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">Manage multiple client accounts, assign team members, and generate client reports.</p>
        </div>

        <Button variant="gradient" size="md" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Client Account
        </Button>
      </div>

      {/* Agency Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400">Total Client Accounts</span>
          <p className="text-2xl font-black text-white">{clients.length} Clients</p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400">Total Locations Managed</span>
          <p className="text-2xl font-black text-blue-400">6 Locations</p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400">Avg Client GMB Score</span>
          <p className="text-2xl font-black text-emerald-400">75 / 100</p>
        </div>
      </div>

      {/* Client Accounts Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white tracking-tight">Client Accounts List</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-bold uppercase text-slate-400">
                <th className="py-3 px-4">Client Name & Organization</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Locations</th>
                <th className="py-3 px-4">Avg Score</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
              {clients.map((c) => (
                <tr key={c.id} className="hover:bg-slate-950/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-white">
                    <div>
                      <span>{c.clientName}</span>
                      <p className="text-[10px] text-slate-400 font-normal">{c.companyName}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-300">{c.clientEmail}</td>
                  <td className="py-4 px-4 font-semibold text-white">{c.businessesCount} Businesses</td>
                  <td className="py-4 px-4">
                    <span className="font-extrabold text-blue-400">{c.avgScore} / 100</span>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="success">{c.status}</Badge>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <a href="/dashboard" className="text-xs font-bold text-blue-400 hover:underline inline-flex items-center">
                      Manage <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Client Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Client Account"
        subtitle="Create a new client account to manage their Google Business Profiles."
      >
        <form onSubmit={handleAddClient} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Client Brand Name</label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
              placeholder="e.g. Apex Dental Studio"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Organization / Legal Name</label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
              placeholder="e.g. Apex Dental LLC"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Client Email</label>
            <input
              type="email"
              required
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
              placeholder="client@company.com"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-3">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="gradient" type="submit">
              Save Client Account
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
