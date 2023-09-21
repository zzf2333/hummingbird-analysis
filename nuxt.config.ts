import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxtjs/i18n',
		'@unocss/nuxt',
		'nuxt-icon',
		'nuxt-lodash',
		'@pinia/nuxt',
		'@nuxtjs/color-mode',
		'@vite-pwa/nuxt',
		'@vueuse/nuxt',
	],
	i18n: {
		vueI18n: './i18n.config.ts' // if you are using custom path, default 
	},
	experimental: {
		// when using generate, payload js assets included in sw precache manifest
		// but missing on offline, disabling extraction it until fixed
		payloadExtraction: false,
		inlineSSRStyles: false,
		renderJsonPayloads: true,
		typedPages: true,
	},
	css: [
		'@unocss/reset/tailwind.css',
	],
	colorMode: {
		classSuffix: '',
	},
	nitro: {
		esbuild: {
			options: {
				target: 'esnext',
			},
		},
		prerender: {
			crawlLinks: false,
			routes: ['/'],
			ignore: ['/hi'],
		},
	},
	app: {
		head: {
			viewport: 'width=device-width,initial-scale=1',
			link: [
				{ rel: 'icon', href: '/favicon.ico', sizes: 'any' },
				{ rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
				{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
			],
			meta: [
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ name: 'description', content: appDescription },
				{ name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
			],
		},
	},
	pwa,
	devtools: {
		enabled: true,
	},
})
