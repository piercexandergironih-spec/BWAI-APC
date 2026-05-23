import { PageHeader } from '@/components/layout/PageHeader';
import { Settings as SettingsIcon, Save } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

export default async function SettingsPage() {
  const envPath = path.join(process.cwd(), '.env.local');
  let currentToken = process.env.NOTION_TOKEN || '';
  let eventsDb = process.env.NOTION_EVENTS_DB_ID || '';
  let tasksDb = process.env.NOTION_TASKS_DB_ID || '';
  let notesDb = process.env.NOTION_NOTES_DB_ID || '';
  let geminiKey = process.env.GEMINI_API_KEY || '';

  async function saveSettings(formData: FormData) {
    'use server';
    const token = formData.get('token') as string;
    const events = formData.get('events') as string;
    const tasks = formData.get('tasks') as string;
    const notes = formData.get('notes') as string;
    const gemini = formData.get('gemini') as string;

    const envContent = `NOTION_TOKEN=${token}\nNOTION_EVENTS_DB_ID=${events}\nNOTION_TASKS_DB_ID=${tasks}\nNOTION_NOTES_DB_ID=${notes}\nGEMINI_API_KEY=${gemini}\n`;
    fs.writeFileSync(path.join(process.cwd(), '.env.local'), envContent);
    
    revalidatePath('/settings');
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Settings"
        description="Configure your Notion API integration and database connections."
        icon={<SettingsIcon className="w-8 h-8" />}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Settings' }]}
      />

      <div className="brutalist-card p-8 bg-card text-card-foreground max-w-2xl">
        <form action={saveSettings} className="flex flex-col gap-6">
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="token">Notion Integration Token</label>
            <input 
              required 
              type="password"
              id="token" 
              name="token" 
              defaultValue={currentToken}
              className="p-3 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary font-mono text-sm" 
              placeholder="secret_..." 
            />
            <p className="text-xs text-muted-foreground mt-1">Get this from your Notion Integrations dashboard.</p>
          </div>

          <div className="h-[2px] w-full bg-foreground my-4 opacity-20"></div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="events">Events Database ID</label>
            <input 
              required 
              id="events" 
              name="events" 
              defaultValue={eventsDb}
              className="p-3 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary font-mono text-sm" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="tasks">Tasks Database ID</label>
            <input 
              required 
              id="tasks" 
              name="tasks" 
              defaultValue={tasksDb}
              className="p-3 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary font-mono text-sm" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="notes">Meeting Notes Database ID</label>
            <input 
              required 
              id="notes" 
              name="notes" 
              defaultValue={notesDb}
              className="p-3 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary font-mono text-sm" 
            />
          </div>

          <div className="h-[2px] w-full bg-foreground my-4 opacity-20"></div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2" htmlFor="gemini">
              Gemini API Key <span className="px-2 py-0.5 bg-primary text-primary-foreground text-[10px] rounded-full">New! AI Magic</span>
            </label>
            <input 
              type="password"
              id="gemini" 
              name="gemini" 
              defaultValue={geminiKey}
              className="p-3 border-2 border-foreground bg-background rounded-none outline-none focus:ring-2 focus:ring-primary font-mono text-sm" 
              placeholder="AIza..." 
            />
            <p className="text-xs text-muted-foreground mt-1">Required to automatically suggest tasks when creating an event.</p>
          </div>

          <div className="mt-4 p-4 border-2 border-warning bg-warning/10 text-warning-foreground font-mono text-xs font-bold uppercase">
            Note: Saving settings will write to .env.local. You must restart the Next.js server for changes to take effect.
          </div>

          <button type="submit" className="brutalist-button mt-4 flex items-center justify-center gap-2">
            <Save className="w-5 h-5" /> Save Configuration
          </button>
        </form>
      </div>
    </div>
  );
}
