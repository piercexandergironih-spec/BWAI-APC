"use client";

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu, X, Orbit } from 'lucide-react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-muted/20">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-lg transform transition-transform border-r-2 border-foreground">
            <Sidebar onNavigate={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col w-full lg:pl-64">
        {/* Mobile Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b-2 border-foreground bg-background px-6 lg:hidden sticky top-0 z-30">
          <span className="font-heading font-black text-lg tracking-tight uppercase flex items-center gap-2">
            <Orbit className="w-5 h-5 text-primary" /> ORBITO
          </span>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -mr-2 text-foreground"
          >
            <Menu className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
