import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
    en: {
        translation: {
            searchDocs: 'Search the docs...',
            searchDocumentation: 'Search documentation',
            noDocumentationFound: 'No documentation found.',
            toggleDarkMode: 'Toggle dark mode',
            openNavigation: 'Open navigation',
            languages: {en: 'English', fa_AF: 'فارسی', ps: 'پښتو'},
            sidebar: {
                sections: {
                    LAYATANAHI: 'LAYATANAHI',
                    USER: 'USER',
                    BUSINESS: 'BUSINESS',
                    SUPPORT: 'SUPPORT',
                    LEGAL: 'LEGAL',
                    API: 'API'
                },
                items: {
                    'layatanahi-overview': 'Overview',
                    'layatanahi-introduction': 'Introduction',
                    'layatanahi-credits': 'Credits',
                    'layatanahi-team': 'Team',
                    'layatanahi-idea': 'Idea',
                    'layatanahi-features': 'Features',
                    'user-overview': 'Overview',
                    'user-purchase': 'Purchase',
                    'user-ai': 'AI',
                    'user-profile': 'Profile',
                    'business-purchase': 'Purchase',
                    'purchase-overview': 'Overview',
                    'purchase-listing': 'Listing',
                    'purchase-create': 'Make Purchase',
                    'purchase-show': 'View',
                    'purchase-status': 'Status',
                    'purchase-requests': 'Purchase Requests',
                    'purchase-filters': 'Filters',
                    'business-inventory': 'Inventory',
                    'inventory-overview': 'Overview',
                    'inventory-listing': 'Listing',
                    'inventory-configurations': 'Configurations (Activities)',
                    'inventory-transfers': 'Transfers',
                    'inventory-changes': 'Changes',
                    'business-sale': 'Sale',
                    'sale-overview': 'Overview',
                    'sale-listing': 'Listing',
                    'sale-create': 'Make Sale',
                    'sale-show': 'View',
                    'sale-status': 'Status',
                    'sale-requests': 'Sale Requests',
                    'sale-filters': 'Filters',
                    'business-store': 'Store',
                    'store-overview': 'Overview',
                    'store-branches': 'Branches',
                    'store-employees': 'Employees',
                    'store-assets': 'Store Assets',
                    'store-reports': 'Reports',
                    'store-activities': 'Activities',
                    'store-analytics': 'Analytics',
                    'business-public': 'Public',
                    'public-overview': 'Overview',
                    'public-listing': 'Listing',
                    'public-brands': 'Brands',
                    'public-categories': 'Categories',
                    'public-businesses': 'Businesses',
                    'public-branches': 'Branches',
                    'public-products': 'Products',
                    'public-product-variants': 'Product Variants',
                    'public-cities': 'Cities',
                    'public-demo': 'Demo',
                    'support-help-center': 'Help Center',
                    'support-knowledge-base': 'Knowledge Base',
                    'support-contact-team': 'Contact Team',
                    'legal-privacy-policy': 'Privacy Policy',
                    'legal-terms-of-service': 'Terms of Service',
                    'legal-return-policy': 'Return Policy',
                    'api-overview': 'Overview',
                    'api-authentication': 'Authentication',
                    'api-reference': 'Reference',
                    'api-usage': 'Usage',
                    'api-guideline': 'Guideline',
                    'api-api-key': 'API Key',
                    'api-products': 'Products',
                    'api-stocks': 'Stocks',
                    'api-accounts': 'Accounts',
                    'api-activities': 'Activities',
                    'api-errors': 'Errors',
                    'api-pagination': 'Pagination',
                    'api-rate-limits': 'Rate Limits',
                    'api-webhooks': 'Webhooks',
                    'api-changelog': 'Changelog',
                    'api-docs-search': 'Docs Search API',
                },
            },
        },
    },
    fa_AF: {
        translation: {
            searchDocs: 'جستجو در مستندات...',
            searchDocumentation: 'جستجوی مستندات',
            noDocumentationFound: 'مستندی یافت نشد.',
            toggleDarkMode: 'تغییر حالت تاریک',
            openNavigation: 'باز کردن پیمایش',
            languages: {en: 'English', fa_AF: 'فارسی', ps: 'پښتو'},
            sidebar: {
                sections: {
                    LAYATANAHI: 'لایتناهی',
                    USER: 'کاربر',
                    BUSINESS: 'تجارت',
                    SUPPORT: 'پشتیبانی',
                    LEGAL: 'حقوقی',
                    API: 'API'
                }, items: {
                    'layatanahi-overview': 'نمای کلی',
                    'layatanahi-introduction': 'مقدمه',
                    'layatanahi-credits': 'اعتبارها',
                    'layatanahi-team': 'تیم',
                    'layatanahi-idea': 'ایده',
                    'layatanahi-features': 'ویژگی‌ها',
                    'user-overview': 'نمای کلی',
                    'user-purchase': 'خرید',
                    'user-ai': 'هوش مصنوعی',
                    'user-profile': 'پروفایل',
                    'business-purchase': 'خرید',
                    'purchase-overview': 'نمای کلی',
                    'purchase-listing': 'فهرست',
                    'purchase-create': 'ایجاد خرید',
                    'purchase-show': 'مشاهده',
                    'purchase-status': 'وضعیت',
                    'purchase-requests': 'درخواست‌های خرید',
                    'purchase-filters': 'فیلترها',
                    'business-inventory': 'موجودی',
                    'inventory-overview': 'نمای کلی',
                    'inventory-listing': 'فهرست',
                    'inventory-configurations': 'تنظیمات (فعالیت‌ها)',
                    'inventory-transfers': 'انتقال‌ها',
                    'inventory-changes': 'تغییرات',
                    'business-sale': 'فروش',
                    'sale-overview': 'نمای کلی',
                    'sale-listing': 'فهرست',
                    'sale-create': 'ایجاد فروش',
                    'sale-show': 'مشاهده',
                    'sale-status': 'وضعیت',
                    'sale-requests': 'درخواست‌های فروش',
                    'sale-filters': 'فیلترها',
                    'business-store': 'فروشگاه',
                    'store-overview': 'نمای کلی',
                    'store-branches': 'شعبه‌ها',
                    'store-employees': 'کارمندان',
                    'store-assets': 'دارایی‌های فروشگاه',
                    'store-reports': 'گزارش‌ها',
                    'store-activities': 'فعالیت‌ها',
                    'store-analytics': 'تحلیل‌ها',
                    'business-public': 'عمومی',
                    'public-overview': 'نمای کلی',
                    'public-listing': 'فهرست',
                    'public-brands': 'برندها',
                    'public-categories': 'دسته‌بندی‌ها',
                    'public-businesses': 'کسب‌وکارها',
                    'public-branches': 'شعبه‌ها',
                    'public-products': 'محصولات',
                    'public-product-variants': 'تنوع محصولات',
                    'public-cities': 'شهرها',
                    'public-demo': 'دمو',
                    'support-help-center': 'مرکز راهنما',
                    'support-knowledge-base': 'پایگاه دانش',
                    'support-contact-team': 'تماس با تیم',
                    'legal-privacy-policy': 'حریم خصوصی',
                    'legal-terms-of-service': 'شرایط استفاده',
                    'legal-return-policy': 'سیاست بازگشت',
                    'api-overview': 'نمای کلی',
                    'api-authentication': 'احراز هویت',
                    'api-reference': 'مرجع',
                    'api-usage': 'نحوه استفاده',
                    'api-guideline': 'راهنما',
                    'api-api-key': 'کلید API',
                    'api-products': 'محصولات',
                    'api-stocks': 'موجودی‌ها',
                    'api-accounts': 'حساب‌ها',
                    'api-activities': 'فعالیت‌ها',
                    'api-errors': 'خطاها',
                    'api-pagination': 'صفحه‌بندی',
                    'api-rate-limits': 'محدودیت نرخ',
                    'api-webhooks': 'وب‌هوک‌ها',
                    'api-changelog': 'گزارش تغییرات',
                    'api-docs-search': 'API جستجوی مستندات'
                },
            },
        },
    },
    ps: {
        translation: {
            searchDocs: 'په اسنادو کې لټون...',
            searchDocumentation: 'د اسنادو لټون',
            noDocumentationFound: 'هیڅ سند ونه موندل شو.',
            toggleDarkMode: 'د تیاره حالت بدلول',
            openNavigation: 'لارښود پرانیستل',
            languages: {en: 'English', fa_AF: 'فارسی', ps: 'پښتو'},
            sidebar: {
                sections: {
                    LAYATANAHI: 'لایتناهی',
                    USER: 'کارن',
                    BUSINESS: 'سوداګري',
                    SUPPORT: 'ملاتړ',
                    LEGAL: 'حقوقي',
                    API: 'API'
                }, items: {
                    'layatanahi-overview': 'لنډیز',
                    'layatanahi-introduction': 'پېژندنه',
                    'layatanahi-credits': 'مننې',
                    'layatanahi-team': 'ډله',
                    'layatanahi-idea': 'نظر',
                    'layatanahi-features': 'ځانګړنې',
                    'user-overview': 'لنډیز',
                    'user-purchase': 'پېرود',
                    'user-ai': 'مصنوعي ځیرکتیا',
                    'user-profile': 'پروفایل',
                    'business-purchase': 'پېرود',
                    'purchase-overview': 'لنډیز',
                    'purchase-listing': 'لړ',
                    'purchase-create': 'پېرود جوړول',
                    'purchase-show': 'کتل',
                    'purchase-status': 'حالت',
                    'purchase-requests': 'د پېرود غوښتنې',
                    'purchase-filters': 'فلټرونه',
                    'business-inventory': 'ذخیره',
                    'inventory-overview': 'لنډیز',
                    'inventory-listing': 'لړ',
                    'inventory-configurations': 'تنظیمات (فعالیتونه)',
                    'inventory-transfers': 'لېږدونه',
                    'inventory-changes': 'بدلونونه',
                    'business-sale': 'پلور',
                    'sale-overview': 'لنډیز',
                    'sale-listing': 'لړ',
                    'sale-create': 'پلور جوړول',
                    'sale-show': 'کتل',
                    'sale-status': 'حالت',
                    'sale-requests': 'د پلور غوښتنې',
                    'sale-filters': 'فلټرونه',
                    'business-store': 'پلورنځی',
                    'store-overview': 'لنډیز',
                    'store-branches': 'څانګې',
                    'store-employees': 'کارکوونکي',
                    'store-assets': 'د پلورنځي شتمنۍ',
                    'store-reports': 'راپورونه',
                    'store-activities': 'فعالیتونه',
                    'store-analytics': 'شننه',
                    'business-public': 'عامه',
                    'public-overview': 'لنډیز',
                    'public-listing': 'لړ',
                    'public-brands': 'برانډونه',
                    'public-categories': 'وېشنيزې',
                    'public-businesses': 'سوداګرۍ',
                    'public-branches': 'څانګې',
                    'public-products': 'محصولات',
                    'public-product-variants': 'د محصول ډولونه',
                    'public-cities': 'ښارونه',
                    'public-demo': 'ډیمو',
                    'support-help-center': 'د مرستې مرکز',
                    'support-knowledge-base': 'د پوهې زېرمه',
                    'support-contact-team': 'له ډلې سره اړیکه',
                    'legal-privacy-policy': 'د محرمیت تګلاره',
                    'legal-terms-of-service': 'د خدمت شرایط',
                    'legal-return-policy': 'د بېرته ستنولو تګلاره',
                    'api-overview': 'لنډیز',
                    'api-authentication': 'تصدیق',
                    'api-reference': 'مرجع',
                    'api-usage': 'کارونه',
                    'api-guideline': 'لارښود',
                    'api-api-key': 'API کیلي',
                    'api-products': 'محصولات',
                    'api-stocks': 'زیرمې',
                    'api-accounts': 'حسابونه',
                    'api-activities': 'فعالیتونه',
                    'api-errors': 'تېروتنې',
                    'api-pagination': 'پاڼه بندي',
                    'api-rate-limits': 'د نرخ محدودیتونه',
                    'api-webhooks': 'وېب‌هوکونه',
                    'api-changelog': 'د بدلونونو یادښت',
                    'api-docs-search': 'د اسنادو د لټون API'
                },
            },
        },
    },
} as const;

export const supportedLocales = ['en', 'fa_AF', 'ps'] as const;
export type DocsLocale = (typeof supportedLocales)[number];

export function normalizeDocsLocale(candidate: string | null | undefined): DocsLocale {
    if (!candidate) return 'fa_AF';
    const raw = String(candidate).trim().replace('-', '_').toLowerCase();
    if (raw === 'en' || raw === 'english' || raw === '1') return 'en';
    if (raw === 'ps' || raw === 'pashto' || raw === '3') return 'ps';
    if (raw === 'fa' || raw === 'dr' || raw === 'dari' || raw === 'farsi' || raw === 'fa_af' || raw === '2') return 'fa_AF';
    return supportedLocales.includes(candidate as DocsLocale) ? (candidate as DocsLocale) : 'fa_AF';
}

export function getSharedCookieDomain(): string | null {
    if (typeof window === 'undefined') return null;
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname.endsWith('.localhost')) {
        return '.localhost';
    }
    const parts = hostname.split('.');
    if (parts.length >= 2 && !/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
        return '.' + parts.slice(-2).join('.');
    }
    return null;
}

export function getSharedLocaleCookie(): string | null {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(/(?:^|;\s*)layatanahi_locale=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
}

export function setSharedLocaleCookie(locale: string): void {
    if (typeof document === 'undefined') return;
    const maxAge = 60 * 60 * 24 * 365; // 1 year
    const domain = getSharedCookieDomain();
    const cookieVal = encodeURIComponent(locale);

    if (domain) {
        document.cookie = `layatanahi_locale=${cookieVal}; path=/; max-age=${maxAge}; domain=${domain}; SameSite=Lax`;
    }
    document.cookie = `layatanahi_locale=${cookieVal}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function applyDocsLocale(value: string | null = null): DocsLocale {
    let resolved: DocsLocale;

    if (value) {
        resolved = normalizeDocsLocale(value);
    } else if (typeof window !== 'undefined') {
        // 1. URL search parameter (?lang= or ?locale=)
        const params = new URLSearchParams(window.location.search);
        const urlParam = params.get('lang') || params.get('locale');

        // 2. Shared cross-subdomain cookie
        const cookieVal = getSharedLocaleCookie();

        // 3. LocalStorage
        const localDoc = localStorage.getItem('docs-locale');
        const localMain = localStorage.getItem('layatanahi_locale');

        if (urlParam) {
            resolved = normalizeDocsLocale(urlParam);
        } else if (cookieVal) {
            resolved = normalizeDocsLocale(cookieVal);
        } else if (localDoc) {
            resolved = normalizeDocsLocale(localDoc);
        } else if (localMain) {
            resolved = normalizeDocsLocale(localMain);
        } else {
            resolved = 'fa_AF';
        }
    } else {
        resolved = 'fa_AF';
    }

    const direction = resolved === 'en' ? 'ltr' : 'rtl';

    if (typeof window !== 'undefined') {
        localStorage.setItem('docs-locale', resolved);
        localStorage.setItem('layatanahi_locale', resolved);
        setSharedLocaleCookie(resolved);
        document.documentElement.lang = resolved;
        document.documentElement.dir = direction;

        // Asynchronously update docs backend session in background
        try {
            fetch('/set-locale/' + resolved, {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                },
            }).catch(() => {});
        } catch {
            // Ignore fetch errors
        }
    }

    return resolved;
}

const locale = applyDocsLocale();

void i18n.use(initReactI18next).init({
    resources,
    lng: locale,
    fallbackLng: 'en',
    interpolation: {escapeValue: false},
});

if (typeof window !== 'undefined') {
    window.addEventListener('docs-locale-change', () => {
        void i18n.changeLanguage(applyDocsLocale());
    });
}

export default i18n;
