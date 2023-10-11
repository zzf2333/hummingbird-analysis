<script setup lang="ts">
const { type = 'profit' } = defineProps<{
    type: string
}>()

const categories = type === 'profit' ? ['LINK', 'BTC', 'ETH', 'OP', 'ARB', 'SUI', 'MASK', 'UNI', 'BNB', 'ZRX'] : ['HIFI', 'BCH', 'APE', 'TRX', 'BLZ', 'AKRO', 'BACK', 'CFX', 'ADA', 'SHIB']
const data = type === 'profit' ? [40.3702, 38.3374, 37.9801, 32.8322, 28.8322, 25.8322, 10.8322, 6.8322, 2.8322, 1.8322] : [-9.9223, -8.9223, -7.9223, -6.9223, -5.9223, -4.9223, -3.9223, -2.9223, -1.9223, -0.9223]

const yaxis = type === 'profit'
    ? {}
    : {
        yaxis: {
            opposite: true,
        },
    }
const colors = type === 'profit' ? ['#64d884', '#66DA26', '#546E7A', '#E91E63', '#FF9800'] : ['#f87171', '#66DA26', '#546E7A', '#E91E63', '#FF9800']
const options = reactive({
    chart: {
        id: 'vuechart-analyse-bar',
        type: 'bar',
        height: 350,
        toolbar: {
            show: false
        },
    },
    title: {
        text: type === 'profit' ? '盈利前十令牌' : '亏损前十令牌',
    },
    colors,
    plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: true,
            dataLabels: {
                position: 'top',
            },
        },
    },
    legend: {
        show: false,
    },
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: true,
        offsetX: 52,
        style: {
            fontSize: '11px',
            colors: [type === 'profit' ? '#209942' : '#dc2626'],
        },
    },
    xaxis: {
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        labels: {
            show: false,
        },
        tickAmount: 5,
        categories,
    },
    ...yaxis,
})
const series = reactive([{
    name: '收益',
    data,
}])
</script>

<template>
    <apexchart height="350px" type="bar" :options="options" :series="series" />
</template>

<style lang="scss"></style>
