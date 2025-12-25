// src/app/(admin)/layout.tsx
import { Sidebar } from '@/components/admin/sidebar';
import { AdminHeader } from '@/components/admin/header'; // lowercase 'header'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-neo-bg overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-full">
        <Sidebar />
      </aside>

      <div className="flex flex-1 flex-col h-full overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto px-6 pb-10 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
