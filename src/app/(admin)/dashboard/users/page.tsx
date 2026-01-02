'use client';

import { trpc } from '@/lib/trpc/client';
import { NeoCard } from '@/components/ui/neo-card';
import { NeoButton } from '@/components/ui/neo-button';
import { NeoInput } from '@/components/ui/neo-input';
import { UserPlus, Trash2, ShieldCheck, Mail } from 'lucide-react';
import { useState } from 'react';

export default function UsersPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const utils = trpc.useUtils();

  // 1. Fetch Users from DB
  const { data: users, isLoading } = trpc.user.getAll.useQuery();

  // 2. Create User Mutation
  const createUser = trpc.user.create.useMutation({
    onSuccess: () => {
      utils.user.getAll.invalidate();
      setName('');
      setEmail('');
      alert('User Created!'); // Add this to be 100% sure
    },
    onError: (err) => {
      // This will show you exactly what is wrong (e.g., "Email is invalid")
      console.error('Mutation Error:', err);
      alert('Error: ' + err.message);
    },
  });

  // 3. Delete User Mutation
  const deleteUser = trpc.user.delete.useMutation({
    onSuccess: () => utils.user.getAll.invalidate(),
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h1 className="text-2xl font-black text-slate-700 uppercase tracking-tighter">
          Users <span className="text-accent">Directory</span>
        </h1>

        {/* Create Form */}
        <div className="flex gap-4 w-full md:w-auto">
          <NeoInput
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <NeoInput placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <NeoButton
            onClick={() => {
              console.log('Attempting to send:', { name, email, role: 'student' });
              createUser.mutate({ name, email, role: 'student' });
            }}
          >
            <UserPlus size={20} />
          </NeoButton>
          {createUser.error && (
            <p className="text-red-500 text-xs mt-2">{createUser.error.message}</p>
          )}
        </div>
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          <p className="text-slate-400 font-bold animate-pulse">Accessing Database...</p>
        ) : (
          users?.map((user) => (
            <NeoCard key={user._id} className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="h-14 w-14 rounded-2xl shadow-neo-in flex items-center justify-center text-accent">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h3 className="font-black text-slate-700">{user.name}</h3>
                  <p className="text-sm text-slate-400 flex items-center gap-2">
                    <Mail size={14} /> {user.email}
                  </p>
                </div>
              </div>

              <button
                onClick={() => deleteUser.mutate(user._id)}
                className="p-3 rounded-xl text-slate-300 hover:text-red-500 hover:shadow-neo-out active:shadow-neo-in transition-all"
              >
                <Trash2 size={20} />
              </button>
            </NeoCard>
          ))
        )}
      </div>
    </div>
  );
}
