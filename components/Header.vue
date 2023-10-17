<script setup lang="ts">
const app = useAppStore();

</script>
<template>
    <div p-5 flex justify-between items-center>
        <div class="logo" flex items-center>
            <img src="/logo.svg" w-10 />
            <div color-primary-500 dark:color-primary-400 m-2 text-lg>Hummingbird Analysis</div>
        </div>
        <div flex>
            <button class="!outline-none" @click="app.setShowEtherscanApiModal(true)" btn-icon>
                <div i-carbon-api-1 />
            </button>
            <button class="!outline-none" m-l-3 btn-icon>
                <div i-carbon-ibm-watson-language-translator />
            </button>
            <DarkToggle m-l-3 />
            <button class="!outline-none" m-l-3 btn-icon>
                <a i-carbon-logo-github href="https://github.com/zzf2333/hummingbird-analysis" target="_blank" block />
            </button>
        </div>
    </div>
</template>
  