import React, { useEffect, useState } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import styled from "styled-components"

type CertificationProp = {
  name?: string
  since?: string
  until?: string
  embed?: string
}
type PropsType = {
  certifications: CertificationProp[]
  className?: string
}

const Certifications: React.FC<PropsType> = ({ certifications, className }) => {
  type BadgeInnerHTMLs = Record<string, string | undefined>
  const [badgeInnerHTMLs, setBadgeInnerHTMLs] = useState<BadgeInnerHTMLs>({})

  const updateBadgeInnerHTMLs = () => {
    const badgeInnerHTMLs: BadgeInnerHTMLs = {}
    document.querySelectorAll(".badge-placeholder").forEach(badgeElem => {
      const name = (badgeElem as HTMLBaseElement).dataset.name
      badgeInnerHTMLs[name ?? ""] = badgeElem.innerHTML
    })
    setBadgeInnerHTMLs(badgeInnerHTMLs)
  }

  useEffect(() => {
    const script = document.createElement("script")
    script.setAttribute("type", "text/javascript")
    script.src = "https://www.youracclaim.com/assets/utilities/embed.js"

    // バッジのdivがiframeに置換されたあとで
    script.addEventListener("load", updateBadgeInnerHTMLs)

    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <div className={className}>
      <DataTable
        value={certifications}
        sortField={"since"}
        sortOrder={-1}
        dataKey={"name"}
      >
        <Column field="name" header="資格名" sortable />
        <Column field="since" header="取得日" sortable />
        <Column field="until" header="失効日" sortable />
        <Column
          field="embed"
          header="バッジ"
          body={(data: CertificationProp) => (
            <div
              className="badge-replaced"
              dangerouslySetInnerHTML={{
                __html: badgeInnerHTMLs[data.name ?? ""] ?? "",
              }}
            />
          )}
        />
      </DataTable>
      <aside>
        {
          // youracclaimのスクリプトでdivタグをiframeに置換したものを保持する用
          certifications.map(cert => (
            <div
              key={cert.name}
              className="badge-placeholder"
              data-name={cert.name}
              dangerouslySetInnerHTML={{ __html: cert.embed ?? "" }}
              style={{ display: "none" }}
            />
          ))
        }
      </aside>
    </div>
  )
}

export default styled(Certifications)`
  .badge-replaced {
    iframe {
      background-color: white;
    }
  }
`
