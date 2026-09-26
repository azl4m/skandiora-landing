import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {FIXED_SET, SINGLETONS, schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Skandiora Website',
  projectId: 'n2374y3w',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    // Query playground for developers only; hidden from editors.
    visionTool({defaultApiVersion: '2026-02-01'}),
  ],

  schema: {
    types: schemaTypes,
    // Hide one-of-a-kind pages and fixed service pages from the global "Create new" menu.
    templates: (templates) => templates.filter(({schemaType}) => !SINGLETONS.includes(schemaType) && !FIXED_SET.includes(schemaType)),
  },

  document: {
    actions: (actions, {schemaType}) => {
      if (SINGLETONS.includes(schemaType) || FIXED_SET.includes(schemaType)) {
        return actions.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
      }
      return actions
    },
  },

  tools: (tools, {currentUser}) =>
    currentUser?.roles.some((role) => role.name === 'administrator') ? tools : tools.filter((tool) => tool.name !== 'vision'),
})
