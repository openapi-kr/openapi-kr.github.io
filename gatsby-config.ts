import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  trailingSlash: 'never',
  plugins: [
    'gatsby-plugin-pnpm',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-transformer-yaml',
      options: {
        typeName: 'Specification',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'specifications',
        path: './specifications/specifications',
      },
    },
  ],
}

export default config
