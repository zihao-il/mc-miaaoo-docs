<!-- .vitepress/theme/Layout.vue -->
<script setup>
import DefaultTheme from 'vitepress/theme'
import Comment from './components/GiscusComment.vue'

const { Layout } = DefaultTheme
</script>

<template>
    <Layout>
        <template #doc-after>
            <Comment />
        </template>
    </Layout>
</template>