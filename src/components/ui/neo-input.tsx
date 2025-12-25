// src/components/ui/neo-input.tsx
import { cn } from '@/lib/utils';

export function NeoInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full bg-neo-bg rounded-2xl px-6 py-4 shadow-neo-in outline-none text-slate-500 placeholder:text-slate-400 border-none focus:ring-0',
        className,
      )}
      {...props}
    />
  );
}
