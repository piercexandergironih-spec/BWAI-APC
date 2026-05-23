import { getNotes, getEvents } from '@/lib/api';
import { FileText, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CreateNoteModal } from '@/components/features/CreateNoteModal';
import { NoteDetailModal } from '@/components/features/NoteDetailModal';

export default async function NotesPage() {
  const [notes, events] = await Promise.all([getNotes(), getEvents()]);
  
  const eventMap = new Map(events.map(e => [e.id, e.title]));

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Meeting Notes"
        description="Meeting minutes and operational documentation."
        icon={<FileText className="w-8 h-8" />}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Notes' }]}
        action={
          <CreateNoteModal />
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {notes.length === 0 ? (
          <div className="col-span-full p-12 brutalist-card flex items-center justify-center text-muted-foreground font-mono">
            No meeting notes found. Create one to get started.
          </div>
        ) : (
          notes.map(note => {
            const eventTitle = note.relatedEventId ? eventMap.get(note.relatedEventId) : undefined;
            return (
              <NoteDetailModal key={note.id} note={note} eventTitle={eventTitle}>
                <button type="button" className="brutalist-card p-6 flex flex-col gap-4 group hover:-translate-y-1 transition-transform cursor-pointer text-left h-full w-full">
                  <div className="flex justify-between items-center border-b-2 border-foreground pb-4 w-full">
                    <span className="text-xs font-mono font-bold bg-muted px-2 py-1 border border-foreground">
                      {note.date || 'No Date'}
                    </span>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      {note.authorName || 'Unknown'}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-2 w-full">
                    {eventTitle && (
                      <div className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" /> {eventTitle}
                      </div>
                    )}
                    <h3 className="text-xl font-heading font-bold group-hover:text-primary transition-colors">
                      {note.title || 'Untitled Note'}
                    </h3>
                  </div>
                  
                  <div className="mt-2 text-sm text-muted-foreground line-clamp-3 w-full">
                    {note.notes || 'No notes content provided.'}
                  </div>
                </button>
              </NoteDetailModal>
            );
          })
        )}
      </div>
    </div>
  );
}
