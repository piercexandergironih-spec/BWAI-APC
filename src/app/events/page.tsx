import { getEvents } from '@/lib/api';
import { Calendar, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { CreateEventModal } from '@/components/features/CreateEventModal';

import Link from 'next/link';

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Events"
        description="Manage and track all organizational events."
        icon={<Calendar className="w-8 h-8" />}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Events' }]}
        action={<CreateEventModal />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <div className="col-span-full p-12 brutalist-card flex items-center justify-center text-muted-foreground font-mono">
            No events found. Create one to get started.
          </div>
        ) : (
          events.map(event => (
            <Link href={`/events/${event.id}`} key={event.id} className="brutalist-card p-6 flex flex-col gap-4 block hover:-translate-y-2 transition-transform cursor-pointer">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="border-2 border-foreground rounded-none uppercase font-bold tracking-tight">
                  {event.status}
                </Badge>
                <span className="text-xs font-mono font-bold">{event.eventDate || 'TBD'}</span>
              </div>
              <div>
                <h3 className="text-2xl font-heading font-bold">{event.title || 'Untitled Event'}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{event.description || 'No description provided.'}</p>
              </div>
              <div className="mt-auto pt-4 border-t-2 border-foreground flex justify-between items-center text-sm font-mono">
                <span>Lead: {event.leadName || 'Unassigned'}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
