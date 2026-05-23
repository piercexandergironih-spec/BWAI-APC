export function parseTitle(prop: any): string {
  if (!prop?.title) return '';
  return prop.title.map((t: any) => t.plain_text).join('');
}

export function parseText(prop: any): string {
  if (!prop?.rich_text) return '';
  return prop.rich_text.map((t: any) => t.plain_text).join('');
}

export function parseSelect(prop: any): string {
  return prop?.select?.name || '';
}

export function parseDate(prop: any): string | null {
  return prop?.date?.start || null;
}

export function parseEmail(prop: any): string {
  return prop?.email || '';
}

export function parseRelation(prop: any): string | null {
  return prop?.relation?.[0]?.id || null;
}
