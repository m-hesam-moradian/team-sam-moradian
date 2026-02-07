'use client';

import { trpc } from '@/lib/trpc/client';
import { NeoCard } from '@/components/ui/neo-card';
import { NeoButton } from '@/components/ui/neo-button';
import { NeoInput } from '@/components/ui/neo-input';
import { Layers, Plus, Trash2, Pencil, User } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

export default function BoardsPage() {
  const [title, setTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const utils = trpc.useUtils();
  const { data: boards, isLoading } = trpc.board.getAll.useQuery();

  const createBoard = trpc.board.create.useMutation({
    onSuccess: () => {
      utils.board.getAll.invalidate();
      closeModal();
    },
  });

  const updateBoard = trpc.board.update.useMutation({
    onSuccess: () => {
      utils.board.getAll.invalidate();
      closeModal();
    },
  });

  const deleteBoard = trpc.board.delete.useMutation({
    onSuccess: () => utils.board.getAll.invalidate(),
  });

  const closeModal = () => {
    setIsOpen(false);
    setEditingId(null);
    setTitle('');
  };

  const handleEdit = (board: any) => {
    setEditingId(board._id);
    setTitle(board.title);
    setIsOpen(true);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 min-h-screen">
      <h1 className="text-2xl font-black text-slate-700 tracking-tighter uppercase">
        Boards <span className="text-accent">Workspace</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* --- MODAL TRIGGER CARD --- */}
        <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
          <DialogTrigger asChild>
            <button
              onClick={() => setIsOpen(true)}
              className="h-44 w-full bg-neo-bg rounded-neo shadow-neo-out flex flex-col items-center justify-center p-8 text-accent hover:shadow-neo-in transition-all border-2 border-dashed border-accent/20 group cursor-pointer"
            >
              <div className="p-4 rounded-full shadow-neo-out group-hover:shadow-neo-in transition-all">
                <Plus size={32} />
              </div>
              <span className="mt-4 font-black uppercase text-xs tracking-widest">New Board</span>
            </button>
          </DialogTrigger>

          {/* --- FIXED MODAL CONTENT --- */}
          <DialogContent className="bg-neo-bg border-none shadow-neo-out rounded-neo-xl sm:max-w-md p-0 overflow-hidden">
            <div className="p-10 space-y-8">
              {' '}
              {/* Added heavy padding and spacing here */}
              <DialogHeader>
                <DialogTitle className="text-slate-700 font-black uppercase tracking-tighter text-xl text-center">
                  {editingId ? 'Edit Board' : 'Create Board'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-widest">
                    Workspace Name
                  </label>
                  <NeoInput
                    placeholder="Enter board title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                  />
                </div>

                <NeoButton
                  className="w-full text-accent py-4 shadow-neo-out hover:shadow-neo-in active:shadow-neo-in"
                  onClick={() => {
                    if (editingId) {
                      updateBoard.mutate({ id: editingId, title });
                    } else {
                      createBoard.mutate({ title, ownerId: 'admin' });
                    }
                  }}
                  disabled={createBoard.isPending || updateBoard.isPending}
                >
                  {createBoard.isPending || updateBoard.isPending ? 'Syncing...' : 'Confirm Action'}
                </NeoButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* --- LISTING & SKELETONS --- */}
        {isLoading
          ? [1, 2, 3].map((i) => (
              <div key={i} className="h-44 bg-neo-bg rounded-neo shadow-neo-out p-8">
                <Skeleton className="h-12 w-12 rounded-xl bg-slate-300/30" />
                <Skeleton className="h-4 w-1/2 bg-slate-300/30 mt-4" />
              </div>
            ))
          : boards?.map((board) => (
              <NeoCard key={board._id} className="h-44 flex flex-col justify-between group">
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl shadow-neo-in flex items-center justify-center text-emerald-500">
                    <Layers size={28} />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-black text-slate-700 truncate">{board.title}</h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                      Workspace
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => handleEdit(board)}
                    className="p-3 rounded-xl text-slate-300 hover:text-accent hover:shadow-neo-out transition-all"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => deleteBoard.mutate(board._id)}
                    className="p-3 rounded-xl text-slate-300 hover:text-red-500 hover:shadow-neo-out transition-all"
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
