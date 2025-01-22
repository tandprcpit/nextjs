"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

const skills = [
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "nextjs", label: "Next.js" },
]

interface MultiSelectSkillsProps {
  value: string[]
  onChange: (value: string[]) => void
}

export default function MultiSelectSkills({ 
  value = [], 
  onChange 
}: MultiSelectSkillsProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = React.useCallback((skill: string) => {
    const updatedSkills = value.includes(skill)
      ? value.filter((s) => s !== skill)
      : [...value, skill]
    onChange(updatedSkills)
  }, [value, onChange])

  const handleRemove = React.useCallback((skill: string) => {
    const updatedSkills = value.filter((s) => s !== skill)
    onChange(updatedSkills)
  }, [value, onChange])

  return (
    <div className="w-full max-w-md">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value.length > 0
              ? `${value.length} skill${value.length > 1 ? 's' : ''} selected`
              : "Select skills"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search skills..." />
            <CommandEmpty>No skill found.</CommandEmpty>
            <CommandGroup>
              {skills.map((skill) => (
                <CommandItem
                  key={skill.value}
                  onSelect={() => handleSelect(skill.value)}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(skill.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {skill.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((skill) => {
          const skillObj = skills.find((s) => s.value === skill)
          return skillObj ? (
            <Badge key={skill} variant="secondary" className="text-sm">
              {skillObj.label}
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 h-auto p-0 text-muted-foreground hover:text-foreground"
                onClick={() => handleRemove(skill)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </Badge>
          ) : null
        })}
      </div>
    </div>
  )
}