// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  // 1. Tell Tailwind where to look for your classes
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // The specific Neumorphic Gray-Blue background
        neo: '#E0E5EC',
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      boxShadow: {
        // Shadow 2: Drop Shadow (Elevated / Pop out)
        'neo-out': '9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff',
        // Shadow 4: Inner Shadow (Sunken / Pressed in)
        'neo-in': 'inset 6px 6px 12px #a3b1c6, inset -6px -6px 12px #ffffff',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
