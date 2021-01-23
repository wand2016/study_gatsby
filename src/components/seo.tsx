import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

type MetaProps = JSX.IntrinsicElements["meta"]
type Props = {
  description?: string
  lang?: string
  meta?: MetaProps[]
  pageTitle?: string
}
const SEO: React.FC<Props> = ({ description, lang, meta, pageTitle }) => {
  const { site } = useStaticQuery<GatsbyTypes.SiteQuery>(pageQuery)
  pageTitle = pageTitle ?? "untitled"

  const metaDescription =
    (description || site?.siteMetadata?.description) ?? "no description"
  const defaultTitle = site?.siteMetadata?.title
  const defaultMeta: MetaProps[] = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: pageTitle,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: site?.siteMetadata?.social?.twitter || ``,
    },
    {
      name: `twitter:title`,
      content: pageTitle,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ]

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={pageTitle}
      titleTemplate={`%s | ${defaultTitle}`}
      meta={defaultMeta.concat(meta || [])}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object.isRequired),
  pageTitle: PropTypes.string.isRequired,
}

export default SEO

export const pageQuery = graphql`
  query Site {
    site {
      siteMetadata {
        title
        description
        social {
          twitter
        }
      }
    }
  }
`
