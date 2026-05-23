require('dotenv').config({ path: '.env.local' });
const id = '369eaf12-7094-8166-adf8-fd09b3bfe73c';
fetch(`https://api.notion.com/v1/pages/${id}`, {
  headers: {
    'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
    'Notion-Version': '2022-06-28'
  }
}).then(r => r.text()).then(console.log);
