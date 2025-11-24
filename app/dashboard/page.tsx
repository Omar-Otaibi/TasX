import { DashboardShell } from "@/components/dashboard-shell"
import { ProjectProvider } from "@/contexts/project-context"

export default function DashboardPage() {
  return (
    <ProjectProvider>
      <DashboardShell />
    </ProjectProvider>
  )
}
