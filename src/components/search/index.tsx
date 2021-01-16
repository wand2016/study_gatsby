import algoliasearch from "algoliasearch/lite"
import React, { useRef } from "react"
import { InstantSearch } from "react-instantsearch-dom"
import SearchBox from "./search-box"
import SearchResult from "./search-result"
import { Index } from "./types"
import { OverlayPanel } from "primereact/overlaypanel"

export type { Index }

type Props = {
  indices: Index[]
}

const Search: React.FC<Props> = ({ indices }) => {
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID ?? "no APP_ID",
    process.env.GATSBY_ALGOLIA_SEARCH_KEY ?? "no SEARCH_KEY"
  )

  const op = useRef<OverlayPanel>(null)

  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName={indices[0].name}>
        <SearchBox
          onFocus={e => op.current?.show(e, e.target)}
          onChange={e => op.current?.show(e, e.target)}
        />
        <OverlayPanel
          ref={op}
          dismissable={true}
          style={{
            maxHeight: "70vh",
            overflowY: "scroll",
          }}
        >
          <SearchResult indices={indices} />
        </OverlayPanel>
      </InstantSearch>
    </div>
  )
}

export default Search
