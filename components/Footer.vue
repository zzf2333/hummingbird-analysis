<script setup lang="ts">
import { NPopover } from 'naive-ui'
</script>
<template>
    <div>
        <n-popover trigger="click">
            <template #trigger>
                <button type="button" fixed right-6 bottom-10 text-xl bg-primary-100 border border-primary-300 w-12 h-12
                    rounded-full border-2 shadow-lg shadow-primary-300 text-center hover:border-primary-400
                    hover:color-primary-700 color-primary-500>
                    <div i-carbon-thumbs-up-filled inline-flex></div>
                </button>
            </template>
            <span>
                <div class="p-4" max-w-md>
                    <h3 class="text-xl font-medium text-gray-900">打赏</h3>
                    <p class="mt-1 text-gray-500">如果你觉得这分析对您有帮助您可以对作者进行捐赠打赏~</p>
                    <h4 class="text-base font-medium text-gray-900 mt-6">Etherscan/BNB</h4>
                    <p class="mt-1 text-gray-700">0x941cf9e19eab87d7ea05f5e650878acb6d1c2a4a</p>
                    <div text-center my-4>
                        <img inline src="~/assets/image/wallet.jpg" class="w-6/12" />
                    </div>
                    <!-- <h4 class="text-base font-medium text-gray-900 mt-6">Tron(TRC20) - USDT</h4>
                    <p class="mt-1 text-gray-700"></p> -->
                </div>
            </span>
        </n-popover>
    </div>
</template>
  