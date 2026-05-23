import { DATABASE_IDS } from './notion';
import { parseTitle, parseText, parseSelect, parseDate, parseEmail, parseRelation } from './notion-helpers';
import type { OrgEvent, EventStatus, Task, TaskStatus, TaskPriority, MeetingNote } from '@/types';
import { isBefore, isSameDay, startOfDay, addDays } from 'date-fns';

const NOTION_API_URL = 'https://api.notion.com/v1';
const HEADERS = {
  'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json',
};

export async function getEvents(): Promise<OrgEvent[]> {
  if (!DATABASE_IDS.events) return [];
  
  const res = await fetch(`${NOTION_API_URL}/databases/${DATABASE_IDS.events}/query`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      sorts: [{ property: 'Event Date', direction: 'ascending' }],
    }),
    next: { revalidate: 0 } // no-cache for operations prototype
  });

  if (!res.ok) {
    console.error('Failed to fetch events:', await res.text());
    return [];
  }

  const data = await res.json();
  return data.results.map((page: any) => {
    const props = page.properties;
    return {
      id: page.id,
      title: parseTitle(props['Title']),
      description: parseText(props['Description']),
      status: (parseSelect(props['Status']) as EventStatus) || 'Planning',
      eventDate: parseDate(props['Event Date']),
      startDate: parseDate(props['Start Date']),
      endDate: parseDate(props['End Date']),
      leadName: parseText(props['Lead Name']),
      leadEmail: parseEmail(props['Lead Email']),
    };
  });
}

export async function getTasks(): Promise<Task[]> {
  if (!DATABASE_IDS.tasks) return [];

  const res = await fetch(`${NOTION_API_URL}/databases/${DATABASE_IDS.tasks}/query`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      sorts: [{ property: 'Due Date', direction: 'ascending' }],
    }),
    next: { revalidate: 0 }
  });

  if (!res.ok) {
    console.error('Failed to fetch tasks:', await res.text());
    return [];
  }

  const data = await res.json();
  const today = startOfDay(new Date());

  return data.results.map((page: any) => {
    const props = page.properties;
    const dueDateStr = parseDate(props['Due Date']);
    const status = (parseSelect(props['Status']) as TaskStatus) || 'To Do';
    
    let isOverdue = false;
    let isDueToday = false;
    let isDueThisWeek = false;

    if (dueDateStr) {
      const dueDate = startOfDay(new Date(dueDateStr));
      isOverdue = isBefore(dueDate, today) && status !== 'Done';
      isDueToday = isSameDay(dueDate, today) && status !== 'Done';
      isDueThisWeek = !isOverdue && isBefore(dueDate, addDays(today, 7)) && status !== 'Done';
    }

    return {
      id: page.id,
      taskName: parseTitle(props['Task Name']),
      relatedEventId: parseRelation(props['Related Event']),
      ownerName: parseText(props['Owner Name']),
      ownerEmail: parseEmail(props['Owner Email']),
      status,
      priority: (parseSelect(props['Priority']) as TaskPriority) || 'Low',
      dueDate: dueDateStr,
      isOverdue,
      isDueToday,
      isDueThisWeek,
    };
  });
}

export async function getNotes(): Promise<MeetingNote[]> {
  if (!DATABASE_IDS.notes) return [];

  const res = await fetch(`${NOTION_API_URL}/databases/${DATABASE_IDS.notes}/query`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      sorts: [{ property: 'Date', direction: 'descending' }],
    }),
    next: { revalidate: 0 }
  });

  if (!res.ok) {
    console.error('Failed to fetch notes:', await res.text());
    return [];
  }

  const data = await res.json();
  return data.results.map((page: any) => {
    const props = page.properties;
    return {
      id: page.id,
      title: parseTitle(props['Title']),
      relatedEventId: parseRelation(props['Related Event']),
      notes: parseText(props['Notes']),
      actionItems: parseText(props['Action Items']),
      authorName: parseText(props['Author Name']),
      date: parseDate(props['Date']),
    };
  });
}

export async function getEvent(id: string): Promise<OrgEvent | null> {
  console.log('getEvent called with ID:', id);
  const res = await fetch(`${NOTION_API_URL}/pages/${id}`, {
    method: 'GET',
    headers: HEADERS,
    next: { revalidate: 0 }
  });

  if (!res.ok) {
    console.error('getEvent error response:', res.status, await res.text());
    return null;
  }

  const page = await res.json();
  const props = page.properties;
  console.log('getEvent properties:', JSON.stringify(props));
  
  try {
    return {
      id: page.id,
      title: parseTitle(props['Title']),
      description: parseText(props['Description']),
      status: (parseSelect(props['Status']) as EventStatus) || 'Planning',
      eventDate: parseDate(props['Event Date']),
      startDate: parseDate(props['Start Date']),
      endDate: parseDate(props['End Date']),
      leadName: parseText(props['Lead Name']),
      leadEmail: parseEmail(props['Lead Email']),
    };
  } catch (err) {
    console.error('getEvent parsing error:', err);
    return null;
  }
}

export async function getNote(id: string): Promise<MeetingNote | null> {
  console.log('getNote called with ID:', id);
  const res = await fetch(`${NOTION_API_URL}/pages/${id}`, {
    method: 'GET',
    headers: HEADERS,
    next: { revalidate: 0 }
  });

  if (!res.ok) {
    console.error('getNote error response:', res.status, await res.text());
    return null;
  }

  const page = await res.json();
  const props = page.properties;
  
  try {
    return {
      id: page.id,
      title: parseTitle(props['Title']),
      relatedEventId: parseRelation(props['Related Event']),
      notes: parseText(props['Notes']),
      actionItems: parseText(props['Action Items']),
      authorName: parseText(props['Author Name']),
      date: parseDate(props['Date']),
    };
  } catch (err) {
    console.error('getNote parsing error:', err);
    return null;
  }
}
