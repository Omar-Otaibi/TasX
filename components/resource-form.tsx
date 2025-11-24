"use client"

import type React from "react"

import { useState } from "react"
import { useProject, type ResourceType } from "@/contexts/project-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle2 } from "lucide-react"

export function ResourceForm() {
  const { addResource } = useProject()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    type: "Work" as ResourceType,
    max: 100,
    standardRate: "",
    costPerUse: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addResource({
      ...formData,
      id: Math.random().toString(36).substr(2, 9), // Simple random ID
    })

    toast({
      title: "Resource Added",
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500 animate-in zoom-in duration-300" />
          <span>{formData.name} has been added to resources.</span>
        </div>
      ),
    })

    setFormData({
      name: "",
      type: "Work",
      max: 100,
      standardRate: "",
      costPerUse: 0,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="grid gap-2">
        <Label htmlFor="r-name">Resource Name</Label>
        <Input
          id="r-name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="type">Type</Label>
        <Select value={formData.type} onValueChange={(v: ResourceType) => setFormData({ ...formData, type: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Work">Work</SelectItem>
            <SelectItem value="Cost">Cost</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.type === "Work" && (
        <>
          <div className="grid gap-2">
            <Label htmlFor="max">Max (%)</Label>
            <Input
              id="max"
              type="number"
              value={formData.max}
              onChange={(e) => setFormData({ ...formData, max: Number.parseInt(e.target.value) || 0 })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rate">Standard Rate (e.g., 15$/hr)</Label>
            <Input
              id="rate"
              value={formData.standardRate}
              onChange={(e) => setFormData({ ...formData, standardRate: e.target.value })}
              placeholder="15$/hr"
              required
            />
          </div>
        </>
      )}

      {formData.type === "Cost" && (
        <div className="grid gap-2">
          <Label htmlFor="cost">Cost/Use ($)</Label>
          <Input
            id="cost"
            type="number"
            value={formData.costPerUse}
            onChange={(e) => setFormData({ ...formData, costPerUse: Number.parseFloat(e.target.value) || 0 })}
            required
          />
        </div>
      )}

      <Button type="submit">Add Resource</Button>
    </form>
  )
}
