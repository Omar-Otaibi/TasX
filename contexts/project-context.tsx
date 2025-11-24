"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type Task = {
  id: string
  name: string
  duration: string // e.g. "5 days"
  startDate: string
  finishDate: string
}

export type ResourceType = "Work" | "Cost"

export type Resource = {
  id: string
  name: string
  type: ResourceType
  max: number // percentage
  standardRate: string // e.g. "15$/hr"
  costPerUse: number // e.g. 1000
}

export type Allocation = {
  taskId: string
  resourceIds: string[]
}

interface ProjectContextType {
  tasks: Task[]
  resources: Resource[]
  allocations: Allocation[]
  addTask: (task: Task) => void
  addResource: (resource: Resource) => void
  assignResource: (taskId: string, resourceId: string) => void
  removeAllocation: (taskId: string, resourceId: string) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [resources, setResources] = useState<Resource[]>([])
  const [allocations, setAllocations] = useState<Allocation[]>([])

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasx-tasks")
    const savedResources = localStorage.getItem("tasx-resources")
    const savedAllocations = localStorage.getItem("tasx-allocations")

    if (savedTasks) setTasks(JSON.parse(savedTasks))
    if (savedResources) setResources(JSON.parse(savedResources))
    if (savedAllocations) setAllocations(JSON.parse(savedAllocations))
  }, [])

  useEffect(() => {
    localStorage.setItem("tasx-tasks", JSON.stringify(tasks))
    localStorage.setItem("tasx-resources", JSON.stringify(resources))
    localStorage.setItem("tasx-allocations", JSON.stringify(allocations))
  }, [tasks, resources, allocations])

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task])
  }

  const addResource = (resource: Resource) => {
    setResources((prev) => [...prev, resource])
  }

  const assignResource = (taskId: string, resourceId: string) => {
    setAllocations((prev) => {
      const existing = prev.find((a) => a.taskId === taskId)
      if (existing) {
        if (existing.resourceIds.includes(resourceId)) return prev
        return prev.map((a) => (a.taskId === taskId ? { ...a, resourceIds: [...a.resourceIds, resourceId] } : a))
      }
      return [...prev, { taskId, resourceIds: [resourceId] }]
    })
  }

  const removeAllocation = (taskId: string, resourceId: string) => {
    setAllocations((prev) =>
      prev.map((a) => {
        if (a.taskId === taskId) {
          return {
            ...a,
            resourceIds: a.resourceIds.filter((id) => id !== resourceId),
          }
        }
        return a
      }),
    )
  }

  return (
    <ProjectContext.Provider
      value={{
        tasks,
        resources,
        allocations,
        addTask,
        addResource,
        assignResource,
        removeAllocation,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider")
  }
  return context
}
