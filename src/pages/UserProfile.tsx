import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export const UserProfile = () => {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main className="flex-1 p-4">
        <h1>ProfilePage</h1>
      </main>
    </SidebarProvider>
  )
}