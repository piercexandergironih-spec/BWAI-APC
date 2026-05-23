"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { createEvent } from '@/lib/actions';

import { useRouter } from 'next/navigation';

export function CreateEventModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await createEvent(formData);
      setIsOpen(false);
      router.push(`/events/${res.id}?suggestTasks=true`);
    } catch (err) {
      console.error(err);
      alert('Failed to create event');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<button className="brutalist-button flex items-center gap-2"><Plus className="w-5 h-5" /> New Event</button>} />
      <DialogContent className="sm:max-w-md bg-card !border-2 p-6 rounded-none shadow-[8px_8px_0px_0px_oklch(0.12_0_0)] dark:shadow-[8px_8px_0px_0px_oklch(0.95_0_0)] border-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-tight">Create New Event</DialogTitle>
          <DialogDescription>Add a new event or project to your Notion workspace.</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="title">Event Title</label>
            <input required id="title" name="title" className="p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary" placeholder="Annual Summit 2026" />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="description">Description</label>
            <textarea id="description" name="description" className="p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary min-h-[80px]" placeholder="Brief description..." />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="status">Status</label>
              <select required id="status" name="status" className="p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary">
                <option value="Planning">Planning</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="eventDate">Date</label>
              <input type="date" id="eventDate" name="eventDate" className="p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="leadName">Lead Name</label>
              <input id="leadName" name="leadName" className="p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary" placeholder="Alice" />
            </div>
          </div>

          <DialogFooter className="mt-6 bg-transparent border-t-0 -mx-0 -mb-0 p-0">
            <DialogClose render={<button type="button" className="px-4 py-2 text-sm font-bold uppercase hover:bg-muted border-2 border-transparent">Cancel</button>} />
            <button type="submit" disabled={loading} className="brutalist-button disabled:opacity-50">
              {loading ? 'Saving...' : 'Create Event'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
