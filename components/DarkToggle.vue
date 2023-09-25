<script setup lang="ts">
const color = useColorMode()

function toggleDark() {
	color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
	<button class="!outline-none" @click="toggleDark" btn-icon>
		<div class="i-carbon-sun dark:i-carbon-moon" />
	</button>
</template>
