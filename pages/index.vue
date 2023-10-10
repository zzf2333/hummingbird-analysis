<script setup lang="ts">
import HomeSkeleton from './components/HomeSkeleton.vue'
import WalletReport from './components/WalletReport.vue'

const loading = ref(false)
const data = false;
const walletAddress = ref('')

function onInput() {
    const address = walletAddress.value;
    if (/^0x[0-9a-fA-F]{40}$/.test(address)) {
        loading.value = true;
    } else {
        walletAddress.value = '';
    }
}
</script>

<template>
    <div class="home" pb-20>
        <!-- search box -->
        <div fixed v-if="data"
            :class="['top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-9/12 md:max-w-xl', loading ? 'loading md:top-4/10' : '']">
            <div transition-all relative m-auto :class="[loading ? 'w-10' : '']">
                <input v-model="walletAddress" placeholder="查询的钱包地址" input w-full
                    :class="[loading ? 'px-5 border-0 outline-0' : '']" @input="onInput" />
                <svg v-if="loading" absolute top-2 right-2.2 class="animate-spin h-5 w-5 text-primary-500"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                <div v-else i-carbon-chart-combo absolute right-3 top-2.2 text-primary-700></div>
            </div>
            <HomeSkeleton v-if="loading"></HomeSkeleton>
        </div>
        <!-- report view -->
        <WalletReport v-else></WalletReport>
    </div>
</template>
