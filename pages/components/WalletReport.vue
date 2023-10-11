<script setup lang="ts">
import BarChart from './AnalyseChart/BarChart.vue'
import TreemapChart from './AnalyseChart/TreemapChart.vue'
import { toPng } from 'html-to-image';
import download from "downloadjs";
import { fetchTransaction } from '~/chain/parseTransaction';

const wallteAdderss = '0xe84e721327852104e744b71297923404ba59d81f';
const reportRefs = ref(null)

// dwon load image
function dwonLoadImage() {
    if (!reportRefs.value) return;
    toPng(reportRefs.value, {
        backgroundColor: '#f1fcf3',
        pixelRatio: 2
    })
        .then(function (dataUrl) {
            download(dataUrl, `${wallteAdderss}.png`);
        })
        .catch(function (error) {
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
                        {{ wallteAdderss.toUpperCase() }}
                    </span>
                </div>
                <div flex mt-10>
                    <div class="w-1/3" px-8 shadow-lg py-4 bg-primary-400 rounded-lg shadow-slate-200 relative>
                        <p text-white absolute bottom-3 right-3 text-xs>交易胜率</p>
                        <p text-7xl absolute text-white class="left-1/4	top-1/4">80<span text-3xl>%</span></p>
                    </div>
                    <div flex-1 px-8 shadow-lg py-8 rounded-lg shadow-slate-300 ml-3 bg-white>
                        <div grid grid-cols-3 gap-x-4 gap-y-6>
                            <div>
                                <p text-base text-primary-500>2022-09-12</p>
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
                                <p text-base text-primary-500>302</p>
                                <p text-xs text-primary-400>交易次数</p>
                            </div>
                            <div>
                                <p text-base text-primary-500>30.8012 <span text-sm>ETH</span></p>
                                <p text-xs text-primary-400>余额</p>
                            </div>
                            <div>
                                <p text-2xl text-primary-600 font-600>30.8012 <span text-sm>ETH</span></p>
                                <p text-xs text-primary-600>获利</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div mt-8 flex>
                    <div mr-2 flex-1 rounded-shadow>
                        <BarChart type="profit" />
                    </div>
                    <div ml-2 flex-1 rounded-shadow>
                        <BarChart type="loss" />
                    </div>
                </div>
                <div py-8 rounded-shadow>
                    <TreemapChart />
                </div>
            </div>
        </div>
    </ClientOnly>
</template>