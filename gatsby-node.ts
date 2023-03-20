import assert from 'assert'
import * as path from 'path'
import type { GatsbyNode } from 'gatsby'
import { createFilePath } from 'gatsby-source-filesystem'

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Specification') {
    assert(node.parent != null, 'Specification에는 parent가 있어야합니다')
    const parent = getNode(node.parent)

    assert(parent?.internal.type === 'File')
    assert(typeof parent.relativePath === 'string')

    const relativeFilePath = createFilePath({
      node,
      getNode,
      trailingSlash: false,
    })

    createNodeField({
      node,
      name: 'slug',
      value: relativeFilePath,
    })
  }
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions
  const result = await graphql<{
    allSpecification: { nodes: Array<{ fields: { slug: string } }> }
  }>(`
    {
      allSpecification {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `)

  assert(result.data != null, 'result.data는 null이 아니어야합니다')

  result.data.allSpecification.nodes.forEach(({ fields: { slug } }) =>
    createPage({
      path: `/oas${slug}`,
      component: path.resolve('./src/templates/OAS.tsx'),
      context: {
        slug: slug,
      },
    })
  )
}
