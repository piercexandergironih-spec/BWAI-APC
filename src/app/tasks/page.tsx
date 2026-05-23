import { getTasks } from '@/lib/api';
import { CheckSquare, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { CreateTaskModal } from '@/components/features/CreateTaskModal';
import { EditTaskModal } from '@/components/features/EditTaskModal';
import { TaskStatusSelect } from '@/components/features/TaskStatusSelect';

import Link from 'next/link';

interface Props {
  searchParams: { filter?: string };
}

export default async function TasksPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const filter = resolvedParams.filter || 'all';
  let tasks = await getTasks();

  if (filter === 'overdue') {
    tasks = tasks.filter(t => t.isOverdue);
  } else if (filter === 'today') {
    tasks = tasks.filter(t => t.isDueToday);
  } else if (filter === 'week') {
    tasks = tasks.filter(t => t.isDueThisWeek || t.isDueToday);
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Tasks"
        description="Track individual tasks, ownership, and deadlines."
        icon={<CheckSquare className="w-8 h-8" />}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Tasks' }]}
        action={<CreateTaskModal />}
      />

      <div className="flex gap-2">
        <Link href="/tasks" className={`px-4 py-2 border-2 border-foreground font-bold uppercase text-xs tracking-widest transition-colors ${filter === 'all' ? 'bg-foreground text-background' : 'bg-background hover:bg-muted'}`}>All</Link>
        <Link href="/tasks?filter=overdue" className={`px-4 py-2 border-2 border-foreground font-bold uppercase text-xs tracking-widest transition-colors ${filter === 'overdue' ? 'bg-destructive text-destructive-foreground' : 'bg-background hover:bg-muted'}`}>Overdue</Link>
        <Link href="/tasks?filter=today" className={`px-4 py-2 border-2 border-foreground font-bold uppercase text-xs tracking-widest transition-colors ${filter === 'today' ? 'bg-warning text-warning-foreground' : 'bg-background hover:bg-muted'}`}>Due Today</Link>
        <Link href="/tasks?filter=week" className={`px-4 py-2 border-2 border-foreground font-bold uppercase text-xs tracking-widest transition-colors ${filter === 'week' ? 'bg-warning text-warning-foreground' : 'bg-background hover:bg-muted'}`}>Due This Week</Link>
      </div>

      <div className="brutalist-card overflow-hidden">
        {tasks.length === 0 ? (
          <div className="p-12 flex items-center justify-center text-muted-foreground font-mono">
            No tasks found. Create one to get started.
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b-2 border-foreground bg-muted font-bold uppercase text-sm tracking-wider">
              <div className="col-span-5">Task Name</div>
              <div className="col-span-2">Owner</div>
              <div className="col-span-2">Due Date</div>
              <div className="col-span-3 text-right">Status</div>
            </div>
            
            {/* Table Body */}
            {tasks.map(task => (
              <div key={task.id} className="grid grid-cols-12 gap-4 p-4 border-b-2 border-foreground last:border-b-0 hover:bg-muted/50 transition-colors items-center">
                <div className="col-span-5 flex flex-col">
                  <span className="font-bold">{task.taskName || 'Untitled Task'}</span>
                  <span className="text-xs text-muted-foreground font-mono">Priority: {task.priority}</span>
                </div>
                <div className="col-span-2 text-sm">{task.ownerName || 'Unassigned'}</div>
                <div className="col-span-2 text-sm font-mono font-bold">
                  <span className={task.isOverdue ? 'text-destructive' : task.isDueToday ? 'text-warning' : task.isDueThisWeek ? 'text-warning/70' : ''}>
                    {task.dueDate || 'No Date'}
                  </span>
                </div>
                <div className="col-span-3 text-right flex items-center justify-end gap-2">
                  <TaskStatusSelect taskId={task.id} initialStatus={task.status} />
                  <EditTaskModal task={task} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
