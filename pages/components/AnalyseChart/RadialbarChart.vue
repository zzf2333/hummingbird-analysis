<script setup lang="ts">
const { title = '' } = defineProps<{
    title: string
}>()
const options = reactive({
    chart: {
        height: 350,
        type: 'radialBar',
    },
    colors: ['#8de8a6', '#fca5a5', '#546E7A', '#E91E63', '#FF9800'],
    title: {
        text: title,
    },
    plotOptions: {
        radialBar: {
            dataLabels: {
                name: {
                    fontSize: '22px',
                },
                value: {
                    fontSize: '16px',
                },
                total: {
                    show: true,
                    label: title,
                },
            },
        },
    },
    labels: ['盈利', '亏损'],
})
const series = reactive([20, 79])
</script>

<template>
    <apexchart height="250px" type="radialBar" :options="options" :series="series" />
</template>

<style lang="scss"></style>
