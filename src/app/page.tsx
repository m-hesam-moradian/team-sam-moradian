// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { NeoCard } from '@/components/ui/neo-card';
import { BookOpen, GraduationCap, LayoutDashboard, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 🚀 REST API FETCH (Manual)
    const getLessons = async () => {
      try {
        const response = await fetch('/api/rest/lessons');
        const data = await response.json();
        setLessons(data);
      } catch (err) {
        console.error('REST Fetch failed:', err);
      } finally {
        setIsLoading(false);
      }
    };
    getLessons();
  }, []);

  return (
    <div className="min-h-screen bg-neo-bg p-8 md:p-20 space-y-16">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-5 shadow-neo-out rounded-[30px] bg-neo-bg">
          <GraduationCap className="text-accent" size={48} />
        </div>
        <h1 className="text-4xl font-black text-slate-800 tracking-tighter">
          SAM<span className="text-accent">LMS</span> PUBLIC
        </h1>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">
          Experimental REST API Integration
        </p>
      </div>

      {/* Public Lesson Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {isLoading
          ? [1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-neo-bg rounded-neo shadow-neo-out animate-pulse" />
            ))
          : lessons.map((lesson: any) => (
              <NeoCard
                key={lesson._id}
                className="flex flex-col justify-center items-center text-center py-10 hover:scale-[1.02] transition-transform cursor-default"
              >
                <div className="p-3 shadow-neo-in rounded-2xl mb-4 text-blue-500">
                  <BookOpen size={24} />
                </div>
                <h3 className="font-black text-slate-700">{lesson.title}</h3>
                <span className="text-[10px] text-slate-400 font-bold mt-2 uppercase">
                  Open Lesson
                </span>
              </NeoCard>
            ))}
      </div>

      {/* Call to Action */}
      <div className="flex justify-center">
        <Link href="/dashboard">
          <button className="px-10 py-4 rounded-2xl shadow-neo-out hover:shadow-neo-in text-slate-600 font-black flex items-center gap-3 transition-all">
            Enter Admin Dashboard <ArrowRight size={20} className="text-accent" />
          </button>
        </Link>
      </div>
    </div>
  );
}
