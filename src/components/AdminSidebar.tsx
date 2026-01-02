'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminSidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-linear-to-b from-slate-900 to-slate-800 text-white min-h-screen p-6 fixed left-0 top-0">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      <nav className="space-y-2">
        <Link
          href="/admin/dashboard"
          className={`block px-4 py-2 rounded-lg transition-colors ${
            isActive('/admin/dashboard')
              ? 'bg-blue-600 text-white'
              : 'hover:bg-slate-700 text-slate-300'
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/admin/dashboard/users"
          className={`block px-4 py-2 rounded-lg transition-colors ${
            isActive('/admin/dashboard/users')
              ? 'bg-blue-600 text-white'
              : 'hover:bg-slate-700 text-slate-300'
          }`}
        >
          Users
        </Link>
        <Link
          href="/admin/dashboard/lessons"
          className={`block px-4 py-2 rounded-lg transition-colors ${
            isActive('/admin/dashboard/lessons')
              ? 'bg-blue-600 text-white'
              : 'hover:bg-slate-700 text-slate-300'
          }`}
        >
          Lessons
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
