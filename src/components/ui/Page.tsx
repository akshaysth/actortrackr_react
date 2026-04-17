import { ReactNode } from "react"

interface PageProps {
  title: string
  subtitle?: string
  action?: ReactNode
  children?: ReactNode
}

export default function Page({ title, subtitle, action, children }: PageProps) {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}
