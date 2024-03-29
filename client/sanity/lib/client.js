import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token:'sk7bYPbVRdSDaQkVPS8y3BxeVCVZMUCntP8jsiLt23WcJbRFMuMKt0ctdkNTcRE1W6cRtx2V3eVxndvEyZyGKKpjjUhdnmcddK6H05HrigPjZ91ZhyTyQ6w6I72df3Pwmi2eW9WTaIKc0g2Sr6J5wGi6UHE9EvB1LT047lgR1bcz5moEjp9n'
})
