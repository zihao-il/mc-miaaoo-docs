import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "mc-miaaoo-docs",
    description: "mc-miaaoo-docs",
    lang: 'zh-CN',
    markdown: {
        theme: {
            light: 'min-light',
            dark: 'one-dark-pro'
        },
        lineNumbers: true,
    },


    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '主页', link: '/'},
            {text: '教程', link: '/init.md'},
            {text: 'API', link: '/api/index.md'}
        ],

        sidebar: [
            {text: '教程', link: '/init.md'},
            {
                items: [
                    {
                        text: 'API说明', link: '/api/index.md',
                        items: [
                            {text: '/list', link: '/api/list.md'},
                            {text: '/join', link: '/api/join.md'},
                            {text: '/getxuid', link: '/api/getxuid.md'},
                        ]
                    },
                ]
            },
            {text: '其他网页', link: '/site'}

        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/zihao-il/mc-miaaoo-docs'}
        ],

        footer: {
            message: 'MIT License',
            copyright: 'Copyright © 2025 mc-miaaoo-docs'
        },

        editLink: {
            pattern: 'https://github.com/zihao-il/mc-miaaoo-docs/tree/main/docs/:path',
            text: '在 GitHub 上编辑此页面'
        },

        docFooter: {
            prev: '上一页',
            next: '下一页'
        },

        outline: {
            label: '页面导航'
        },
        lastUpdated: {
            text: '最后更新于'
        },

        notFound: {
            title: '页面未找到',
            quote:
                '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
            linkLabel: '前往首页',
            linkText: '带我回首页'
        },

        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        skipToContentLabel: '跳转到内容'

    }
})
