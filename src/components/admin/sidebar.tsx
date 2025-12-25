'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

const items = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Users', href: '/dashboard/users', icon: Users },
  { name: 'Boards', href: '/dashboard/boards', icon: Layers },
  { name: 'Lessons', href: '/dashboard/lessons', icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-10 px-4">
        <h1 className="text-xl font-black text-slate-800 tracking-tighter">
          SAM<span className="text-accent">LMS</span>
        </h1>
      </div>

      <nav className="flex-1 space-y-4">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300',
                active
                  ? 'shadow-neo-in text-accent'
                  : 'text-slate-500 hover:shadow-neo-out hover:text-slate-800',
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-bold text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
