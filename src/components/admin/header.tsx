'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from './sidebar';
import { Menu, Bell, UserCircle } from 'lucide-react';

export function AdminHeader() {
  return (
    <header className="flex h-20 items-center justify-between px-6 lg:px-10">
      {/* Mobile Menu Trigger */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-3 rounded-xl shadow-neo-out bg-neo-bg active:shadow-neo-in transition-all">
              <Menu className="h-6 w-6 text-slate-600" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 bg-neo-bg border-none">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Administrator Portal
        </h2>
      </div>

      {/* Right Side Items */}
      <div className="flex items-center gap-6">
        <button className="p-3 rounded-full shadow-neo-out bg-neo-bg text-slate-500 hover:text-accent active:shadow-neo-in transition-all">
          <Bell className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 p-1 pr-4 rounded-full shadow-neo-out bg-neo-bg">
          <div className="h-10 w-10 rounded-full shadow-neo-in flex items-center justify-center text-accent">
            <UserCircle className="h-7 w-7" />
          </div>
          <span className="text-sm font-black text-slate-700 hidden sm:inline">Hesam M.</span>
        </div>
      </div>
    </header>
  );
}
