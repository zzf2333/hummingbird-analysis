import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetMini,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'

export default defineConfig({
    theme: {
        colors: {
            primary: {
                50: 'var(--primary-color-50)',
                100: 'var(--primary-color-100)',
                200: 'var(--primary-color-200)',
                300: 'var(--primary-color-300)',
                400: 'var(--primary-color-400)',
                500: 'var(--primary-color-500)',
                600: 'var(--primary-color-600)',
                700: 'var(--primary-color-700)',
                800: 'var(--primary-color-800)',
                900: 'var(--primary-color-900)',
                950: 'var(--primary-color-950)',
            },
        },
    },
    rules: [],
    shortcuts: [
        ['btn-icon', 'color-slate-5 dark:color-slate-2 hover:color-slate-6 active:color-slate-7 dark:hover:color-slate-3 dark:active:color-slate-4 text-xl cursor-pointer'],
        ['input', 'bg-primary-100 border-primary-400 border border-solid outline-primary-500 py-2 px-4 shadow-lg rounded-3xl text-sm text-primary-700 placeholder:text-primary-500']
    ],
    presets: [
        presetMini(),
        presetUno(),
        presetAttributify(),
        presetIcons({
            scale: 1.2,
        }),
        presetTypography(),
        presetWebFonts({
            fonts: {
                sans: 'DM Sans',
                serif: 'DM Serif Display',
                mono: 'DM Mono',
            },
        }),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
})
