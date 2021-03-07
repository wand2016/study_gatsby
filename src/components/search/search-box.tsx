import React, {
  FocusEventHandler,
  ChangeEventHandler,
  ChangeEvent,
} from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { SearchBoxProvided } from "react-instantsearch-core"
import { InputText } from "primereact/inputtext"

type Props = {
  className?: string
  onChange?: ChangeEventHandler
  onFocus?: FocusEventHandler
} & SearchBoxProvided

const form: React.FC<Props> = ({
  refine,
  currentRefinement,
  className,
  onChange,
  onFocus,
}) => (
  <form className={className}>
    <span className="p-input-icon-left">
      <i className="pi pi-search" />
      <InputText
        value={currentRefinement}
        onChange={e => {
          refine((e.target as HTMLInputElement).value)
          if (onChange) {
            onChange(e as ChangeEvent<HTMLInputElement>)
          }
        }}
        onFocus={onFocus}
        placeholder="キーワード"
        aria-label="Search"
      />
    </span>
  </form>
)

const SearchBox = connectSearchBox(form)

export default SearchBox
