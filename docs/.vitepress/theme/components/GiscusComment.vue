<!-- .vitepress/theme/components/Comment.vue -->
<script setup>
import { useData, useRoute } from 'vitepress'
import { watch, onMounted } from 'vue'
import giscusTalk from 'vitepress-plugin-comment-with-giscus'

const { frontmatter } = useData()
const route = useRoute()

const initGiscus = () => {
    giscusTalk(
        {
            repo: 'zihao-il/mc-miaaoo-docs',
            repoId: 'R_kgDOOfercA',
            category: 'Announcements',
            categoryId: 'DIC_kwDOOfercM4Cp0Ps',
            mapping: 'pathname',
            inputPosition: 'bottom',
            lang: 'zh-CN',
        },
        { frontmatter, route },
        false
    )
}

onMounted(initGiscus)
watch(() => route.path, initGiscus)
</script>

<template>
    <div class="giscus-wrapper"></div>
</template>