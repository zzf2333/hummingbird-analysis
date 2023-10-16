<script setup lang="ts">

const props = defineProps<{
    chartData: any[]
}>()

let series: any[] = []
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
    tooltip: {
        y: {
            formatter: function (val: number) {
                return val + " ETH"
            }
        }
    },
    plotOptions: {
        treemap: {
            enableShades: false,
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
                        color: '#64d884',
                    },
                ],
            },
        },
    },
})

function updateData(dataJson: any[]) {
    const data = dataJson.map(item => ({ x: item.lable, y: parseFloat(item.value) }))
    series = [{ data }]
}

watch(
    () => props.chartData,
    (chartData) => {
        updateData(chartData)
    },
    {
        immediate: true
    }
);
</script>

<template>
    <apexchart height="350px" type="treemap" :options="options" :series="series" />
</template>

<style lang="scss"></style>
