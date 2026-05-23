import { Client } from '@notionhq/client';

if (!process.env.NOTION_TOKEN) {
  console.warn("NOTION_TOKEN is not set in environment variables.");
}

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const DATABASE_IDS = {
  events: process.env.NOTION_EVENTS_DB_ID || '',
  tasks: process.env.NOTION_TASKS_DB_ID || '',
  notes: process.env.NOTION_NOTES_DB_ID || '',
};
