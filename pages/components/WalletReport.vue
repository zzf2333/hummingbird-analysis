<script setup lang="ts">
import BarChart from './AnalyseChart/BarChart.vue'
import TreemapChart from './AnalyseChart/TreemapChart.vue'
import { toPng } from 'html-to-image';
import download from "downloadjs";
import _ from 'lodash'
import { formatNumber } from "~/utils";
import { fetchTransaction, fetchInternalTransferTransaction, fetchErc20TransferTransaction, parseTransaction } from '~/chain/parseTransaction';

const walletAddress = ref('0xe84e721327852104e744b71297923404ba59d81f');
const reportRefs = ref(null)
const swapData = ref<any[]>([])
const tokenProfit = ref<any[]>([])
const topMaxTen = ref<any[]>([])
const topMinTen = ref<any[]>([])
const topMapTen = ref<any[]>([])
const winRate = ref('0');
const cumulativeIncome = ref('0');
const swapCount = ref(0);

onMounted(() => {
    getWalletData()
})

const startTime = computed(() => {
    const maxObject = _.minBy(swapData.value, 'timeStamp');
    return maxObject ? useDateFormat(new Date(maxObject.timeStamp * 1000), 'YYYY-MM-DD').value : '';
})

function getSwapTokenRecord(data: any[]) {
    const tokenData = _(data)
        .map(item => {
            if (item.tokenIn.symbol !== 'ETH') {
                item.side = 'sell'
                item.symbol = item.tokenIn.symbol;
            }
            if (item.tokenOut.symbol !== 'ETH') {
                item.side = 'buy'
                item.symbol = item.tokenOut.symbol;
            }
            return item
        })
        .groupBy(item => item.symbol)
        .values()
        .value();

    const tokenProfitData: any[] = [];
    tokenData.map((records: any[]) => {
        let eth = 0;
        let token = null;

        records.forEach((item: any) => {
            if (item.side === 'sell') {
                eth += item.amountOut
            } else if (item.side === 'buy') {
                eth -= item.amountIn;
            }
        })
        records[0].side === 'sell' ? token = records[0].tokenIn : token = records[0].tokenOut
        tokenProfitData.push({
            records,
            eth,
            token,
        })
    });
    return { tokenData, tokenProfitData };
}

async function getWalletData() {
    if (!walletAddress.value) return ''
    const responseTxs = await fetchTransaction(walletAddress.value)
    const responseErc20Txs = await fetchErc20TransferTransaction(walletAddress.value)
    const responseTransferTxs = await fetchInternalTransferTransaction(walletAddress.value)
    //console.log(responseTxs.data.result);
    swapCount.value = responseTxs.data.result.length;
    swapData.value = parseTransaction(responseTxs.data.result || [], responseErc20Txs.data.result || [], responseTransferTxs.data.result || [])
    const swapTokenRecordData = getSwapTokenRecord(swapData.value);
    tokenProfit.value = swapTokenRecordData.tokenProfitData;


    // Top ten profit data
    const sortedMaxData = tokenProfit.value.sort((a, b) => b.eth - a.eth);
    topMaxTen.value = sortedMaxData.slice(0, 10).map(item => ({ lable: item.token.symbol, value: formatNumber(item.eth) }));
    // Top ten data of loss
    const sortedMinData = tokenProfit.value.sort((a, b) => a.eth - b.eth);
    topMinTen.value = sortedMinData.slice(0, 10).map(item => ({ lable: item.token.symbol, value: formatNumber(item.eth) }));
    // Overview
    topMapTen.value = [...topMaxTen.value, ...topMinTen.value];
    // Winning rate calculation
    const profitCount = tokenProfit.value.filter(item => item.eth > 0).length;
    winRate.value = ((profitCount / tokenProfit.value.length) * 100).toFixed(2);
    // Cumulative income
    cumulativeIncome.value = formatNumber(tokenProfit.value.reduce((total, item) => total + item.eth, 0));
}

// dwon load image
function dwonLoadImage() {
    if (!reportRefs.value) return;
    toPng(reportRefs.value, {
        backgroundColor: '#f1fcf3',
        pixelRatio: 2
    }).then(function (dataUrl) {
        download(dataUrl, `${walletAddress}.png`);
    }).catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
}
</script>

<template>
    <ClientOnly>
        <div relative max-w-3xl text-sm m-5 md:mx-auto>
            <div absolute top-1 right--10 btn-icon i-carbon-download text-primary-500 dark:text-primary-300
                @click="dwonLoadImage">
            </div>
            <div ref="reportRefs" px-4 py-8 class="border" w-3xl bg-white rounded-md border-primary-200 shadow-lg
                shadow-primary-200>
                <div text-xl text-center truncate text-primary-500>
                    <span relative inline-block>
                        <img src="/logo.svg" w-6 absolute left--8 />
                        {{ walletAddress.toUpperCase() }}
                    </span>
                </div>
                <div flex mt-10>
                    <div class="w-1/3" px-8 shadow-lg py-4 bg-primary-400 rounded-lg shadow-slate-200 relative>
                        <p text-white absolute bottom-3 right-3 text-xs>交易胜率</p>
                        <p text-6xl text-white text-center my-9 class="left-1/4	top-1/4">{{ winRate
                        }}<span text-3xl>%</span></p>
                    </div>
                    <div flex-1 px-8 shadow-lg py-8 rounded-lg shadow-slate-300 ml-3 bg-white>
                        <div grid grid-cols-3 gap-x-4 gap-y-6>
                            <div>
                                <p text-base text-primary-500>{{ startTime }}</p>
                                <p text-xs text-primary-400>开始时间</p>
                            </div>
                            <div>
                                <p text-base text-primary-500>0.2332 <span text-sm>ETH</span></p>
                                <p text-xs text-primary-400>转入</p>
                            </div>
                            <div>
                                <p text-base text-primary-500>30.8012 <span text-sm>ETH</span></p>
                                <p text-xs text-primary-400>转出</p>
                            </div>
                            <div>
                                <p text-base text-primary-500>{{ swapCount }}</p>
                                <p text-xs text-primary-400>交易次数</p>
                            </div>
                            <div>
                                <p text-base text-primary-500>30.8012 <span text-sm>ETH</span></p>
                                <p text-xs text-primary-400>余额</p>
                            </div>
                            <div>
                                <p text-2xl text-primary-600 font-600>{{ cumulativeIncome }}<span text-sm>ETH</span></p>
                                <p text-xs text-primary-600>获利</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div mt-8 flex>
                    <div mr-2 flex-1 rounded-shadow>
                        <BarChart type="profit" :chartData="topMaxTen" />
                    </div>
                    <div ml-2 flex-1 rounded-shadow>
                        <BarChart type="loss" :chartData="topMinTen" />
                    </div>
                </div>
                <div py-8 rounded-shadow>
                    <TreemapChart :chartData="topMapTen" />
                </div>
            </div>
        </div>
    </ClientOnly>
</template>