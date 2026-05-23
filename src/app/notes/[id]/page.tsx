import { getNote } from '@/lib/api';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { FileText } from 'lucide-react';

interface Props {
  params: { id: string };
}

export default async function NoteDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const note = await getNote(resolvedParams.id);

  if (!note) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title={note.title}
        description={`Meeting log from ${note.date} by ${note.authorName}`}
        icon={<FileText className="w-8 h-8" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Notes', href: '/notes' },
          { label: 'Detail' }
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="brutalist-card p-8 bg-card text-card-foreground">
          <h2 className="text-2xl font-heading font-black tracking-tight mb-6 uppercase border-b-4 border-foreground pb-2">Discussion Notes</h2>
          <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
            {note.notes || 'No discussion notes recorded.'}
          </div>
        </div>

        <div className="brutalist-card p-8 bg-primary/10 border-primary text-foreground">
          <h2 className="text-2xl font-heading font-black tracking-tight mb-6 uppercase border-b-4 border-primary pb-2">Action Items</h2>
          <div className="whitespace-pre-wrap font-mono font-bold text-sm leading-relaxed text-primary">
            {note.actionItems || 'No action items recorded.'}
          </div>
        </div>
      </div>
    </div>
  );
}
