// src/components/ui/neo-button.tsx
import { cn } from '@/lib/utils';

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function NeoButton({ children, className, active, onClick, ...props }: NeoButtonProps) {
  return (
    <button
      onClick={onClick} // <--- THIS MUST BE HERE
      {...props} // <--- AND THIS
      className={cn(
        'bg-neo-bg px-6 py-3 rounded-xl font-bold transition-all active:scale-95',
        active ? 'shadow-neo-in text-accent' : 'shadow-neo-out text-slate-500',
        className,
      )}
    >
      {children}
    </button>
  );
}
