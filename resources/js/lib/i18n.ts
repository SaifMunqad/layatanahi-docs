import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            searchDocs: 'Search the docs...',
            searchDocumentation: 'Search documentation',
            noDocumentationFound: 'No documentation found.',
            toggleDarkMode: 'Toggle dark mode',
            openNavigation: 'Open navigation',
            languages: { en: 'English', fa_AF: 'فارسی', ps: 'پښتو' },
        },
    },
    fa_AF: {
        translation: {
            searchDocs: 'جستجو در مستندات...',
            searchDocumentation: 'جستجوی مستندات',
            noDocumentationFound: 'مستندی یافت نشد.',
            toggleDarkMode: 'تغییر حالت تاریک',
            openNavigation: 'باز کردن پیمایش',
            languages: { en: 'English', fa_AF: 'فارسی', ps: 'پښتو' },
        },
    },
    ps: {
        translation: {
            searchDocs: 'په اسنادو کې لټون...',
            searchDocumentation: 'د اسنادو لټون',
            noDocumentationFound: 'هیڅ سند ونه موندل شو.',
            toggleDarkMode: 'د تیاره حالت بدلول',
            openNavigation: 'لارښود پرانیستل',
            languages: { en: 'English', fa_AF: 'فارسی', ps: 'پښتو' },
        },
    },
} as const;

const locale = typeof window === 'undefined' ? 'en' : localStorage.getItem('docs-locale') ?? 'en';

void i18n.use(initReactI18next).init({
    resources,
    lng: locale,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
});

if (typeof window !== 'undefined') {
    window.addEventListener('docs-locale-change', () => {
        void i18n.changeLanguage(localStorage.getItem('docs-locale') ?? 'en');
    });
}

export default i18n;
