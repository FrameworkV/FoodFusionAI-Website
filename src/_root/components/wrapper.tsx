import { cn } from "@/lib/utils"
import { ReactNode } from "react"

const PagesWrapper = ({children, className=""}:{children: ReactNode, className?:string}) => {
  return (
    <div className={cn("px-16 py-8 w-full",className)}>
        {children}
    </div>
  )
}

export default PagesWrapper