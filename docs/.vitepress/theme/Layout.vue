<!-- .vitepress/theme/Layout.vue -->
<script setup>
import DefaultTheme from 'vitepress/theme'
import Comment from './components/GiscusComment.vue'
import BackTop from './components/BackTop.vue'

const {Layout} = DefaultTheme
</script>

<template>
    <Layout>
        <template #doc-after>
            <Comment/>
        </template>
        <template #doc-footer-before>
            <BackTop/>
        </template>
    </Layout>
</template>