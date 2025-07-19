'use client';

import api from '@/lib/api';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated?: () => void;
}

export default function TaskModal({ isOpen, onClose, onTaskCreated }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get('/users');
      setUsers(res.data);
    };
    if (isOpen) fetchUsers();
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await api.post('/tasks', { title, description, assignedTo });
      setTitle('');
      setDescription('');
      setAssignedTo('');
      onTaskCreated?.();
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white/10 backdrop-blur p-6 text-left align-middle shadow-xl transition-all border border-white/20">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-xl font-bold text-white">
                    Create New Task
                  </Dialog.Title>
                  <button onClick={onClose} className="text-white hover:text-red-400">
                    <X />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-white/80">Title</label>
                    <input
                      className="w-full p-2 bg-white/20 rounded text-white outline-none placeholder:text-white/60"
                      placeholder="Task title"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-white/80">Description</label>
                    <textarea
                      className="w-full p-2 bg-white/20 rounded text-white outline-none placeholder:text-white/60"
                      rows={3}
                      placeholder="Task details..."
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-white/80">Assign To</label>
                    <select
                      className="w-full p-2 bg-white/20 rounded text-white outline-none"
                      value={assignedTo}
                      onChange={e => setAssignedTo(e.target.value)}
                    >
                      <option value="" disabled>
                        Select user
                      </option>
                      {users.map(user => (
                        <option key={user.id} value={user.id} className="bg-white text-black">
                          {user.name} ({user.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-white text-indigo-600 font-semibold py-2 rounded hover:bg-indigo-100 transition"
                  >
                    {loading ? 'Creating...' : 'Create Task'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
