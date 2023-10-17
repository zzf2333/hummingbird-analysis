<script setup lang="ts">
const props = defineProps<{
    type: string,
    chartData: any[]
}>()

const barChart = ref(null);

const colors = props.type === 'profit' ? ['#64d884', '#66DA26', '#546E7A', '#E91E63', '#FF9800'] : ['#f87171', '#66DA26', '#546E7A', '#E91E63', '#FF9800']
let options: any = {
    chart: {
        id: 'vuechart-analyse-bar',
        type: 'bar',
        height: 350,
        toolbar: {
            show: false
        },
    },
    title: {
        text: props.type === 'profit' ? '盈利前十令牌' : '亏损前十令牌',
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
        offsetX: -5,
        style: {
            fontSize: '10px',
            colors: [props.type === 'profit' ? '#209942' : '#dc2626'],
        },
    },
    tooltip: {
        y: {
            formatter: function (val: number) {
                return val + " ETH"
            }
        }
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
        categories: []
    },
}
let series: any[] = []


function updateData(dataJson: any[]) {
    const categories: any[] = dataJson.map(item => item.lable)
    const data = dataJson.map(item => item.value)

    options = {
        ...options, ...{
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
            }
        }
    }

    series = [{
        name: props.type === 'profit' ? '收益' : '损失',
        data,
    }]
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
    <apexchart ref="barChart" height="350px" type="bar" :options="options" :series="series" />
</template>

<style lang="scss"></style>
