<script setup lang="ts">
import { NModal, useMessage, useNotification } from 'naive-ui'

const app = useAppStore();
const notification = useNotification();
const message = useMessage()

const showModal = ref(false);
const etherscanApiValue = ref(app.etherscanApiKey);

onMounted(() => {
    notification.success({
        content: 'API Keys更新成功',
        meta: 'API Keys已成功保存在浏览器中，您可以愉快的使用分析功能了🎉',
        duration: 3000,
        keepAliveOnHover: true
    })
})

function updateEtherscanApiKey() {
    app.setShowEtherscanApiModal(false)
    if (!etherscanApiValue.value || etherscanApiValue.value.length !== 34) {
        etherscanApiValue.value = app.etherscanApiKey;
        return message.error('请输入正确的API KEYS格式')
    }
    app.setEtherscanApiKey(etherscanApiValue.value)
    showModal.value = false;
    notification.success({
        content: 'API Keys更新成功',
        meta: 'API Keys已成功保存在浏览器中，您可以愉快的使用分析功能了🎉',
        duration: 3000,
        keepAliveOnHover: true
    })
}
</script>
<template>
    <div p-5 flex justify-between items-center>
        <div class="logo" flex items-center>
            <img src="/logo.svg" w-10 />
            <div color-primary-500 dark:color-primary-400 m-2 text-lg>Hummingbird Analysis</div>
        </div>
        <div flex>
            <button class="!outline-none" @click="showModal = true" btn-icon>
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
    <!-- Etherscan API Modal -->
    <n-modal v-model:show="showModal">
        <div w-md mx-auto overflow-hidden rounded-lg bg-white shadow-xl>
            <div class="relative p-6">
                <button type="button" @click="showModal = false;"
                    class="absolute top-4 right-4 rounded-lg p-1 text-center font-medium text-slate-500 transition-all hover:bg-slate-100">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6">
                        <path
                            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </button>
                <h3 class="text-lg font-medium text-slate-900">Etherscan API Keys</h3>
                <div class="mt-4 text-sm text-slate-500 min-h-10">
                    <input type="text" v-model="etherscanApiValue"
                        class=" input block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="Please enter Etherscan API Keys" />
                </div>
            </div>
            <div class="flex justify-end gap-3 bg-slate-50 px-6 py-3">
                <button type="button" @click="showModal = false;"
                    class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400">Cancel</button>
                <button type="button" @click="updateEtherscanApiKey()"
                    class="rounded-lg border border-primary-500 bg-primary-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300">Confirm</button>
            </div>
        </div>
    </n-modal>
</template>
  