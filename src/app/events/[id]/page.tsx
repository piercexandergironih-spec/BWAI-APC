import { getEvent, getTasks } from '@/lib/api';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TaskStatusSelect } from '@/components/features/TaskStatusSelect';
import { EditEventModal } from '@/components/features/EditEventModal';
import { CreateTaskModal } from '@/components/features/CreateTaskModal';
import { AiTaskSuggesterModal } from '@/components/features/AiTaskSuggesterModal';
import { EditTaskModal } from '@/components/features/EditTaskModal';

interface Props {
  params: { id: string };
  searchParams: { newTask?: string; suggestTasks?: string };
}

export default async function EventDetailPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const autoOpenTaskModal = resolvedSearchParams.newTask === 'true';
  const autoOpenAiModal = resolvedSearchParams.suggestTasks === 'true';
  const [event, allTasks] = await Promise.all([
    getEvent(resolvedParams.id),
    getTasks()
  ]);

  if (!event) {
    notFound();
  }

  const relatedTasks = allTasks.filter(t => t.relatedEventId === event.id);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title={event.title}
        description={event.description || 'No description provided.'}
        icon={<Calendar className="w-8 h-8" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Events', href: '/events' },
          { label: 'Detail' }
        ]}
        action={<EditEventModal event={event} />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="brutalist-card p-6 bg-card text-card-foreground">
            <h3 className="font-bold uppercase tracking-widest text-muted-foreground text-sm mb-4">Event Details</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase text-muted-foreground">Status</span>
                <Badge variant="outline" className="w-fit mt-1 border-2 border-foreground rounded-none uppercase font-bold">
                  {event.status}
                </Badge>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase text-muted-foreground">Event Date</span>
                <span className="font-mono">{event.eventDate || 'TBD'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase text-muted-foreground">Lead / Organizer</span>
                <span className="font-bold">{event.leadName || 'Unassigned'}</span>
                {event.leadEmail && <span className="text-sm text-muted-foreground">{event.leadEmail}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="brutalist-card p-6 bg-card text-card-foreground">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold uppercase tracking-widest text-muted-foreground text-sm">Related Tasks</h3>
              <div className="flex gap-2">
                <AiTaskSuggesterModal event={event} autoOpen={autoOpenAiModal} />
                <CreateTaskModal defaultEventId={event.id} autoOpen={autoOpenTaskModal} />
              </div>
            </div>
            
            {relatedTasks.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground font-mono bg-muted/50 border-2 border-foreground border-dashed">
                No tasks assigned to this event yet.
              </div>
            ) : (
              <div className="flex flex-col gap-0 border-2 border-foreground bg-background">
                {relatedTasks.map(task => (
                  <div key={task.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border-b-2 border-foreground last:border-b-0 hover:bg-muted/50 gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold">{task.taskName}</span>
                      <div className="flex gap-2 text-xs font-mono">
                        <span className={task.isOverdue ? 'text-destructive font-bold' : task.isDueToday ? 'text-warning font-bold' : 'text-muted-foreground'}>
                          Due: {task.dueDate || 'TBD'}
                        </span>
                        <span className="text-muted-foreground">• {task.ownerName || 'Unassigned'}</span>
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center justify-end gap-2">
                      <TaskStatusSelect taskId={task.id} initialStatus={task.status} />
                      <EditTaskModal task={task} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
