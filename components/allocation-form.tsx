"use client"

import type React from "react"

import { useState } from "react"
import { useProject } from "@/contexts/project-context"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle2 } from "lucide-react"

export function AllocationForm() {
  const { tasks, resources, assignResource, allocations } = useProject()
  const { toast } = useToast()
  const [selectedTask, setSelectedTask] = useState("")
  const [selectedResource, setSelectedResource] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTask || !selectedResource) return
    assignResource(selectedTask, selectedResource)

    toast({
      title: "Resource Assigned",
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500 animate-in zoom-in duration-300" />
          <span>Resource successfully assigned to task.</span>
        </div>
      ),
    })

    setSelectedResource("")
  }

  const getAssignedResources = (taskId: string) => {
    const allocation = allocations.find((a) => a.taskId === taskId)
    if (!allocation) return []
    return allocation.resourceIds.map((id) => resources.find((r) => r.id === id)?.name).filter(Boolean)
  }

  return (
    <div className="space-y-8 max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="task">Select Task</Label>
          <Select value={selectedTask} onValueChange={setSelectedTask}>
            <SelectTrigger>
              <SelectValue placeholder="Select a task" />
            </SelectTrigger>
            <SelectContent>
              {tasks.map((task) => (
                <SelectItem key={task.id} value={task.id}>
                  {task.name} ({task.duration})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="resource">Select Resource</Label>
          <Select value={selectedResource} onValueChange={setSelectedResource}>
            <SelectTrigger>
              <SelectValue placeholder="Select a resource" />
            </SelectTrigger>
            <SelectContent>
              {resources.map((resource) => (
                <SelectItem key={resource.id} value={resource.id}>
                  {resource.name} ({resource.type})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={!selectedTask || !selectedResource}>
          Assign Resource
        </Button>
      </form>

      {selectedTask && (
        <div className="p-4 border rounded-lg bg-muted/50">
          <h4 className="font-semibold mb-2">Currently Assigned to this Task:</h4>
          <ul className="list-disc list-inside text-sm">
            {getAssignedResources(selectedTask).length > 0 ? (
              getAssignedResources(selectedTask).map((name, i) => <li key={i}>{name}</li>)
            ) : (
              <li className="text-muted-foreground">No resources assigned yet</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
