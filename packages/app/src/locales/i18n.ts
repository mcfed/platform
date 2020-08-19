import i18n, {i18n as I18n, TFunction} from 'i18next';
import {initReactI18next} from 'react-i18next';
import zh_CN from './locale/zh-CN.json';
import en_US from './locale/en-US.json';
import zh_CHT from './locale/zh-CHT.json';

const i18nLanguage: Record<string, any> = {
  'zh-CN': zh_CN,
  'zh-TW': zh_CHT,
  'zh-HK': zh_CHT,
  'en-US': en_US
};

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    keySeparator: false,
    nsSeparator: '.',
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    resources: {
      en: {
        global: i18nLanguage['en-US']
      },
      zh: {
        global: i18nLanguage['zhCN']
      }
    }
  });

export interface I18nProps {
  i18n: I18n;
  tReady: boolean;
  t: TFunction;
}
export default i18n;
