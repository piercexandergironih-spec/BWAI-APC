"use client";

import { useState, useEffect } from 'react';
import { Sparkles, Loader2, Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { suggestTasks, bulkCreateTasks } from '@/lib/actions';
import type { OrgEvent } from '@/types';
import { useRouter, usePathname } from 'next/navigation';

interface Props {
  event: OrgEvent;
  autoOpen?: boolean;
}

export function AiTaskSuggesterModal({ event, autoOpen }: Props) {
  const [isOpen, setIsOpen] = useState(autoOpen || false);
  const [isThinking, setIsThinking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [tasks, setTasks] = useState<{ id: string; text: string; dueDate: string; priority: string; selected: boolean }[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (autoOpen) {
      setIsOpen(true);
      generateTasks();
    }
  }, [autoOpen]);

  async function generateTasks() {
    setIsThinking(true);
    try {
      const suggestions = await suggestTasks(event.title, event.description, event.eventDate || undefined);
      setTasks(suggestions.map((t, i) => ({ id: i.toString(), text: t.text, dueDate: t.dueDate, priority: t.priority, selected: true })));
    } catch (err) {
      console.error(err);
    } finally {
      setIsThinking(false);
    }
  }

  function toggleTask(id: string) {
    setTasks(tasks.map(t => t.id === id ? { ...t, selected: !t.selected } : t));
  }

  function removeTask(id: string) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  function addTask() {
    if (!newTaskText.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text: newTaskText, dueDate: event.eventDate || '', priority: 'Medium', selected: true }]);
    setNewTaskText('');
  }

  async function handleApprove() {
    const selectedTasks = tasks.filter(t => t.selected).map(t => ({ text: t.text, dueDate: t.dueDate, priority: t.priority }));
    if (selectedTasks.length === 0) {
      setIsOpen(false);
      return;
    }

    setIsSaving(true);
    try {
      await bulkCreateTasks(event.id, selectedTasks);
      setIsOpen(false);
      // Remove query param to clean URL
      router.replace(pathname);
    } catch (err) {
      console.error(err);
      alert('Failed to save tasks');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<button className="brutalist-button flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground"><Sparkles className="w-4 h-4" /> AI Tasks</button>} />
      <DialogContent className="sm:max-w-xl bg-card !border-2 p-6 rounded-none shadow-[8px_8px_0px_0px_oklch(0.12_0_0)] dark:shadow-[8px_8px_0px_0px_oklch(0.95_0_0)] border-foreground max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            AI Task Suggestions
          </DialogTitle>
          <DialogDescription>Let AI read your event details and draft the necessary action items.</DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 mt-4 min-h-[200px]">
          {isThinking ? (
            <div className="flex flex-col items-center justify-center flex-1 gap-4 text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="font-mono text-sm uppercase tracking-widest font-bold">Analyzing Event Data...</p>
            </div>
          ) : tasks.length === 0 ? (
             <div className="flex flex-col items-center justify-center flex-1 gap-4 text-muted-foreground p-8 bg-muted/50 border-2 border-dashed border-foreground">
              <p className="font-mono text-sm uppercase tracking-widest text-center">No tasks generated yet. Ensure you have a Gemini API Key in Settings.</p>
              <button onClick={generateTasks} className="brutalist-button px-4 py-2 text-xs">Try Again</button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <h4 className="font-bold uppercase tracking-widest text-xs text-muted-foreground mb-2">Review Suggested Tasks</h4>
              {tasks.map(task => (
                <div key={task.id} className={`flex flex-col gap-2 p-3 border-2 transition-colors ${task.selected ? 'border-foreground bg-background' : 'border-muted bg-muted/50 text-muted-foreground opacity-50'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={task.selected} 
                      onChange={() => toggleTask(task.id)}
                      className="w-5 h-5 border-2 border-foreground rounded-none accent-primary shrink-0"
                    />
                    <input 
                      type="text" 
                      value={task.text}
                      onChange={(e) => setTasks(tasks.map(t => t.id === task.id ? { ...t, text: e.target.value } : t))}
                      className="flex-1 bg-transparent outline-none font-bold text-sm"
                    />
                    <button onClick={() => removeTask(task.id)} className="text-destructive hover:bg-destructive/10 p-1 shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 pl-8">
                    <input 
                      type="date"
                      value={task.dueDate}
                      onChange={(e) => setTasks(tasks.map(t => t.id === task.id ? { ...t, dueDate: e.target.value } : t))}
                      className="text-xs p-1 border-2 border-foreground/20 bg-background outline-none focus:border-primary font-mono"
                    />
                    <select
                      value={task.priority}
                      onChange={(e) => setTasks(tasks.map(t => t.id === task.id ? { ...t, priority: e.target.value } : t))}
                      className="text-xs p-1 border-2 border-foreground/20 bg-background outline-none focus:border-primary font-bold uppercase tracking-wider"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
              ))}

              <div className="flex gap-2 mt-2">
                <input 
                  type="text" 
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTask()}
                  placeholder="Add a custom task..."
                  className="flex-1 p-2 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <button onClick={addTask} className="brutalist-button px-4 py-2 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-6 bg-transparent border-t-0 -mx-0 -mb-0 p-0 flex justify-between sm:justify-between items-center">
          <button onClick={generateTasks} disabled={isThinking || isSaving} className="text-xs font-bold uppercase tracking-widest hover:underline text-muted-foreground">
            Regenerate
          </button>
          <div className="flex gap-2">
            <DialogClose render={<button type="button" className="px-4 py-2 text-sm font-bold uppercase hover:bg-muted border-2 border-transparent">Cancel</button>} />
            <button onClick={handleApprove} disabled={isThinking || isSaving || tasks.length === 0} className="brutalist-button disabled:opacity-50 flex items-center gap-2 bg-primary text-primary-foreground border-primary-foreground/20">
              {isSaving ? 'Saving...' : 'Approve & Save Tasks'}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
