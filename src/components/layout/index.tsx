import Layout from "./layout"
import styled from "styled-components"

export default styled(Layout)`
  margin: var(--spacing-0) auto;
  max-width: var(--maxWidth-wrapper);
  padding: var(--spacing-10) var(--spacing-5);

  .global-header {
    margin-bottom: var(--spacing-12);
  }

  .main-heading {
    font-size: var(--fontSize-7);
    margin: 0;
  }

  .header-link-home {
    font-weight: var(--fontWeight-bold);
    font-family: var(--font-heading);
    text-decoration: none;
    font-size: var(--fontSize-2);
  }
`
