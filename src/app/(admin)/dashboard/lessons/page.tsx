'use client';

import { trpc } from '@/lib/trpc/client';
import { NeoCard } from '@/components/ui/neo-card';
import { NeoButton } from '@/components/ui/neo-button';
import { NeoInput } from '@/components/ui/neo-input';
import { BookOpen, Plus, Trash2, Pencil, Layers } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

export default function LessonsPage() {
  const [title, setTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null); // 1. Track which lesson is being edited

  const utils = trpc.useUtils();
  const { data: lessons, isLoading } = trpc.lesson.getAll.useQuery();

  const createLesson = trpc.lesson.create.useMutation({
    onSuccess: () => {
      utils.lesson.getAll.invalidate();
      closeModal();
    },
  });

  // 2. Add the Update Mutation
  const updateLesson = trpc.lesson.update.useMutation({
    onSuccess: () => {
      utils.lesson.getAll.invalidate();
      closeModal();
    },
  });

  const deleteLesson = trpc.lesson.delete.useMutation({
    onSuccess: () => utils.lesson.getAll.invalidate(),
  });

  // 3. Helper to reset everything when closing
  const closeModal = () => {
    setIsOpen(false);
    setEditingId(null);
    setTitle('');
  };

  // 4. Triggered when Pencil is clicked
  const handleEdit = (lesson: any) => {
    setEditingId(lesson._id);
    setTitle(lesson.title);
    setIsOpen(true);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <h1 className="text-2xl font-black text-slate-700 tracking-tighter uppercase">
        Lessons <span className="text-accent">Library</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* ADD / EDIT MODAL CARD */}
        <Dialog open={isOpen} onOpenChange={(val) => !val && closeModal()}>
          <DialogTrigger asChild>
            <button
              onClick={() => setIsOpen(true)}
              className="h-44 bg-neo-bg rounded-neo shadow-neo-out flex flex-col items-center justify-center p-8 text-accent hover:shadow-neo-in transition-all border-2 border-dashed border-accent/20 group"
            >
              <div className="p-4 rounded-full shadow-neo-out group-hover:shadow-neo-in transition-all">
                <Plus size={32} />
              </div>
              <span className="mt-4 font-black uppercase text-xs tracking-widest">New Lesson</span>
            </button>
          </DialogTrigger>
          <DialogContent className="bg-neo-bg border-none shadow-neo-out rounded-neo-xl">
            <DialogHeader>
              <DialogTitle className="text-slate-700 font-black uppercase">
                {editingId ? 'Edit Lesson' : 'Create Lesson'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <NeoInput
                placeholder="Lesson Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <NeoButton
                className="w-full text-accent"
                onClick={() => {
                  if (editingId) {
                    updateLesson.mutate({ id: editingId, title });
                  } else {
                    createLesson.mutate({ title, order: 1, boardId: 'default' });
                  }
                }}
                disabled={createLesson.isPending || updateLesson.isPending}
              >
                {editingId ? 'Save Changes' : 'Create Lesson'}
              </NeoButton>
            </div>
          </DialogContent>
        </Dialog>

        {/* LOADING STATE */}
        {isLoading &&
          [1, 2, 3].map((i) => (
            <div key={i} className="h-44 bg-neo-bg rounded-neo shadow-neo-out p-8 space-y-4">
              <Skeleton className="h-12 w-12 rounded-xl bg-slate-300/50" />
              <Skeleton className="h-4 w-3/4 bg-slate-300/50" />
            </div>
          ))}

        {/* LESSON LIST */}
        {lessons?.map((lesson) => (
          <NeoCard key={lesson._id} className="h-44 flex flex-col justify-between">
            <div className="flex items-center gap-5">
              <div className="h-14 w-14 rounded-2xl shadow-neo-in flex items-center justify-center text-blue-500">
                <BookOpen size={28} />
              </div>
              <div>
                <h3 className="font-black text-slate-700">{lesson.title}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Layers size={12} /> ID: {lesson._id.substring(0, 8)}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              {/* 5. Connected handleEdit here */}
              <button
                onClick={() => handleEdit(lesson)}
                className="p-3 rounded-xl text-slate-300 hover:text-accent hover:shadow-neo-out active:shadow-neo-in transition-all"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => deleteLesson.mutate(lesson._id)}
                className="p-3 rounded-xl text-slate-300 hover:text-red-500 hover:shadow-neo-out active:shadow-neo-in transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </NeoCard>
        ))}
      </div>
    </div>
  );
}
