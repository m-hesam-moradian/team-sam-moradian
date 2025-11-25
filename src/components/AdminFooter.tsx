'use client';

import React from 'react';

export default function AdminFooter() {
  return (
    <footer className="w-full px-6 py-4 backdrop-blur-md bg-white/5 border-t border-white/20 text-sm text-white/70">
      <div className="text-center">
        © {new Date().getFullYear()} Admin Dashboard. All rights reserved.
      </div>
    </footer>
  );
}
