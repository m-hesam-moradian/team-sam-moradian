// src/app/(admin)/dashboard/page.tsx
'use client';

import { NeoCard } from '@/components/ui/neo-card';
import { Users, Layers, BookOpen } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-10 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <NeoCard className="flex items-center gap-6">
          <div className="p-4 rounded-2xl shadow-neo-in text-accent">
            <Users size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Total Users
            </p>
            <h3 className="text-2xl font-black text-slate-700">1,248</h3>
          </div>
        </NeoCard>

        <NeoCard className="flex items-center gap-6">
          <div className="p-4 rounded-2xl shadow-neo-in text-blue-500">
            <Layers size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Active Boards
            </p>
            <h3 className="text-2xl font-black text-slate-700">32</h3>
          </div>
        </NeoCard>

        <NeoCard className="flex items-center gap-6">
          <div className="p-4 rounded-2xl shadow-neo-in text-emerald-500">
            <BookOpen size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lessons</p>
            <h3 className="text-2xl font-black text-slate-700">84</h3>
          </div>
        </NeoCard>
      </div>

      <NeoCard className="min-h-[300px] flex items-center justify-center border-2 border-dashed border-slate-300 shadow-none bg-transparent">
        <p className="text-slate-400 font-bold uppercase tracking-tighter opacity-50">
          Analytics Placeholder
        </p>
      </NeoCard>
    </div>
  );
}
