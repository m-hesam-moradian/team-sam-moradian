'use client';

import { trpc } from '@/lib/trpc/client';
import { NeoCard } from '@/components/ui/neo-card';
import { Users, BookOpen, Layers } from 'lucide-react';

export default function DashboardPage() {
  const { data: userStats, isLoading: userLoading } = trpc.user.getStats.useQuery();
  const { data: boardStats, isLoading: boardLoading } = trpc.board.getStats.useQuery();
  const { data: lessonStats, isLoading: lessonLoading } = trpc.lesson.getStats.useQuery();

  // Create the display array using the EXACT keys from your console logs
  const statsDisplay = [
    {
      label: 'Total Users',
      value: userStats?.totalUsers ?? 0,
      loading: userLoading,
      icon: Users,
      color: 'text-accent',
    },
    {
      label: 'Active Boards',
      value: boardStats?.totalBoards ?? 0, // Matches your console: {totalBoards: 1}
      loading: boardLoading,
      icon: Layers,
      color: 'text-blue-500',
    },
    {
      label: 'Total Lessons',
      value: lessonStats?.totalLessons ?? 0,
      loading: lessonLoading,
      icon: BookOpen,
      color: 'text-emerald-500',
    },
  ];

  return (
    <div className="space-y-10 pt-4">
      <h1 className="text-2xl font-black text-slate-700 tracking-tighter uppercase">
        System <span className="text-accent">Overview</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {statsDisplay.map((stat) => (
          <NeoCard key={stat.label} className="flex items-center gap-6">
            <div className={`p-4 rounded-2xl shadow-neo-in ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {stat.label}
              </p>
              <h3 className="text-2xl font-black text-slate-700">
                {stat.loading ? '...' : stat.value}
              </h3>
            </div>
          </NeoCard>
        ))}
      </div>

      <NeoCard className="h-64 flex items-center justify-center border-2 border-dashed border-slate-300 shadow-none bg-transparent">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
          Activity Analytics coming soon
        </p>
      </NeoCard>
    </div>
  );
}
