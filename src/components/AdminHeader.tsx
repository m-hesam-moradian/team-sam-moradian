'use client';

import React from 'react';

export default function AdminHeader() {
  return (
    <header className="w-full px-6 py-4 backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition-colors border border-white/30">
            + New
          </button>
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-white/30 to-white/10 border border-white/50 flex items-center justify-center text-xs text-white font-semibold">
            AD
          </div>
        </div>
      </div>
    </header>
  );
}
