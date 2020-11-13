import React, { FocusEventHandler } from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { Search as SearchIcon } from "@styled-icons/fa-solid"
import { SearchBoxProvided } from "react-instantsearch-core"

type Props = {
  className?: string
  onFocus?: FocusEventHandler
  hasFocus?: boolean
} & SearchBoxProvided

const form: React.FC<Props> = ({
  refine,
  currentRefinement,
  className,
  onFocus,
}) => (
  <form className={className}>
    <input
      className="SearchInput"
      type="text"
      placeholder="検索"
      aria-label="Search"
      onChange={e => refine(e.target.value)}
      value={currentRefinement}
      onFocus={onFocus}
    />
    <SearchIcon className="SearchIcon" />
  </form>
)

const SearchBox = connectSearchBox(form)

export default SearchBox
