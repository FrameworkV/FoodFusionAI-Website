import { ReactNode } from "react"

const PagesWrapper = ({children}:{children: ReactNode}) => {
  return (
    <div className="px-16 py-8 w-full">
        {children}
    </div>
  )
}

export default PagesWrapper