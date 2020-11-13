import Layout from "./layout"
import styled from "styled-components"

export default styled(Layout)`
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;

  margin: var(--spacing-0) auto;
  max-width: var(--maxWidth-wrapper);

  .header-link-home {
    font-weight: var(--fontWeight-bold);
    font-family: var(--font-heading);
    text-decoration: none;
    font-size: var(--fontSize-2);
  }

  main {
    margin: var(--spacing-4);
  }
`
