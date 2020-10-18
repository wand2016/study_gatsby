import algoliasearch from "algoliasearch/lite"
import React, { createRef, useState } from "react"
import { InstantSearch } from "react-instantsearch-dom"
import { ThemeProvider } from "styled-components"
import StyledSearchBox from "./styled-search-box"
import StyledSearchResult from "./styled-search-result"
import StyledSearchRoot from "./styled-search-root"
import useClickOutside from "./use-click-outside"
import { Index } from "./types"

export type { Index }

const theme = {
  foreground: "#050505",
  background: "white",
  faded: "#888",
}

type Props = {
  indices: Index[]
}

const Search: React.FC<Props> = ({ indices }) => {
  const rootRef = createRef<HTMLDivElement>()
  const [query, setQuery] = useState<any[]>()
  const [hasFocus, setFocus] = useState(false)
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID ?? "no APP_ID",
    process.env.GATSBY_ALGOLIA_SEARCH_KEY ?? "no SEARCH_KEY"
  )

  useClickOutside(rootRef, () => setFocus(false))

  return (
    <ThemeProvider theme={theme}>
      <StyledSearchRoot ref={rootRef}>
        <InstantSearch
          searchClient={searchClient}
          indexName={indices[0].name}
          onSearchStateChange={({ query }) => setQuery(query)}
        >
          <StyledSearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
          <StyledSearchResult
            show={query && query.length > 0 && hasFocus}
            indices={indices}
          />
        </InstantSearch>
      </StyledSearchRoot>
    </ThemeProvider>
  )
}

export default Search
