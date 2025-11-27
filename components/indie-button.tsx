import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, forwardRef } from "react"

interface IndieButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
}

const IndieButton = forwardRef<HTMLButtonElement, IndieButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "font-bold border-[1px] rounded-xl transition-all duration-200  hover:cursor-pointer active:translate-y-[2px]"

    const variantStyles = {
      primary:
        "bg-primary text-orange-900 border-orange-800 shadow-[0px_5px_0px_0px_rgba(146,64,14,1)] hover:shadow-[0px_7px_0px_0px_rgba(146,64,14,1)] hover:-translate-y-[2px] active:shadow-[0px_2px_0px_0px_rgba(146,64,14,1)]",
      secondary:
        "bg-[#F5F5DC] text-[#6B4423] border-[#D2B48C] shadow-[0px_5px_0px_0px_rgba(210,180,140,1)] hover:shadow-[0px_7px_0px_0px_rgba(210,180,140,1)] hover:-translate-y-[2px] active:shadow-[0px_2px_0px_0px_rgba(210,180,140,1)]",
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
