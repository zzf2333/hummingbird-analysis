import en from './locales/enUS.yml';
import zh from './locales/zhCN.yml';

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en,
        zh
    }
}))
