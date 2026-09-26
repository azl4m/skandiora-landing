import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {projectId: 'n2374y3w', dataset: 'production'},
  // Hosted free by Sanity at https://skandiora.sanity.studio (site.com/studio redirects here).
  studioHost: 'skandiora',
  deployment: {autoUpdates: true},
})
