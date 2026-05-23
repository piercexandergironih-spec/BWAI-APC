export type EventStatus = 'Planning' | 'Active' | 'Completed' | 'Cancelled';

export interface OrgEvent {
  id: string;
  title: string;
  description: string;
  status: EventStatus;
  eventDate: string | null;
  startDate: string | null;
  endDate: string | null;
  leadName: string;
  leadEmail: string;
}

export type TaskStatus = 'To Do' | 'In Progress' | 'Done' | 'Blocked';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  taskName: string;
  relatedEventId: string | null;
  ownerName: string;
  ownerEmail: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  isOverdue: boolean;
  isDueToday: boolean;
  isDueThisWeek: boolean;
}

export interface MeetingNote {
  id: string;
  title: string;
  relatedEventId: string | null;
  notes: string;
  actionItems: string;
  authorName: string;
  date: string | null;
}
