import en from './locales/enUS.json';
import zh from './locales/zhCN.json';

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en,
        zh
    }
}))
