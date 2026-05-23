'use client';

import { useEffect } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Something went wrong"
        description="We couldn't load this data from Notion."
        icon={<AlertCircle className="w-8 h-8 text-destructive" />}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Error' }]}
      />
      <div className="brutalist-card p-12 flex flex-col items-center justify-center gap-6">
        <p className="font-mono text-muted-foreground text-center max-w-md">
          {error.message || 'There was an error connecting to the Notion API or parsing the data.'}
        </p>
        <Button onClick={() => reset()} variant="default" className="border-2 border-foreground rounded-none uppercase font-bold px-8">
          Try again
        </Button>
      </div>
    </div>
  );
}
