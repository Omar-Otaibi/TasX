"use client"

import { useProject, type Task, type Resource } from "@/contexts/project-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Helper to calculate cost
export function calculateTaskCost(task: Task, assignedResourceIds: string[], allResources: Resource[]) {
  let totalCost = 0
  const durationDays = Number.parseInt(task.duration) || 0 // Extract number from "5 days"
  const hours = durationDays * 8

  assignedResourceIds.forEach((rId) => {
    const resource = allResources.find((r) => r.id === rId)
    if (!resource) return

    if (resource.type === "Cost") {
      totalCost += resource.costPerUse
    } else if (resource.type === "Work") {
      // Parse "15$/hr" -> 15
      const rateString = resource.standardRate.replace(/[^0-9.]/g, "")
      const rate = Number.parseFloat(rateString) || 0
      totalCost += hours * rate
    }
  })

  return totalCost
}

export function TaskCostReport() {
  const { tasks, allocations, resources } = useProject()

  const getResourceNames = (taskId: string) => {
    const allocation = allocations.find((a) => a.taskId === taskId)
    if (!allocation) return "-"
    return allocation.resourceIds
      .map((id) => resources.find((r) => r.id === id)?.name)
      .filter(Boolean)
      .join(", ")
  }

  return (
    <div className="rounded-md border bg-card p-6 shadow-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Task ID</TableHead>
            <TableHead>Task Name</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Finish Date</TableHead>
            <TableHead>Resource Name</TableHead>
            <TableHead className="text-right">Total Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => {
            const allocation = allocations.find((a) => a.taskId === task.id)
            const assignedIds = allocation ? allocation.resourceIds : []
            const cost = calculateTaskCost(task, assignedIds, resources)

            return (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.id}</TableCell>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.duration}</TableCell>
                <TableCell>{task.startDate}</TableCell>
                <TableCell>{task.finishDate}</TableCell>
                <TableCell>{getResourceNames(task.id)}</TableCell>
                <TableCell className="text-right font-mono">${cost}</TableCell>
              </TableRow>
            )
          })}
          {tasks.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                No tasks found. Add tasks and resources to see cost analysis.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
