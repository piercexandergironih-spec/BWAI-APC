"use client";

import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { updateTask, deleteTask } from '@/lib/actions';
import type { Task } from '@/types';

export function EditTaskModal({ task }: { task: Task }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      await updateTask(task.id, formData);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to update task');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this task? This action cannot be undone.')) return;
    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to delete task');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={
        <button className="text-muted-foreground hover:text-foreground p-1 transition-colors hover:bg-muted" title="Edit Task">
          <Pencil className="w-4 h-4" />
        </button>
      } />
      <DialogContent className="sm:max-w-md bg-card !border-2 p-6 rounded-none shadow-[8px_8px_0px_0px_oklch(0.12_0_0)] dark:shadow-[8px_8px_0px_0px_oklch(0.95_0_0)] border-foreground">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-black uppercase tracking-tight">Edit Task</DialogTitle>
              <DialogDescription>Update the details or status of this task.</DialogDescription>
            </div>
            <button 
              type="button" 
              onClick={handleDelete}
              disabled={isDeleting || loading}
              className="text-destructive hover:bg-destructive/10 p-2 border-2 border-transparent hover:border-destructive transition-colors"
              title="Delete Task"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="taskName">Task Name</label>
            <input required id="taskName" name="taskName" defaultValue={task.taskName} className="p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="status">Status</label>
              <select required id="status" name="status" defaultValue={task.status} className="p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary">
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="priority">Priority</label>
              <select required id="priority" name="priority" defaultValue={task.priority} className="p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="dueDate">Due Date</label>
              <input type="date" id="dueDate" name="dueDate" defaultValue={task.dueDate || ''} className="p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="ownerName">Owner Name</label>
              <input id="ownerName" name="ownerName" defaultValue={task.ownerName || ''} className="p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>

          <DialogFooter className="mt-6 bg-transparent border-t-0 -mx-0 -mb-0 p-0">
            <DialogClose render={<button type="button" className="px-4 py-2 text-sm font-bold uppercase hover:bg-muted border-2 border-transparent">Cancel</button>} />
            <button type="submit" disabled={loading || isDeleting} className="brutalist-button disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
