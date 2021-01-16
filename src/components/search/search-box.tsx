import React, { FocusEventHandler } from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { SearchBoxProvided } from "react-instantsearch-core"
import { InputText } from "primereact/inputtext"

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
    <span className="p-input-icon-left">
      <i className="pi pi-search" />
      <InputText
        value={currentRefinement}
        onChange={e => refine((e.target as HTMLInputElement).value)}
        placeholder="キーワード"
        aria-label="Search"
        onFocus={onFocus}
      />
    </span>
  </form>
)

const SearchBox = connectSearchBox(form)

export default SearchBox
