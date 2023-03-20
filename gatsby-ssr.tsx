import { CacheProvider } from '@emotion/react'

import { createMyCache } from './create-emotion-cache'

export const wrapRootElement = ({ element }) => (
  <CacheProvider value={createMyCache()}>{element}</CacheProvider>
)
