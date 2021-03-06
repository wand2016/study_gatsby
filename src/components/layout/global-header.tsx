import React from "react"
import { graphql, navigate, useStaticQuery } from "gatsby"
import Search, { Index } from "@/components/search"
import styled from "styled-components"
import { Menubar } from "primereact/menubar"
import { MenuItem } from "primereact/api"

const searchIndices: Index[] = [
  {
    name: process.env.GATSBY_ALGOLIA_INDEX ?? "Pages",
    title: "Pages",
  },
]

type Props = {
  className?: string
}
type PathAndLabel = {
  path: string
  label: string
  icon?: string
}

const GlobalHeader: React.FC<Props> = ({ className }) => {
  const { site } = useStaticQuery<GatsbyTypes.GlobalHeaderQuery>(pageQuery)
  const title = site?.siteMetadata?.title ?? "no title"

  const pathAndLabels: PathAndLabel[] = [
    {
      path: "/",
      label: "最新記事",
      icon: "pi pi-fw pi-home",
    },
    {
      path: "/calendar",
      label: "日付別記事",
      icon: "pi pi-fw pi-calendar",
    },
    {
      path: "/tags",
      label: "タグ別記事",
      icon: "pi pi-fw pi-tags",
    },
    {
      path: "/bio",
      label: "bio",
      icon: "pi pi-fw pi-user",
    },
  ]

  const items: MenuItem[] = pathAndLabels.map(
    (pathAndLabel): MenuItem => {
      return {
        label: pathAndLabel.label,
        async command(e: { originalEvent: Event; item: MenuItem }) {
          await navigate(pathAndLabel.path)
        },
        icon: pathAndLabel.icon,
      }
    }
  )

  return (
    <header className={className}>
      <div className="main-heading">
        <h1 className="title">{title}</h1>
      </div>
      <nav>
        <Menubar model={items} end={() => <Search indices={searchIndices} />} />
      </nav>
    </header>
  )
}

export default styled(GlobalHeader)`
  .main-heading {
    background-color: var(--primary-color);
    color: var(--primary-color-text);
    text-align: center;
    margin: 0;
    align-items: center;

    h1 {
      margin: 0;
    }
  }
`

export const pageQuery = graphql`
  query GlobalHeader {
    site {
      siteMetadata {
        title
      }
    }
  }
`
