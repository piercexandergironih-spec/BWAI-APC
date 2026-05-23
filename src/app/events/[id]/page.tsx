import { getEvent, getTasks, getNotes } from '@/lib/api';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { Calendar, FileText, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TaskStatusSelect } from '@/components/features/TaskStatusSelect';
import { EditEventModal } from '@/components/features/EditEventModal';
import { CreateTaskModal } from '@/components/features/CreateTaskModal';
import { AiTaskSuggesterModal } from '@/components/features/AiTaskSuggesterModal';
import { EditTaskModal } from '@/components/features/EditTaskModal';
import { NoteDetailModal } from '@/components/features/NoteDetailModal';
import Link from 'next/link';

interface Props {
  params: { id: string };
  searchParams: { newTask?: string; suggestTasks?: string };
}

export default async function EventDetailPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const autoOpenTaskModal = resolvedSearchParams.newTask === 'true';
  const autoOpenAiModal = resolvedSearchParams.suggestTasks === 'true';
  const [event, allTasks, allNotes] = await Promise.all([
    getEvent(resolvedParams.id),
    getTasks(),
    getNotes()
  ]);

  if (!event) {
    notFound();
  }

  const relatedTasks = allTasks.filter(t => t.relatedEventId === event.id);
  const relatedNotes = allNotes.filter(n => n.relatedEventId === event.id);

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

          {/* Related Notes */}
          <div className="brutalist-card p-6 bg-card text-card-foreground">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold uppercase tracking-widest text-muted-foreground text-sm">Meeting Notes</h3>
              <Link href="/notes" className="text-xs font-bold uppercase tracking-widest border-2 border-foreground px-3 py-1.5 hover:bg-muted transition-colors flex items-center gap-1">
                <Plus className="w-3 h-3" /> Note
              </Link>
            </div>
            
            {relatedNotes.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground font-mono bg-muted/50 border-2 border-foreground border-dashed">
                No meeting notes for this event yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedNotes.map(note => (
                  <NoteDetailModal key={note.id} note={note} eventTitle={event.title}>
                    <button type="button" className="border-2 border-foreground p-4 flex flex-col gap-3 group hover:-translate-y-1 transition-transform cursor-pointer bg-background text-left w-full">
                      <div className="flex justify-between items-start w-full">
                        <h4 className="font-bold group-hover:text-primary transition-colors line-clamp-1 flex-1">{note.title || 'Untitled'}</h4>
                        <FileText className="w-4 h-4 text-muted-foreground shrink-0 ml-2" />
                      </div>
                      <div className="text-xs text-muted-foreground line-clamp-2 leading-relaxed w-full">
                        {note.notes || 'No content...'}
                      </div>
                      <div className="flex justify-between items-center mt-auto pt-2 w-full">
                        <span className="text-[10px] font-mono font-bold bg-muted px-2 py-0.5 border border-foreground/20">
                          {note.date || 'No Date'}
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          {note.authorName}
                        </span>
                      </div>
                    </button>
                  </NoteDetailModal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
