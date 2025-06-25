import Loader from "@/components/loader"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

const PagesWrapper = ({children, className="", isLoading=false}:{children: ReactNode, className?:string,isLoading?:boolean}) => {
  if(isLoading) return <Loader/>
  return (
    <div className={cn("px-16 py-8 w-full",className)}>
        {children}
    </div>
  )
}

export default PagesWrapper