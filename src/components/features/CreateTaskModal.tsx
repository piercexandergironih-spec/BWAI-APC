"use client";

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { createTask } from '@/lib/actions';

interface Props {
  defaultEventId?: string;
  autoOpen?: boolean;
}

export function CreateTaskModal({ defaultEventId, autoOpen }: Props = {}) {
  const [isOpen, setIsOpen] = useState(autoOpen || false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (autoOpen) {
      setIsOpen(true);
    }
  }, [autoOpen]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      await createTask(formData);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to create task');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<button className="brutalist-button flex items-center gap-2"><Plus className="w-5 h-5" /> New Task</button>} />
      <DialogContent className="sm:max-w-md bg-card !border-2 p-6 rounded-none shadow-[8px_8px_0px_0px_oklch(0.12_0_0)] dark:shadow-[8px_8px_0px_0px_oklch(0.95_0_0)] border-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-tight">Create New Task</DialogTitle>
          <DialogDescription>Add a new actionable item.</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
          {defaultEventId && <input type="hidden" name="relatedEventId" value={defaultEventId} />}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="taskName">Task Name</label>
            <input required id="taskName" name="taskName" className="p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Order Catering" />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="status">Status</label>
              <select required id="status" name="status" className="p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary">
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="priority">Priority</label>
              <select required id="priority" name="priority" className="p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="dueDate">Due Date</label>
              <input type="date" id="dueDate" name="dueDate" className="p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="ownerName">Owner Name</label>
              <input id="ownerName" name="ownerName" className="p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary" placeholder="Bob" />
            </div>
          </div>

          <DialogFooter className="mt-6 bg-transparent border-t-0 -mx-0 -mb-0 p-0">
            <DialogClose render={<button type="button" className="px-4 py-2 text-sm font-bold uppercase hover:bg-muted border-2 border-transparent">Cancel</button>} />
            <button type="submit" disabled={loading} className="brutalist-button disabled:opacity-50">
              {loading ? 'Saving...' : 'Create Task'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
