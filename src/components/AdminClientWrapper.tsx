'use client';

import { TRPCProvider } from '@/providers/trpc-provider';

export function AdminClientWrapper({ children }: { children: React.ReactNode }) {
  return <TRPCProvider>{children}</TRPCProvider>;
}
