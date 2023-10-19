<script setup lang="ts">
import HomeSkeleton from './components/HomeSkeleton.vue'
import WalletReport from './components/WalletReport.vue'
import { fetchTransaction, fetchInternalTransferTransaction, fetchErc20TransferTransaction, fetchBalance } from '~/chain/parseTransaction';
import { useMessage } from 'naive-ui'


// test data
import allTransactions from '~/json/all.json';
import erc20Transactions from '~/json/erc20.json';
import transferTransactions from '~/json/transfer.json';

const message = useMessage()

const loading = ref(false)
const walletAddress = ref('')
const walletData = reactive({
    all: [],
    token: [],
    transfer: [],
    balance: '',
    address: ''
})

onMounted(() => {
    walletData.all = allTransactions || [];
    walletData.token = erc20Transactions || [];
    walletData.transfer = transferTransactions || [];
    walletData.balance = '29';
    walletData.address = '0x64339fb21E0D36f5CCC306dfab8e8bEeaB4DF70C'
})

function onInput() {
    const address = walletAddress.value;
    if (/^0x[0-9a-fA-F]{40}$/.test(address)) {
        getWalletData();
        loading.value = true;
    } else {
        walletAddress.value = '';
    }
}

async function getWalletData() {
    try {
        const responseBalance = await fetchBalance(walletAddress.value)
        const responseTxs = await fetchTransaction(walletAddress.value)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const responseErc20Txs = await fetchErc20TransferTransaction(walletAddress.value)
        const responseTransferTxs = await fetchInternalTransferTransaction(walletAddress.value)

        walletData.all = responseTxs.data.result || [];
        walletData.token = responseErc20Txs.data.result || [];
        walletData.transfer = responseTransferTxs.data.result || [];
        walletData.balance = responseBalance.data.result || '';
        walletData.address = walletAddress.value || ''

        console.log('all: ', JSON.stringify(walletData.all))
        console.log('token: ', JSON.stringify(walletData.token))
        console.log('transfer: ', JSON.stringify(walletData.transfer))
    } catch (error) {
        message.error('获取钱包数据异常，请稍后尝试~')
        console.error(error);
    }
}
</script>

<template>
    <div class="home" pb-20>
        <!-- search box -->
        <div fixed v-if="walletData.all.length <= 0"
            :class="['top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-9/12 md:max-w-xl', loading ? 'loading md:top-4/10' : '']">
            <div transition-all relative m-auto :class="[loading ? 'w-10' : '']">
                <input v-model="walletAddress" placeholder="查询的钱包地址" search-input w-full
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
        <WalletReport :walletData="walletData" v-else></WalletReport>
    </div>
</template>
