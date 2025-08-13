<script lang="ts" setup>
import {ref, onMounted} from "vue";

const props = defineProps<{
    url?: string;
    method?: string;
    body?: Record<string, any>;
}>();


const page = ref<JSON>();
const bodyInput = ref(
    props.body ? JSON.stringify(props.body, null, 2) : '{}'
)

const getInput = ref(
    `${props.body}`
)


const fetchVersion = async () => {
    let url: string;
    if (props.method === 'GET') {
        url = `${props.url}?${getInput.value}`
    } else {
        url = props.url
    }

    const response = await fetch(`https://api.miaaoo.com/${url}`, {
        method: props.method ?? 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: props.method === 'POST'
            ? bodyInput.value
            : undefined
    });

    page.value = await response.json();
};
</script>

<template>
    <h4 style="margin-bottom: 0.25em; font-weight: 500;">接口请求测试:</h4>
    <textarea v-if="props.method === 'POST'" v-model="bodyInput" placeholder="请输入请求参数" rows="4"></textarea>
    <input
        v-if="props.method === 'GET'"
        v-model="getInput"
        class="param-input"
        placeholder="请输入请求参数"
        type="text"
    />
    <button class="sendBtn" @click="fetchVersion">发送请求</button>
    <details class="details custom-block">
        <summary>点我查看数据</summary>
        <div class="vp-code-block-title">
            <div class="vp-code-block-title-bar"><span class="vp-code-block-title-text" data-title="json5">json5</span>
            </div>
            <div class="language-json5 vp-adaptive-theme line-numbers-mode">
                <button class="copy" title="Copy Code"></button>
                <span class="lang">json5</span>
                <pre>{{ page }}</pre>

            </div>
        </div>
    </details>
</template>
<style>
textarea {
    font-size: 14px;
    width: 100%;
    padding: 0.75em 1em;
    resize: vertical;
    transition: border-color 0.2s ease;
    color: var(--vp-c-text-1);
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;

    background-color: var(--vp-c-bg-soft);
}

.sendBtn {
    font-size: 14px;
    margin-top: 1em;
    padding: 0.5em 1.2em;
    cursor: pointer;
    transition: background-color 0.2s ease;
    color: var(--vp-button-brand-text);
    border-color: var(--vp-button-brand-border);
    border-radius: 6px;
    background-color: var(--vp-button-brand-bg);
}

.sendBtn:hover {
    color: var(--vp-button-brand-hover-text);
    border-color: var(--vp-button-brand-hover-border);
    background-color: var(--vp-button-brand-hover-bg);
}

.param-input {
    font-size: 14px;
    box-sizing: border-box;
    width: 100%;
    padding: 0.75em;
    color: var(--vp-c-text-1);
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    background-color: var(--vp-c-bg);
}
</style>