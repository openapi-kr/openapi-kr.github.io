import createCache from '@emotion/cache'

export const createMyCache = () =>
  createCache({
    key: 'open-api-docs',
    stylisPlugins: [],
  })

export const myCache = createMyCache()
