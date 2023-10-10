<script setup lang="ts">
import { appName } from '~/constants'

useHead({
	title: appName,
})
</script>

<template>
	<VitePwaManifest />
	<NuxtLayout bg-primary-50 dark:bg-primary-900 max-w-screen min-h-screen>
		<NuxtPage />
	</NuxtLayout>
</template>

<style></style>
