'use client';

import { trpc } from '@/lib/trpc/client';
import { NeoCard } from '@/components/ui/neo-card';
import { NeoButton } from '@/components/ui/neo-button';
import { NeoInput } from '@/components/ui/neo-input';
import { UserPlus, Trash2, Pencil, Mail, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

export default function UsersPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const utils = trpc.useUtils();
  const { data: users, isLoading } = trpc.user.getAll.useQuery();

  const createUser = trpc.user.create.useMutation({
    onSuccess: () => {
      utils.user.getAll.invalidate();
      closeModal();
    },
  });

  const updateUser = trpc.user.update.useMutation({
    onSuccess: () => {
      utils.user.getAll.invalidate();
      closeModal();
    },
  });

  const deleteUser = trpc.user.delete.useMutation({
    onSuccess: () => utils.user.getAll.invalidate(),
  });

  const closeModal = () => {
    setIsOpen(false);
    setEditingId(null);
    setName('');
    setEmail('');
  };

  const handleEdit = (user: any) => {
    setEditingId(user._id);
    setName(user.name);
    setEmail(user.email);
    setIsOpen(true);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <h1 className="text-2xl font-black text-slate-700 tracking-tighter uppercase">
        Users <span className="text-accent">Directory</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* --- 1. THE ADD BUTTON (FIRST CARD) --- */}
        <Dialog open={isOpen} onOpenChange={(val) => !val && closeModal()}>
          <DialogTrigger asChild>
            <button
              onClick={() => setIsOpen(true)}
              className="h-44 bg-neo-bg rounded-neo shadow-neo-out flex flex-col items-center justify-center p-8 text-accent hover:shadow-neo-in transition-all border-2 border-dashed border-accent/20 group"
            >
              <div className="p-4 rounded-full shadow-neo-out group-hover:shadow-neo-in transition-all">
                <UserPlus size={32} />
              </div>
              <span className="mt-4 font-black uppercase text-xs tracking-widest">
                Add New User
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="bg-neo-bg border-none shadow-neo-out rounded-neo-xl sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-slate-700 font-black uppercase tracking-tighter">
                {editingId ? 'Update Member' : 'Register Member'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <NeoInput
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <NeoInput
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <NeoButton
                className="w-full text-accent"
                onClick={() =>
                  editingId
                    ? updateUser.mutate({ id: editingId, name, email })
                    : createUser.mutate({ name, email, role: 'student' })
                }
                disabled={createUser.isPending || updateUser.isPending}
              >
                {editingId ? 'Save Changes' : 'Confirm Registration'}
              </NeoButton>
            </div>
          </DialogContent>
        </Dialog>

        {/* --- 2. SKELETON LOADERS --- */}
        {isLoading &&
          [1, 2, 3].map((i) => (
            <div key={i} className="h-44 bg-neo-bg rounded-neo shadow-neo-out p-8 space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-xl bg-slate-300/50" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-slate-300/50" />
                  <Skeleton className="h-3 w-32 bg-slate-300/50" />
                </div>
              </div>
            </div>
          ))}

        {/* --- 3. USER LIST --- */}
        {users?.map((user) => (
          <NeoCard key={user._id} className="h-44 flex flex-col justify-between group">
            <div className="flex items-center gap-5">
              <div className="h-14 w-14 rounded-2xl shadow-neo-in flex items-center justify-center text-accent">
                <ShieldCheck size={28} />
              </div>
              <div className="overflow-hidden">
                <h3 className="font-black text-slate-700 truncate">{user.name}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-2 truncate">
                  <Mail size={12} /> {user.email}
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleEdit(user)}
                className="p-3 rounded-xl text-slate-300 hover:text-accent hover:shadow-neo-out active:shadow-neo-in transition-all"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => deleteUser.mutate(user._id)}
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
