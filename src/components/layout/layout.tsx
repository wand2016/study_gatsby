import React from "react"
import GlobalHeader from "@/components/layout/global-header"
import moment from "moment"

type Props = {
  className?: string
  location: Location
  title: string
  children: React.ReactNodeArray
}
const Layout: React.FC<Props> = ({ className, location, title, children }) => {
  return (
    <div className={className}>
      <GlobalHeader className="global-header" title={title} />
      <main>{children}</main>
      <footer>
        <small>
          最終更新日時: {moment(moment.now()).format("YYYY-MM-DD HH:mm:ss")}
        </small>
      </footer>
    </div>
  )
}

export default Layout
