"use client"

import { useProject } from "@/contexts/project-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TasksResourcesReport() {
  const { tasks, allocations, resources } = useProject()

  const getResourceNames = (taskId: string) => {
    const allocation = allocations.find((a) => a.taskId === taskId)
    if (!allocation || allocation.resourceIds.length === 0) return "-"
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.id}</TableCell>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.duration}</TableCell>
              <TableCell>{task.startDate}</TableCell>
              <TableCell>{task.finishDate}</TableCell>
              <TableCell>{getResourceNames(task.id)}</TableCell>
            </TableRow>
          ))}
          {tasks.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No tasks found. Add tasks and assign resources to see them here.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
