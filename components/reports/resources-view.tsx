"use client"

import { useProject } from "@/contexts/project-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ResourcesReport() {
  const { resources } = useProject()

  return (
    <div className="rounded-md border bg-card p-6 shadow-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Resource Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Max</TableHead>
            <TableHead>St. Rate</TableHead>
            <TableHead>Cost/Use</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell className="font-medium">{resource.name}</TableCell>
              <TableCell>{resource.type}</TableCell>
              <TableCell>{resource.type === "Work" ? `${resource.max}%` : "-"}</TableCell>
              <TableCell>{resource.standardRate || "-"}</TableCell>
              <TableCell>{resource.costPerUse ? `$${resource.costPerUse}` : "-"}</TableCell>
            </TableRow>
          ))}
          {resources.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                No resources found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
