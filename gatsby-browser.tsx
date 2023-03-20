import { CacheProvider } from '@emotion/react'

import { myCache } from './create-emotion-cache'

export const wrapRootElement = ({ element }) => (
  <CacheProvider value={myCache}>{element}</CacheProvider>
)
