
"use client";

import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { SidebarProvider } from "@/components/ui/sidebar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
            <AppSidebar />
            <div className="flex-1 flex flex-col min-h-screen">
                <AppHeader />
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                {children}
                </main>
            </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
