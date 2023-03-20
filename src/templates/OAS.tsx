import React from 'react'
import SwaggerUI from 'swagger-ui-react'
import { graphql, PageProps } from 'gatsby'
import '../styles/github.css'
import 'swagger-ui-react/swagger-ui.css'
import { GitHubCorner } from '../components/GitHubCorner'

export const query = graphql`
  query ($slug: String) {
    specification(fields: { slug: { eq: $slug } }) {
      parent {
        internal {
          content
        }
      }
    }
  }
`

interface Specification {
  parent: {
    internal: {
      content: string
    }
  }
}

interface Response {
  specification: Specification
}

export default function OAS({ data }: PageProps<Response>) {
  return (
    <>
      <GitHubCorner />
      <SwaggerUI spec={data.specification.parent.internal.content} />
    </>
  )
}
