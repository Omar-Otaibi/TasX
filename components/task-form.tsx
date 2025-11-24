"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useProject } from "@/contexts/project-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle2 } from "lucide-react"

export function TaskForm() {
  const { addTask, tasks } = useProject()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    duration: "",
    startDate: "",
    finishDate: "",
  })
  const [skipWeekends, setSkipWeekends] = useState(false)

  useEffect(() => {
    setFormData((prev) => ({ ...prev, id: (tasks.length + 1).toString() }))
  }, [tasks.length])

  useEffect(() => {
    if (formData.startDate && formData.duration) {
      const durationDays = Number.parseInt(formData.duration) || 0
      if (durationDays > 0) {
        const finish = calculateFinishDate(formData.startDate, durationDays, skipWeekends)
        setFormData((prev) => ({ ...prev, finishDate: finish }))
      }
    }
  }, [formData.startDate, formData.duration, skipWeekends])

  const calculateFinishDate = (start: string, duration: number, skip: boolean) => {
    const currentDate = new Date(start)
    let daysAdded = 0

    // If start date is invalid, return empty
    if (isNaN(currentDate.getTime())) return ""

    // Working loop
    // We need to find the date where we have consumed 'duration' working days.
    // Day 1 is the start date (if it's a working day).

    while (daysAdded < duration) {
      const dayOfWeek = currentDate.getDay() // 0=Sun, 1=Mon, ..., 5=Fri, 6=Sat

      // Check if current day is a weekend (Fri=5, Sat=6 in Saudi Arabia)
      const isWeekend = dayOfWeek === 5 || dayOfWeek === 6

      if (skip && isWeekend) {
        // Skip this day, don't increment count, just move to next day
        currentDate.setDate(currentDate.getDate() + 1)
        continue
      }

      // It's a working day
      daysAdded++

      // If we haven't reached the full duration yet, move to next day to check it
      if (daysAdded < duration) {
        currentDate.setDate(currentDate.getDate() + 1)
      }
    }

    // Format to YYYY-MM-DD
    return currentDate.toISOString().split("T")[0]
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTask(formData)

    toast({
      title: "Task Created",
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500 animate-in zoom-in duration-300" />
          <span>Task "{formData.name}" has been added successfully.</span>
        </div>
      ),
    })

    // Reset form but increment ID
    setFormData({
      id: (tasks.length + 2).toString(), // Next ID
      name: "",
      duration: "",
      startDate: "",
      finishDate: "",
    })
    // alert("Task added successfully!")
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md border-t-4 border-t-primary">
      <CardHeader>
        <CardTitle className="text-xl text-primary">New Task Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="id">Task ID</Label>
              <Input
                id="id"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                required
                readOnly
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Task Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g., Problem Identification"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (Days)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
                placeholder="e.g., 5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="start">Start Date</Label>
              <Input
                id="start"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="finish">Finish Date</Label>
              <Input
                id="finish"
                type="date"
                value={formData.finishDate}
                onChange={(e) => setFormData({ ...formData, finishDate: e.target.value })}
                required
                readOnly
                className="bg-muted/50 font-semibold text-primary"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="skipWeekends"
              checked={skipWeekends}
              onCheckedChange={(checked) => setSkipWeekends(checked as boolean)}
            />
            <Label
              htmlFor="skipWeekends"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Skip Weekends (Friday & Saturday)
            </Label>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full md:w-auto min-w-[150px]">
              Add Task
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
