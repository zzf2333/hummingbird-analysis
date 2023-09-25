<script setup lang="ts">
const online = useOnline()
const loading = ref(true)
</script>

<template>
    <div class="home">
        <!-- search box -->
        <div fixed :class="['top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2', loading ? 'loading top-4/10' : '']">
            <div transition-all w-xl relative class="input-box">
                <input placeholder="查询的钱包地址" input w-full :class="[loading ? 'px-5' : '']" />
                <svg v-if="loading" absolute top-2 right-2.2 class="animate-spin h-5 w-5 text-primary-500"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                <div v-else i-carbon-chart-combo absolute right-3 top-2.2 text-primary-700></div>
            </div>
            <div v-if="loading"
                class="border border-primary-400 shadow rounded-md p-4 m-4 w-xl max-w-sm w-full mx-auto transition-all">
                <div class="animate-pulse flex space-x-4">
                    <div class="rounded-full bg-primary-200 h-10 w-10"></div>
                    <div class="flex-1 space-y-6 py-1">
                        <div class="h-2 bg-primary-200 rounded"></div>
                        <div class="space-y-3">
                            <div class="grid grid-cols-3 gap-4">
                                <div class="h-2 bg-primary-200 rounded col-span-2"></div>
                                <div class="h-2 bg-primary-200 rounded col-span-1"></div>
                            </div>
                            <div class="h-2 bg-primary-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style>
.input-box {
    width: 2.5rem;
}
</style>