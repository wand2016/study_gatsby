import React from "react"
import { Link, navigate } from "gatsby"
import "@/style.scss"
import Search, { Index } from "@/components/search"
import styled from "styled-components"
import { Menubar } from "primereact/menubar"
import { MenuItem } from "primereact/api"
import moment from "moment"

const searchIndices: Index[] = [
  {
    name: process.env.GATSBY_ALGOLIA_INDEX ?? "Pages",
    title: "Pages",
  },
]

type Props = {
  className?: string
  title: string
}
type PathAndLabel = {
  path: string
  label: string
  icon?: string
}

const GlobalHeader: React.FC<Props> = ({ className, title }) => {
  const pathAndLabels: PathAndLabel[] = [
    {
      path: "/",
      label: "最新記事",
      icon: "pi pi-fw pi-home",
    },
    {
      path: "/calendar",
      label: "日付別記事",
      icon: "pi pi-fw pi-calendar-times",
    },
    {
      path: "/tags",
      label: "タグ別記事",
      icon: "pi pi-fw pi-tags",
    },
  ]

  const items: MenuItem[] = pathAndLabels.map(
    (pathAndLabel): MenuItem => {
      return {
        label: pathAndLabel.label,
        command(e: { originalEvent: Event; item: MenuItem }) {
          navigate(pathAndLabel.path)
        },
        icon: pathAndLabel.icon,
      }
    }
  )

  return (
    <header className={className}>
      <div className="main-heading">
        <h1 className="title">{title}</h1>
        <small>
          最終更新日時: {moment(moment.now()).format("YYYY-MM-DD HH:mm:ss")}
        </small>
      </div>
      <nav>
        <Menubar model={items} end={() => <Search indices={searchIndices} />} />
      </nav>
    </header>
  )
}

export default styled(GlobalHeader)`
  .main-heading {
    background-color: #333;
    color: #eee;
    text-align: center;
    margin: 0;
    align-items: center;

    h1 {
      margin: 0;
    }
  }
`
