"use client"

import { useProject } from "@/contexts/project-context"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { calculateTaskCost } from "./task-cost-view"

export function ProjectCostReport() {
  const { tasks, allocations, resources } = useProject()

  let totalProjectCost = 0

  const getResourceNames = (taskId: string) => {
    const allocation = allocations.find((a) => a.taskId === taskId)
    if (!allocation) return "-"
    return allocation.resourceIds
      .map((id) => resources.find((r) => r.id === id)?.name)
      .filter(Boolean)
      .join(", ")
  }

  return (
    <div className="rounded-md border bg-card p-6 shadow-lg">
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
            totalProjectCost += cost

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
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="text-right font-bold">
              Total Cost
            </TableCell>
            <TableCell className="text-right font-bold font-mono">${totalProjectCost}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
