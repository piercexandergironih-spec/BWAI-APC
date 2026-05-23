"use server";

import { revalidatePath } from "next/cache";
import { DATABASE_IDS } from "./notion";
import { GoogleGenAI } from '@google/genai';

const NOTION_API_URL = 'https://api.notion.com/v1';

async function fetchNotion(endpoint: string, options: RequestInit) {
  const res = await fetch(`${NOTION_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  
  if (!res.ok) {
    const error = await res.text();
    console.error(`Notion API Error (${endpoint}):`, error);
    throw new Error(`Failed to communicate with Notion API`);
  }
  
  return res.json();
}

function richText(content: string) {
  return [{ text: { content } }];
}

export async function createEvent(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const status = formData.get('status') as string;
  const eventDate = formData.get('eventDate') as string;
  const leadName = formData.get('leadName') as string;
  const leadEmail = formData.get('leadEmail') as string;

  const properties: any = {
    'Title': { title: richText(title) },
    'Status': { select: { name: status } }
  };

  if (description) properties['Description'] = { rich_text: richText(description) };
  if (eventDate) properties['Event Date'] = { date: { start: eventDate } };
  if (leadName) properties['Lead Name'] = { rich_text: richText(leadName) };
  if (leadEmail) properties['Lead Email'] = { email: leadEmail };

  const res = await fetchNotion('/pages', {
    method: 'POST',
    body: JSON.stringify({
      parent: { database_id: DATABASE_IDS.events },
      properties
    })
  });

  revalidatePath('/events');
  revalidatePath('/dashboard');

  return { id: res.id };
}

export async function updateEvent(eventId: string, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const status = formData.get('status') as string;
  const eventDate = formData.get('eventDate') as string;
  const leadName = formData.get('leadName') as string;
  const leadEmail = formData.get('leadEmail') as string;

  const properties: any = {};

  if (title) properties['Title'] = { title: richText(title) };
  if (status) properties['Status'] = { select: { name: status } };
  if (description) properties['Description'] = { rich_text: richText(description) };
  if (eventDate) properties['Event Date'] = { date: { start: eventDate } };
  if (leadName) properties['Lead Name'] = { rich_text: richText(leadName) };
  if (leadEmail) properties['Lead Email'] = { email: leadEmail };

  await fetchNotion(`/pages/${eventId}`, {
    method: 'PATCH',
    body: JSON.stringify({ properties })
  });

  revalidatePath('/events');
  revalidatePath(`/events/${eventId}`);
  revalidatePath('/dashboard');
}

export async function deleteEvent(eventId: string) {
  await fetchNotion(`/pages/${eventId}`, {
    method: 'PATCH',
    body: JSON.stringify({ archived: true })
  });

  revalidatePath('/events');
  revalidatePath('/dashboard');
}

export async function createTask(formData: FormData) {
  const taskName = formData.get('taskName') as string;
  const ownerName = formData.get('ownerName') as string;
  const status = formData.get('status') as string;
  const priority = formData.get('priority') as string;
  const dueDate = formData.get('dueDate') as string;
  const relatedEventId = formData.get('relatedEventId') as string;

  const properties: any = {
    'Task Name': { title: richText(taskName) },
    'Status': { select: { name: status } },
    'Priority': { select: { name: priority } }
  };

  if (ownerName) properties['Owner Name'] = { rich_text: richText(ownerName) };
  if (dueDate) properties['Due Date'] = { date: { start: dueDate } };
  if (relatedEventId) properties['Related Event'] = { relation: [{ id: relatedEventId }] };

  await fetchNotion('/pages', {
    method: 'POST',
    body: JSON.stringify({
      parent: { database_id: DATABASE_IDS.tasks },
      properties
    })
  });

  revalidatePath('/tasks');
  revalidatePath('/dashboard');
}

export async function updateTaskStatus(taskId: string, newStatus: string) {
  await fetchNotion(`/pages/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      properties: {
        'Status': { select: { name: newStatus } }
      }
    })
  });

  revalidatePath('/tasks');
  revalidatePath('/dashboard');
}

export async function updateTask(taskId: string, formData: FormData) {
  const taskName = formData.get('taskName') as string;
  const ownerName = formData.get('ownerName') as string;
  const status = formData.get('status') as string;
  const priority = formData.get('priority') as string;
  const dueDate = formData.get('dueDate') as string;

  const properties: any = {};

  if (taskName) properties['Task Name'] = { title: richText(taskName) };
  if (status) properties['Status'] = { select: { name: status } };
  if (priority) properties['Priority'] = { select: { name: priority } };
  
  if (ownerName) properties['Owner Name'] = { rich_text: richText(ownerName) };
  if (dueDate) properties['Due Date'] = { date: { start: dueDate } };

  await fetchNotion(`/pages/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({ properties })
  });

  revalidatePath('/tasks');
  revalidatePath('/dashboard');
}

export async function deleteTask(taskId: string) {
  await fetchNotion(`/pages/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({ archived: true })
  });

  revalidatePath('/tasks');
  revalidatePath('/dashboard');
}

export async function createNote(formData: FormData) {
  const title = formData.get('title') as string;
  const authorName = formData.get('authorName') as string;
  const date = formData.get('date') as string;
  const notes = formData.get('notes') as string;
  const actionItems = formData.get('actionItems') as string;

  const properties: any = {
    'Title': { title: richText(title) },
  };

  if (authorName) properties['Author Name'] = { rich_text: richText(authorName) };
  if (date) properties['Date'] = { date: { start: date } };
  if (notes) properties['Notes'] = { rich_text: richText(notes) };
  if (actionItems) properties['Action Items'] = { rich_text: richText(actionItems) };

  await fetchNotion('/pages', {
    method: 'POST',
    body: JSON.stringify({
      parent: { database_id: DATABASE_IDS.notes },
      properties
    })
  });

  revalidatePath('/notes');
  revalidatePath('/dashboard');
}

export async function suggestTasks(title: string, description: string, eventDate?: string): Promise<{ text: string, dueDate: string, priority: string }[]> {
  if (!process.env.GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY is not configured');
    return [];
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `You are an operations assistant for a student organization.
Based on the following Event Title, Description, and Event Date, generate a list of 3-6 actionable tasks required to make this event successful.
Event Title: ${title}
Event Description: ${description || 'No description provided.'}
Event Date: ${eventDate || 'TBD'}

For each task, determine a logical "dueDate" (in YYYY-MM-DD format) that is BEFORE the Event Date. If the Event Date is TBD, just provide a logical date relative to today's date (${new Date().toISOString().split('T')[0]}). Also assign a "priority" of "High", "Medium", or "Low".

Return the response STRICTLY as a JSON array of objects. Do not include markdown formatting or backticks. Just the raw JSON array. Example: 
[{"text": "Book the venue", "dueDate": "2026-05-15", "priority": "High"}]`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    let text = response.text || '[]';
    if (text.startsWith('```json')) text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    if (text.startsWith('```')) text = text.replace(/```/g, '').trim();
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Failed to generate AI tasks:', error);
    return [];
  }
}

export async function bulkCreateTasks(eventId: string, tasks: { text: string, dueDate: string, priority: string }[]) {
  for (const task of tasks) {
    const properties: any = {
      'Task Name': { title: richText(task.text) },
      'Status': { select: { name: 'To Do' } },
      'Priority': { select: { name: task.priority || 'Medium' } },
      'Related Event': { relation: [{ id: eventId }] }
    };
    
    if (task.dueDate) properties['Due Date'] = { date: { start: task.dueDate } };

    await fetchNotion('/pages', {
      method: 'POST',
      body: JSON.stringify({
        parent: { database_id: DATABASE_IDS.tasks },
        properties
      })
    });
  }

  revalidatePath('/tasks');
  revalidatePath(`/events/${eventId}`);
  revalidatePath('/dashboard');
}
