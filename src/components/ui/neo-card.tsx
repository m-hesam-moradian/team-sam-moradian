// src/components/ui/neo-card.tsx
import { cn } from '@/lib/utils';

export function NeoCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'bg-neo-bg rounded-neo shadow-neo-out p-8 transition-all duration-300',
        className,
      )}
    >
      {children}
    </div>
  );
}
