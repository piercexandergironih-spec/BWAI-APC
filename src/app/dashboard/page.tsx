import { MetricCard } from '@/components/dashboard/MetricCard';
import { Calendar, AlertCircle, Clock, FileText, Activity, CheckSquare, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { getEvents, getTasks, getNotes } from '@/lib/api';
import { PageHeader } from '@/components/layout/PageHeader';

export default async function DashboardPage() {
  const [events, tasks, notes] = await Promise.all([
    getEvents(),
    getTasks(),
    getNotes()
  ]);

  const activeEvents = events.filter(e => e.status === 'Active').length;
  const upcomingEvents = events.filter(e => e.status === 'Planning').length;
  
  const overdueTasks = tasks.filter(t => t.isOverdue);
  const tasksDueToday = tasks.filter(t => t.isDueToday);
  
  // Show up to 5 urgent tasks (overdue or due today)
  const urgentTasks = [...overdueTasks, ...tasksDueToday].slice(0, 5);
  // Show 5 most recent notes
  const recentNotes = notes.slice(0, 5);

  return (
    <div className="flex flex-col gap-10">
      <PageHeader 
        title="Dashboard"
        description="Your operational overview for the week."
        icon={<LayoutDashboard className="w-8 h-8" />}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard 
          title="Total Events" 
          value={events.length} 
          icon={Calendar} 
        />
        <MetricCard 
          title="Active Events" 
          value={activeEvents} 
          icon={Activity} 
          intent="info"
        />
        <MetricCard 
          title="Upcoming Events" 
          value={upcomingEvents} 
          icon={Calendar} 
          intent="warning"
        />
        <MetricCard 
          title="Overdue Tasks" 
          value={overdueTasks.length} 
          icon={AlertCircle} 
          intent="danger"
        />
        <MetricCard 
          title="Tasks Due Today" 
          value={tasksDueToday.length} 
          icon={Clock} 
          intent={tasksDueToday.length > 0 ? "warning" : "default"}
        />
        <MetricCard 
          title="Total Meeting Notes" 
          value={notes.length} 
          icon={FileText} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Urgent Tasks Panel */}
        <div className="brutalist-card p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b-2 border-foreground pb-4">
            <h2 className="text-2xl font-heading font-bold uppercase flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-destructive" /> Action Required
            </h2>
            <Link href="/tasks" className="text-sm font-bold hover:underline decoration-2 underline-offset-4">View All →</Link>
          </div>
          
          <div className="flex flex-col gap-0">
            {urgentTasks.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground font-mono">No urgent tasks. You're all caught up!</div>
            ) : (
              urgentTasks.map(task => (
                <div key={task.id} className={`task-row flex items-center justify-between ${task.isOverdue ? 'border-l-4 border-l-destructive bg-destructive/5' : ''}`}>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">{task.taskName}</span>
                    <div className="flex gap-2 text-xs font-mono">
                      <span className={task.isOverdue ? 'text-destructive font-bold' : 'text-warning font-bold'}>
                        {task.dueDate || 'No Date'}
                      </span>
                      <span className="text-muted-foreground">• {task.priority} Priority</span>
                    </div>
                  </div>
                  <Badge variant={task.status === 'To Do' ? 'secondary' : 'default'} className="border-2 border-foreground rounded-none uppercase font-bold tracking-tight">
                    {task.status}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Notes Panel */}
        <div className="brutalist-card p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b-2 border-foreground pb-4">
            <h2 className="text-2xl font-heading font-bold uppercase flex items-center gap-2">
              <FileText className="w-6 h-6" /> Recent Notes
            </h2>
            <Link href="/notes" className="text-sm font-bold hover:underline decoration-2 underline-offset-4">View All →</Link>
          </div>
          
          <div className="flex flex-col gap-0">
            {recentNotes.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground font-mono">No meeting notes found.</div>
            ) : (
              recentNotes.map(note => (
                <Link key={note.id} href={`/notes/${note.id}`} className="task-row flex flex-col gap-1 group">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold group-hover:text-primary transition-colors">{note.title || 'Untitled Note'}</span>
                    <span className="text-xs font-mono px-2 py-1 bg-muted border border-foreground">{note.date || 'No Date'}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{note.authorName || 'Unknown Author'}</span>
                </Link>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
