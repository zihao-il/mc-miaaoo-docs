// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import type {Theme} from 'vitepress'
import Layout from './Layout.vue'
import PostButton from "./components/PostButton.vue"


const customTheme: Theme = {
    extends: DefaultTheme,
    Layout,
    enhanceApp({app}) {
        app.component('PostButton', PostButton)

    },
}

export default customTheme