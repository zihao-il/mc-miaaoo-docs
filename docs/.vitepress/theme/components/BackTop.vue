<script setup>
import {computed, onBeforeUnmount, onMounted, ref} from "vue";

const showBackTop = ref(false); // 初始状态设为false
const scrollProgress = ref(0);

// 圆形进度条计算
const radius = 42;
const circumference = computed(() => 2 * Math.PI * radius);

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

// 使用更高效的节流函数
function throttle(fn, delay = 50) {
    let timer = null;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args);
                timer = null;
            }, delay);
        }
    };
}

const updateScrollProgress = () => {
    const {scrollY, innerHeight} = window;
    const {scrollHeight} = document.documentElement;
    const totalScroll = scrollHeight - innerHeight;
    scrollProgress.value = totalScroll > 0 ? Math.min(scrollY / totalScroll, 1) : 0;
};

const handleScroll = throttle(() => {
    // 当滚动超过100px时显示，否则隐藏
    showBackTop.value = window.scrollY > 100;
    updateScrollProgress();
});

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    updateScrollProgress();
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
    <Transition name="fade">
        <div v-show="showBackTop" class="back-top-container">
            <svg class="progress-ring" viewBox="0 0 100 100">
                <circle class="progress-ring-background" cx="50" cy="50" r="42"/>
                <circle
                    :style="{'stroke-dashoffset': circumference - (scrollProgress * circumference)}"
                    class="progress-ring-circle"
                    cx="50"
                    cy="50"
                    r="42"
                />
            </svg>
            <div
                class="vitepress-backTop-main"
                title="回到顶部"
                @click="scrollToTop()"
            >
                联
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.back-top-container {
    position: fixed;
    z-index: 999;
    right: 20px;
    bottom: 20px;
    width: 60px;
    height: 60px;
}

.vitepress-backTop-main {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    transform: translate(-50%, -50%);
    color: #FFFFFF;
    border-radius: 50%;
    background-color: #5672CD;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.vitepress-backTop-main:hover {
    background-color: #3A5CCC;
}

.progress-ring {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
}

.progress-ring-background {
    fill: none;
    stroke: rgba(86, 114, 205, 0.15);
    stroke-width: 3;
}

.progress-ring-circle {
    transition: stroke-dashoffset 0.15s ease-out;
    fill: none;
    stroke: #5672CD;
    stroke-width: 3;
    stroke-dasharray: 264; /* 2 * π * 42 */
    stroke-linecap: round;
}

.icon {
    width: 24px;
    height: 24px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>