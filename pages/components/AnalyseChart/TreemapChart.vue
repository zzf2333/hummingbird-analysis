<script setup lang="ts">
const series: any = [{
    data: [{ x: 'LINK', y: 40.3702 }, { x: 'BTC', y: 38.3374 }, { x: 'ETH', y: 37.9801 }, { x: 'OP', y: 32.8322 }, { x: 'ARB', y: 28.8322 }, { x: 'SUI', y: 25.8322 }, { x: 'MASK', y: 10.8322 }, { x: 'UNI', y: 6.8322 }, { x: 'BNB', y: 2.8322 }, { x: 'ZRX', y: 1.8322 }, { x: 'HIFI', y: -9.9223 }, { x: 'BCH', y: -8.9223 }, { x: 'APE', y: -7.9223 }, { x: 'TRX', y: -6.9223 }, { x: 'BLZ', y: -5.9223 }, { x: 'AKRO', y: -4.9223 }, { x: 'BACK', y: -3.9223 }, { x: 'CFX', y: -2.9223 }, { x: 'ADA', y: -1.9223 }, { x: 'SHIB', y: -0.9223 }],
}]
const options = reactive({
    legend: {
        show: false,
    },
    chart: {
        height: 350,
        type: 'treemap',
        toolbar: {
            show: false
        },
    },
    title: {
        text: '前十盈亏总览',
    },
    dataLabels: {
        enabled: true,
        style: {
            fontSize: '11px',
        },
        formatter(text: string, op: any) {
            return [text, op.value]
        },
        offsetY: -4,
    },
    plotOptions: {
        treemap: {
            enableShades: true,
            shadeIntensity: 0.5,
            reverseNegativeShade: true,
            colorScale: {
                ranges: [
                    {
                        from: -1000,
                        to: 0,
                        color: '#f87171',
                    },
                    {
                        from: 0,
                        to: 1000,
                        color: '#2dba54',
                    },
                ],
            },
        },
    },
})
</script>

<template>
    <apexchart height="350px" type="treemap" :options="options" :series="series" />
</template>

<style lang="scss"></style>
