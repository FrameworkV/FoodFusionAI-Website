import { Loader2 } from "lucide-react"

interface AIResponseLoaderProps {
  message?: string
  variant?: "dots" | "pulse" | "spinner"
}

export function AIResponseLoader({ message = "AI is thinking...", variant = "dots" }: AIResponseLoaderProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg p-4 w-fit max-w-[80%]">
      {variant === "spinner" ? (
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
      ) : variant === "pulse" ? (
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-150" />
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-300" />
        </div>
      ) : (
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce delay-150" />
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce delay-300" />
        </div>
      )}
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )
}
