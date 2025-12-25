// src/components/ui/neo-button.tsx
import { cn } from '@/lib/utils';

export function NeoButton({
  children,
  active = false,
  className,
}: {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <button
      className={cn(
        'bg-neo-bg px-6 py-3 rounded-xl font-bold transition-all active:scale-95',
        active ? 'shadow-neo-in text-accent' : 'shadow-neo-out text-slate-500 hover:text-accent',
        className,
      )}
    >
      {children}
    </button>
  );
}
