import React from "react"
import GlobalHeader from "@/components/layout/global-header"

type Props = {
  className?: string
  location: Location
  title: string
}
const Layout: React.FC<Props> = ({ className, location, title, children }) => {
  return (
    <div className={className}>
      <GlobalHeader className="global-header" title={title} />
      <main>{children}</main>
    </div>
  )
}

export default Layout
