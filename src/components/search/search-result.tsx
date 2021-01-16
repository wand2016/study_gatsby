import { Link } from "gatsby"
import React from "react"
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy,
} from "react-instantsearch-dom"
import { Hit } from "react-instantsearch-core"
import { Index as IndexProp } from "./types"
import { Card } from "primereact/card"

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits

  return hitCount > 0 ? (
    <div className="HitCount">
      {hitCount} result{hitCount !== 1 ? "s" : ""}
    </div>
  ) : null
})

type PageHitProps = {
  hit: Hit
}
const PageHit: React.FC<PageHitProps> = ({ hit }) => (
  <Card
    title={
      <Link to={hit.slug}>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </Link>
    }
  >
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </Card>
)

type HitsInIndexProps = {
  index: IndexProp
}
// HitsProps
const HitsInIndex: React.FC<HitsInIndexProps> = ({ index }) => (
  <Index indexName={index.name}>
    <HitCount />
    <Hits hitComponent={PageHit} />
  </Index>
)

type SearchResultProps = {
  indices: IndexProp[]
  className?: string
}
const SearchResult: React.FC<SearchResultProps> = ({ indices, className }) => (
  <div className={className}>
    {indices.map(index => (
      <HitsInIndex index={index} key={index.name} />
    ))}
    <PoweredBy />
  </div>
)

export default SearchResult
