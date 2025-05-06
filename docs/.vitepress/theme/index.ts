// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'

const customTheme: Theme = {
    extends: DefaultTheme,
    Layout
}

export default customTheme