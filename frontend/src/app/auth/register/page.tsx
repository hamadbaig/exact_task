
'use client';

import api from '@/lib/api';
import { setToken } from '@/lib/auth';
import { Lock, Mail, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      const res = await api.post('/auth/login', {
        email: form.email,
        password: form.password,
      });
      setToken(res.data.access_token);
      router.push('/dashboard');
    } catch (err: unknown) {
      const errorMsg =
        err && typeof err === 'object' && err !== null && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
      setError(errorMsg || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-900 via-slate-800 to-cyan-800 text-white px-4 py-10">
      <div className="max-w-xl mx-auto">
        <h2 className="text-4xl font-bold text-cyan-300 mb-8 text-center">
          Create an Account 📝
        </h2>

        {error && (
          <div className="bg-red-500/10 text-red-400 px-4 py-2 rounded mb-6 text-sm border border-red-500/30">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm mb-1 text-cyan-200">Full Name</label>
            <div className="flex items-center bg-slate-700/60 rounded-lg px-3 py-2 border border-cyan-400/10">
              <User className="w-5 h-5 mr-2 text-cyan-300" />
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className="bg-transparent outline-none w-full text-white placeholder:text-cyan-200/60"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1 text-cyan-200">Email</label>
            <div className="flex items-center bg-slate-700/60 rounded-lg px-3 py-2 border border-cyan-400/10">
              <Mail className="w-5 h-5 mr-2 text-cyan-300" />
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="bg-transparent outline-none w-full text-white placeholder:text-cyan-200/60"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1 text-cyan-200">Password</label>
            <div className="flex items-center bg-slate-700/60 rounded-lg px-3 py-2 border border-cyan-400/10">
              <Lock className="w-5 h-5 mr-2 text-cyan-300" />
              <input
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="bg-transparent outline-none w-full text-white placeholder:text-cyan-200/60"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold py-2 rounded-lg transition duration-150"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-8 text-sm text-center text-cyan-100">
          Already have an account?{' '}
          <a href="/auth/login" className="underline hover:text-cyan-300">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
