#!/bin/bash

TOKEN="YOUR_NOTION_TOKEN"
PARENT_ID="YOUR_PARENT_PAGE_ID"
VERSION="2022-06-28"

echo "Creating Events DB..."
EVENTS_RES=$(curl -s -X POST 'https://api.notion.com/v1/databases' \
  -H "Authorization: Bearer $TOKEN" \
  -H "Notion-Version: $VERSION" \
  -H "Content-Type: application/json" \
  -d '{
    "parent": { "type": "page_id", "page_id": "'"$PARENT_ID"'" },
    "title": [{"type": "text", "text": {"content": "Events"}}],
    "properties": {
      "Title": { "title": {} },
      "Description": { "rich_text": {} },
      "Status": {
        "select": {
          "options": [
            {"name": "Planning", "color": "yellow"},
            {"name": "Active", "color": "blue"},
            {"name": "Completed", "color": "green"},
            {"name": "Cancelled", "color": "red"}
          ]
        }
      },
      "Event Date": { "date": {} },
      "Start Date": { "date": {} },
      "End Date": { "date": {} },
      "Lead Name": { "rich_text": {} },
      "Lead Email": { "email": {} }
    }
  }')

EVENTS_ID=$(echo $EVENTS_RES | jq -r '.id')
if [ "$EVENTS_ID" == "null" ] || [ -z "$EVENTS_ID" ]; then
  echo "Failed to create Events DB: $EVENTS_RES"
  exit 1
fi
echo "Events DB ID: $EVENTS_ID"

echo "Creating Tasks DB..."
TASKS_RES=$(curl -s -X POST 'https://api.notion.com/v1/databases' \
  -H "Authorization: Bearer $TOKEN" \
  -H "Notion-Version: $VERSION" \
  -H "Content-Type: application/json" \
  -d '{
    "parent": { "type": "page_id", "page_id": "'"$PARENT_ID"'" },
    "title": [{"type": "text", "text": {"content": "Tasks"}}],
    "properties": {
      "Task Name": { "title": {} },
      "Related Event": {
        "relation": {
          "database_id": "'"$EVENTS_ID"'",
          "type": "single_property",
          "single_property": {}
        }
      },
      "Owner Name": { "rich_text": {} },
      "Owner Email": { "email": {} },
      "Status": {
        "select": {
          "options": [
            {"name": "To Do", "color": "gray"},
            {"name": "In Progress", "color": "blue"},
            {"name": "Done", "color": "green"},
            {"name": "Blocked", "color": "red"}
          ]
        }
      },
      "Priority": {
        "select": {
          "options": [
            {"name": "Low", "color": "gray"},
            {"name": "Medium", "color": "yellow"},
            {"name": "High", "color": "red"}
          ]
        }
      },
      "Due Date": { "date": {} }
    }
  }')

TASKS_ID=$(echo $TASKS_RES | jq -r '.id')
if [ "$TASKS_ID" == "null" ] || [ -z "$TASKS_ID" ]; then
  echo "Failed to create Tasks DB: $TASKS_RES"
  exit 1
fi
echo "Tasks DB ID: $TASKS_ID"

echo "Creating Meeting Notes DB..."
NOTES_RES=$(curl -s -X POST 'https://api.notion.com/v1/databases' \
  -H "Authorization: Bearer $TOKEN" \
  -H "Notion-Version: $VERSION" \
  -H "Content-Type: application/json" \
  -d '{
    "parent": { "type": "page_id", "page_id": "'"$PARENT_ID"'" },
    "title": [{"type": "text", "text": {"content": "Meeting Notes"}}],
    "properties": {
      "Title": { "title": {} },
      "Related Event": {
        "relation": {
          "database_id": "'"$EVENTS_ID"'",
          "type": "single_property",
          "single_property": {}
        }
      },
      "Notes": { "rich_text": {} },
      "Action Items": { "rich_text": {} },
      "Author Name": { "rich_text": {} },
      "Date": { "date": {} }
    }
  }')

NOTES_ID=$(echo $NOTES_RES | jq -r '.id')
if [ "$NOTES_ID" == "null" ] || [ -z "$NOTES_ID" ]; then
  echo "Failed to create Notes DB: $NOTES_RES"
  exit 1
fi
echo "Notes DB ID: $NOTES_ID"

# Generate .env.local
cat <<EOF > .env.local
NOTION_TOKEN=$TOKEN
NOTION_EVENTS_DB_ID=$EVENTS_ID
NOTION_TASKS_DB_ID=$TASKS_ID
NOTION_NOTES_DB_ID=$NOTES_ID
EOF

echo "Successfully created databases and .env.local!"
