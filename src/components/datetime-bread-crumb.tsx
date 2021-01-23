import React from "react"
import { navigate } from "gatsby"
import moment from "moment"
import { BreadCrumb } from "primereact/breadcrumb"
import { MenuItem } from "primereact/api"

type PropsType = {
  date: string
}
const DatetimeBreadCrumb: React.FC<PropsType> = ({ date }) => {
  const dateLocal = moment(date).local()

  const year = dateLocal.format("YYYY") ?? ""
  const month = dateLocal.format("MM") ?? ""
  const day = dateLocal.format("DD") ?? ""
  const time = dateLocal.format("HH:mm:SS") ?? ""

  const breadCrumbItems: MenuItem[] = [
    {
      label: year,
      async command(e: { originalEvent: Event; item: MenuItem }) {
        await navigate(`/time/${year}/`)
      },
    },
    {
      label: month,
      async command(e: { originalEvent: Event; item: MenuItem }) {
        await navigate(`/time/${year}/${month}/`)
      },
    },
    {
      label: day,
      async command(e: { originalEvent: Event; item: MenuItem }) {
        await navigate(`/time/${year}/${month}/${day}/`)
      },
    },
    {
      label: time,
    },
  ]

  const home: MenuItem = {
    icon: "pi pi-calendar",
    async command(e: { originalEvent: Event; item: MenuItem }) {
      await navigate("/calendar")
    },
  }
  return <BreadCrumb model={breadCrumbItems} home={home} />
}

export default DatetimeBreadCrumb
