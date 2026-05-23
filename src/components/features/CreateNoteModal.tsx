"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { createNote } from '@/lib/actions';

export function CreateNoteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      await createNote(formData);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to create note');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<button className="brutalist-button flex items-center gap-2"><Plus className="w-5 h-5" /> New Note</button>} />
      <DialogContent className="sm:max-w-md bg-card !border-2 p-6 rounded-none shadow-[8px_8px_0px_0px_oklch(0.12_0_0)] dark:shadow-[8px_8px_0px_0px_oklch(0.95_0_0)] border-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-tight">Log Meeting Note</DialogTitle>
          <DialogDescription>Document a recent meeting or discussion.</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="title">Title</label>
            <input required id="title" name="title" className="p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary" placeholder="Weekly Sync" />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="date">Date</label>
              <input required type="date" id="date" name="date" defaultValue={new Date().toISOString().split('T')[0]} className="p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="authorName">Author Name</label>
              <input id="authorName" name="authorName" className="p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary" placeholder="Your name" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="notes">Meeting Notes</label>
            <textarea id="notes" name="notes" className="p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary min-h-[80px]" placeholder="What was discussed..." />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="actionItems">Action Items</label>
            <textarea id="actionItems" name="actionItems" className="p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary min-h-[60px]" placeholder="- Todo item 1" />
          </div>

          <DialogFooter className="mt-6 bg-transparent border-t-0 -mx-0 -mb-0 p-0">
            <DialogClose render={<button type="button" className="px-4 py-2 text-sm font-bold uppercase hover:bg-muted border-2 border-transparent">Cancel</button>} />
            <button type="submit" disabled={loading} className="brutalist-button disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Note'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
