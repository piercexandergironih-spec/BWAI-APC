"use client";

import { useTransition } from 'react';
import { updateTaskStatus } from '@/lib/actions';

export function TaskStatusSelect({ taskId, initialStatus }: { taskId: string; initialStatus: string }) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    startTransition(async () => {
      try {
        await updateTaskStatus(taskId, newStatus);
      } catch (err) {
        console.error('Failed to update status', err);
        alert('Failed to update status');
      }
    });
  };

  return (
    <div className="relative inline-block">
      <select 
        value={initialStatus} 
        onChange={handleChange}
        disabled={isPending}
        className={`appearance-none font-bold uppercase text-xs tracking-tight px-3 py-1 border-2 border-foreground rounded-none outline-none focus:ring-2 focus:ring-primary cursor-pointer ${
          initialStatus === 'Done' ? 'bg-primary text-primary-foreground' : 
          initialStatus === 'In Progress' ? 'bg-warning text-warning-foreground' : 
          'bg-background text-foreground hover:bg-muted'
        } ${isPending ? 'opacity-50' : ''}`}
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Blocked">Blocked</option>
        <option value="Done">Done</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-foreground mix-blend-difference">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
}
