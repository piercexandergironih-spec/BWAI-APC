"use client";

import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { FileText, Calendar, User, X } from 'lucide-react';
import type { MeetingNote } from '@/types';

export function NoteDetailModal({ note, children }: { note: MeetingNote, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={children as any} />
      <DialogContent className="sm:max-w-2xl bg-card !border-2 p-0 rounded-none shadow-[8px_8px_0px_0px_oklch(0.12_0_0)] dark:shadow-[8px_8px_0px_0px_oklch(0.95_0_0)] border-foreground max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b-2 border-foreground p-6 z-10 flex justify-between items-start">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase tracking-tight pr-8">{note.title || 'Untitled Note'}</DialogTitle>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-1 text-sm font-bold text-muted-foreground bg-muted px-2 py-1 border border-foreground/20">
                <Calendar className="w-4 h-4" />
                <span>{note.date || 'No Date'}</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                <User className="w-4 h-4" />
                <span>{note.authorName || 'Unknown'}</span>
              </div>
            </div>
          </DialogHeader>
          <DialogClose render={
            <button className="text-foreground hover:bg-muted p-2 border-2 border-transparent hover:border-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
          } />
        </div>
        
        <div className="p-6 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h4 className="font-bold uppercase tracking-widest text-xs text-muted-foreground flex items-center gap-2">
              <FileText className="w-4 h-4" /> Notes Content
            </h4>
            <div className="text-base leading-relaxed whitespace-pre-wrap font-medium">
              {note.notes || 'No notes content provided.'}
            </div>
          </div>

          {note.actionItems && (
            <div className="flex flex-col gap-3">
              <h4 className="font-bold uppercase tracking-widest text-xs text-primary flex items-center gap-2">
                Action Items
              </h4>
              <div className="text-base leading-relaxed whitespace-pre-wrap font-medium p-4 border-2 border-primary/20 bg-primary/5">
                {note.actionItems}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
