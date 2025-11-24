"use client"

import { useState } from "react"
import { PlusCircle, Users, LinkIcon, FileText, DollarSign, PieChart, Menu } from "lucide-react"
import { Logo, LogoDark } from "@/components/ui/logo"
import { TaskForm } from "./task-form"
import { ResourceForm } from "./resource-form"
import { AllocationForm } from "./allocation-form"
import { TasksReport } from "./reports/tasks-view"
import { ResourcesReport } from "./reports/resources-view"
import { TasksResourcesReport } from "./reports/tasks-resources-view"
import { TaskCostReport } from "./reports/task-cost-view"
import { ProjectCostReport } from "./reports/project-cost-view"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const TABS = [
  { id: "task-entry", label: "Task Entry", icon: PlusCircle, component: TaskForm },
  { id: "resource-entry", label: "Resource Entry", icon: Users, component: ResourceForm },
  { id: "allocation", label: "Resource Allocation", icon: LinkIcon, component: AllocationForm },
  { id: "report-tasks", label: "Report: Tasks", icon: FileText, component: TasksReport },
  { id: "report-resources", label: "Report: Resources", icon: FileText, component: ResourcesReport },
  { id: "report-combined", label: "Report: Tasks + Resources", icon: FileText, component: TasksResourcesReport },
  { id: "report-cost", label: "Report: Task Cost", icon: DollarSign, component: TaskCostReport },
  { id: "report-total", label: "Report: Total Project Cost", icon: PieChart, component: ProjectCostReport },
]

export function DashboardShell() {
  const [activeTab, setActiveTab] = useState("task-entry")

  const ActiveComponent = TABS.find((t) => t.id === activeTab)?.component || TaskForm

  const SidebarContent = () => (
    <>
      <div className="flex h-16 items-center border-b px-6 gap-3">
        <LogoDark className="w-8 h-8 rounded-lg shadow-sm"/>
        <span className="font-bold text-xl tracking-tight text-primary">TasX</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <ul className="space-y-1">
          {TABS.map((tab) => (
            <li key={tab.id}>
              <Button
                variant={activeTab === tab.id ? "secondary" : "ghost"}
                className={`w-full justify-start mb-1 font-medium ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary hover:bg-primary/15"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon
                  className={`mr-3 h-5 w-5 ${activeTab === tab.id ? "text-primary" : "text-muted-foreground"}`}
                />
                {tab.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden w-72 flex-col border-r bg-card shadow-sm md:flex z-20">
        <SidebarContent />
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 flex items-center border-b bg-card px-4 md:hidden justify-between">
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="font-bold text-xl text-primary">TasX</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                {TABS.find((t) => t.id === activeTab)?.label}
              </h1>
              <p className="text-muted-foreground mt-1">Manage your project tasks and resources efficiently.</p>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ActiveComponent />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
