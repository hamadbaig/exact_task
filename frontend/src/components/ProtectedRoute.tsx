'use client';

import { getCurrentUser } from '@/lib/user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: 'admin' | 'user';
}) {
  const router = useRouter();

  useEffect(() => {
    const user = getCurrentUser();

    if (!user) {
      router.push('/auth/login');
    } else if (role && user.role !== role) {
      router.push('/unauthorized');
    }
  }, [router, role]);

  return <>{children}</>;
}
