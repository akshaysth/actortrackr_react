import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

interface FormFieldProps extends Omit<React.ComponentProps<"div">, "type" | "placeholder"> {
  label?: string
  error?: string | null
  id: string
  children: React.ReactNode
}

function FormField({
  label,
  error,
  id,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <Label htmlFor={id}>
          {label}
        </Label>
      )}
      {children}
      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export { FormField }
