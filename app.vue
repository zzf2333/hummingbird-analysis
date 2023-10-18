<script setup lang="ts">
import { appName } from '~/constants'
import { NNotificationProvider, NMessageProvider, NConfigProvider } from 'naive-ui'

const themeOverrides = {
	"common": {
		"primaryColor": "#64d884FF",
		"successColor": "#64d884FF",
		"primaryColorHover": "#209942FF",
		"primaryColorSuppl": "#209942FF",
		"successColorHover": "#209942FF",
		"successColorSuppl": "#209942FF",
		"primaryColorPressed": "#1c7937FF",
		"successColorPressed": "#1c7937FF",
		"errorColor": "#ef4444FF",
		"errorColorHover": "#dc2626FF",
		"errorColorSuppl": "#dc2626FF",
		"errorColorPressed": "#b91c1cFF",
		"warningColor": "#eab308FF",
		"warningColorHover": "#ca8a04FF",
		"warningColorSuppl": "#ca8a04FF",
		"warningColorPressed": "#a16207FF"
	}
}

useHead({
	title: appName,
})
</script>

<template>
	<n-config-provider :theme-overrides="themeOverrides">
		<n-notification-provider>
			<n-message-provider>
				<VitePwaManifest />
				<NuxtLayout bg-primary-50 dark:bg-primary-900 max-w-screen min-h-screen>
					<NuxtPage />
				</NuxtLayout>
			</n-message-provider>
		</n-notification-provider>
	</n-config-provider>
</template>

<style></style>
