import styled, { css } from "styled-components"
import SearchBox from "./search-box"

const searchInputFocus = css`
  border: none;
  box-shadow: silver 0 0 0.5em;
`

const searchInputNoFocus = css`
  border: 1px solid silver;
`

export default styled(SearchBox)`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin-bottom: 0;

  .SearchInput {
    outline: none;
    font-size: 1em;
    border-radius: 2px;
    color: ${({ theme }) => theme.foreground};
    ::placeholder {
      color: ${({ theme }) => theme.faded};
    }
    width: 10em;
    background: ${({ theme }) => theme.background};
    cursor: text;
    margin-left: -2em;
    padding-left: 2em;
    border-radius: 1em;
    height: 2em;
    ${({ hasFocus }) => (hasFocus ? searchInputFocus : searchInputNoFocus)};
  }

  .SearchIcon {
    width: 1em;
    margin: 0.3em;
    color: ${({ theme }) => theme.foreground};
    pointer-events: none;
  }
`
