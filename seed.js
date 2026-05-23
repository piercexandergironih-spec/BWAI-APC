require('dotenv').config({ path: '.env.local' });

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const EVENTS_DB_ID = process.env.NOTION_EVENTS_DB_ID;
const TASKS_DB_ID = process.env.NOTION_TASKS_DB_ID;
const NOTES_DB_ID = process.env.NOTION_NOTES_DB_ID;

const headers = {
  'Authorization': `Bearer ${NOTION_TOKEN}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28'
};

async function createPage(databaseId, properties) {
  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties
    })
  });
  
  if (!response.ok) {
    const err = await response.text();
    console.error(`Error creating page in DB ${databaseId}:`, err);
    return null;
  }
  
  const data = await response.json();
  return data.id;
}

function richText(content) {
  return [{ text: { content } }];
}

async function seed() {
  console.log('Seeding Notion Databases...');

  // 1. Create Events
  console.log('Creating Events...');
  const today = new Date();
  
  const event1Date = new Date();
  event1Date.setDate(today.getDate() + 5);
  
  const event2Date = new Date();
  event2Date.setDate(today.getDate() - 2);

  const event1Id = await createPage(EVENTS_DB_ID, {
    'Title': { title: richText('Annual AI Summit 2026') },
    'Description': { rich_text: richText('The biggest AI summit of the year for students.') },
    'Status': { select: { name: 'Active' } },
    'Event Date': { date: { start: event1Date.toISOString().split('T')[0] } },
    'Start Date': { date: { start: event1Date.toISOString().split('T')[0] } },
    'Lead Name': { rich_text: richText('Alice Johnson') },
    'Lead Email': { email: 'alice@example.com' }
  });

  const event2Id = await createPage(EVENTS_DB_ID, {
    'Title': { title: richText('Intro to Machine Learning Workshop') },
    'Description': { rich_text: richText('A beginner-friendly workshop on ML basics.') },
    'Status': { select: { name: 'Completed' } },
    'Event Date': { date: { start: event2Date.toISOString().split('T')[0] } },
    'Lead Name': { rich_text: richText('Bob Smith') }
  });

  // 2. Create Tasks
  console.log('Creating Tasks...');
  
  const task1DueDate = new Date();
  task1DueDate.setDate(today.getDate() - 1); // Overdue
  
  const task2DueDate = new Date(); // Due today

  await createPage(TASKS_DB_ID, {
    'Task Name': { title: richText('Finalize Guest Speaker List') },
    'Owner Name': { rich_text: richText('Alice Johnson') },
    'Status': { select: { name: 'In Progress' } },
    'Priority': { select: { name: 'High' } },
    'Due Date': { date: { start: task1DueDate.toISOString().split('T')[0] } },
    'Related Event': { relation: [{ id: event1Id }] }
  });

  await createPage(TASKS_DB_ID, {
    'Task Name': { title: richText('Order Catering for Lunch') },
    'Owner Name': { rich_text: richText('Charlie Davis') },
    'Status': { select: { name: 'To Do' } },
    'Priority': { select: { name: 'Medium' } },
    'Due Date': { date: { start: task2DueDate.toISOString().split('T')[0] } },
    'Related Event': { relation: [{ id: event1Id }] }
  });

  await createPage(TASKS_DB_ID, {
    'Task Name': { title: richText('Send Feedback Forms') },
    'Owner Name': { rich_text: richText('Bob Smith') },
    'Status': { select: { name: 'Done' } },
    'Priority': { select: { name: 'Low' } },
    'Related Event': { relation: [{ id: event2Id }] }
  });

  // 3. Create Meeting Notes
  console.log('Creating Meeting Notes...');
  
  await createPage(NOTES_DB_ID, {
    'Title': { title: richText('Weekly Sync: Summit Prep') },
    'Notes': { rich_text: richText('Discussed the speaker lineup and catering budget. Everything is on track but we need to finalize the venue layout.') },
    'Action Items': { rich_text: richText('- Alice: Confirm speaker list\n- Charlie: Order catering') },
    'Author Name': { rich_text: richText('Diana Prince') },
    'Date': { date: { start: today.toISOString().split('T')[0] } },
    'Related Event': { relation: [{ id: event1Id }] }
  });

  await createPage(NOTES_DB_ID, {
    'Title': { title: richText('ML Workshop Post-Mortem') },
    'Notes': { rich_text: richText('Great turnout! Students loved the hands-on lab. Need better internet next time.') },
    'Action Items': { rich_text: richText('- Bob: Send out feedback forms\n- IT: Upgrade router for next event') },
    'Author Name': { rich_text: richText('Diana Prince') },
    'Date': { date: { start: event2Date.toISOString().split('T')[0] } },
    'Related Event': { relation: [{ id: event2Id }] }
  });

  await createPage(NOTES_DB_ID, {
    'Title': { title: richText('Sponsorship Pitch Meeting') },
    'Notes': { rich_text: richText('Met with the tech companies to discuss sponsoring the Annual AI Summit. They are interested in setting up a booth in the main hall. We need to send them the floor plan and the pricing tiers.') },
    'Action Items': { rich_text: richText('- Alice: Send pricing deck\n- Charlie: Draft contract') },
    'Author Name': { rich_text: richText('Alice Johnson') },
    'Date': { date: { start: today.toISOString().split('T')[0] } },
    'Related Event': { relation: [{ id: event1Id }] }
  });

  await createPage(NOTES_DB_ID, {
    'Title': { title: richText('Venue Walkthrough') },
    'Notes': { rich_text: richText('Toured the main auditorium for the AI Summit. Space is excellent, acoustics are great. We noted that the power outlets near the back rows are limited, so we might need extension cords for attendees with laptops.') },
    'Action Items': { rich_text: richText('- Charlie: Source 15 extension cables\n- Alice: Update logistics doc') },
    'Author Name': { rich_text: richText('Charlie Davis') },
    'Date': { date: { start: today.toISOString().split('T')[0] } },
    'Related Event': { relation: [{ id: event1Id }] }
  });

  console.log('Seed complete! Your Notion databases are now populated with sample data.');
}

seed().catch(console.error);
