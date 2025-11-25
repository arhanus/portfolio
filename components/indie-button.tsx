import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, forwardRef } from "react"

interface IndieButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
}

const IndieButton = forwardRef<HTMLButtonElement, IndieButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "font-bold border-[1px] border-foreground rounded-xl transition-all duration-200 active:translate-x-[3px] active:translate-y-[3px] hover:cursor-pointer"

    const variantStyles = {
      primary:
        "bg-primary text-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px]",
      secondary:
        "bg-background text-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px]",
    }

    const sizeStyles = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    }

    return (
      <button ref={ref} className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)} {...props}>
        {children}
      </button>
    )
  },
)

IndieButton.displayName = "IndieButton"

export { IndieButton }
