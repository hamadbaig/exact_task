// 'use client';

// import TaskModal from '@/components/createTaskModal';
// import { useAuth } from '@/context/auth-context';
// import api from '@/lib/api';
// import { getToken } from '@/lib/auth';
// import { initSocket } from '@/lib/socket';
// import { formatDistanceToNow } from 'date-fns';
// import { motion } from 'framer-motion';
// import { LayoutDashboard, ListTodo, LogOut } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   status: string;
//   createdAt: string;
//   assignedTo: {
//     name: string;
//     email: string;
//   };
// }

// export default function Dashboard() {
//     const { user, logout } = useAuth();
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     if (!getToken()) router.push('/auth/login');

//     const fetchTasks = async () => {
//       try {
//         const res = await api.get('/tasks', {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         setTasks(res.data);
//       } catch (error) {
//         console.error('Failed to fetch tasks:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTasks();

//     const socket = initSocket();
//     socket.on('taskUpdate', (task: Task) => {
//       setTasks(prev => [task, ...prev]);
//     });

//     return () => {
//       socket.off('taskUpdate');
//     };

//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex">
//       {/* Sidebar */}
//       <aside className="w-64 p-6 text-white bg-white/10 backdrop-blur-md border-r border-white/20 hidden md:block">
//         <h2 className="text-2xl font-bold mb-8">Task Manager</h2>
//         <nav className="space-y-4">
//           <a
//             href="/dashboard"
//             className="flex items-center gap-2 text-white/80 hover:text-white transition"
//           >
//             <LayoutDashboard size={20} /> Dashboard
//           </a>
//           <a
//             href="/tasks"
//             className="flex items-center gap-2 text-white/80 hover:text-white transition"
//           >
//             <ListTodo size={20} /> Tasks
//           </a>
//           <button
//             onClick={() => logout()}
//             className="flex items-center gap-2 text-red-300 hover:text-red-500 mt-10"
//           >
//             <LogOut size={20} /> Logout
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-y-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-5xl mx-auto"
//         >
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-3xl text-white font-bold">Welcome {user?.name}</h1>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="bg-white text-indigo-600 px-4 py-2 cursor-pointer rounded-lg font-semibold hover:bg-indigo-100 transition"
//             >
//               + Add Task
//             </button>
//           </div>

//           <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

//           {loading ? (
//             <p className="text-white text-center">Loading tasks...</p>
//           ) : tasks.length === 0 ? (
//             <p className="text-white text-center">No tasks available.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {tasks.map(task => (
//                 <div
//                   key={task.id}
//                   className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl text-white shadow-xl"
//                 >
//                   <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
//                   <p className="text-sm mb-2 text-white/80">{task.description}</p>
//                   <div className="text-sm text-white/60">
//                     Assigned to: {task.assignedTo.name} <br />
//                     Created: {formatDistanceToNow(new Date(task.createdAt))} ago
//                   </div>
//                   <span
//                     className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium bg-$
//                       {task.status === 'pending' ? 'yellow' : 'green'}-500/30 text-$
//                       {task.status === 'pending' ? 'yellow' : 'green'}-200`}
//                   >
//                     {task.status.toUpperCase()}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </motion.div>
//       </main>
//     </div>
//   );
// }
'use client';

import TaskModal from '@/components/createTaskModal';
import { useAuth } from '@/context/auth-context';
import api from '@/lib/api';
import { getToken } from '@/lib/auth';
import { initSocket } from '@/lib/socket';
import { formatDistanceToNow } from 'date-fns';
import { LayoutDashboard, ListTodo, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  assignedTo: {
    name: string;
    email: string;
  };
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!getToken()) router.push('/auth/login');

    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks', {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setTasks(res.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();

    const socket = initSocket();
    socket.on('taskUpdate', (task: Task) => {
      setTasks(prev => [task, ...prev]);
    });

    return () => {
      socket.off('taskUpdate');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-900 via-slate-800 to-cyan-800 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 p-6 bg-slate-800 border-r border-cyan-700 hidden md:block">
        <h2 className="text-2xl font-bold mb-8 text-cyan-300">Task Manager</h2>
        <nav className="space-y-4">
          <a
            href="/dashboard"
            className="flex items-center gap-2 text-cyan-100 hover:text-white transition"
          >
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a
            href="/tasks"
            className="flex items-center gap-2 text-cyan-100 hover:text-white transition"
          >
            <ListTodo size={20} /> Tasks
          </a>
          <button
            onClick={() => logout()}
            className="flex items-center gap-2 text-red-400 hover:text-red-600 mt-10"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-cyan-100">
              Welcome {user?.name}
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-cyan-500 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition"
            >
              + Add Task
            </button>
          </div>

          <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

          {loading ? (
            <p className="text-white text-center">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-white text-center">No tasks available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className="bg-slate-700 border border-cyan-700 p-5 rounded-xl text-white shadow-md"
                >
                  <h2 className="text-xl font-semibold mb-2 text-cyan-200">{task.title}</h2>
                  <p className="text-sm mb-2 text-white/80">{task.description}</p>
                  <div className="text-sm text-cyan-100">
                    Assigned to: {task.assignedTo.name} <br />
                    Created: {formatDistanceToNow(new Date(task.createdAt))} ago
                  </div>
                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${task.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-green-500/20 text-green-300'
                      }`}
                  >
                    {task.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
