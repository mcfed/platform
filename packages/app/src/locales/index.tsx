import React, {Component, ReactElement} from 'react';
import {LocaleProvider} from 'antd';
import moment from 'moment';
import zh_CN_antd from 'antd/lib/locale-provider/zh_CN';
import zh_TW_antd from 'antd/lib/locale-provider/zh_TW';
import en_US_antd from 'antd/lib/locale-provider/en_US';
// //@ts-ignore
// import en from "react-intl/locale-data/en";
// //@ts-ignore
// import zh from "react-intl/locale-data/zh";
import './locale';
import 'moment/locale/es';
import 'moment/locale/zh-tw';



/* 美创自定义组件国际化翻译 */
import zh_CN_MCF from './locale/zh-CN-mcf.json';
import en_US_MCF from './locale/en-US-mcf.json';
import zh_CHT_MCF from './locale/zh-CHT-mcf.json';
import {Selector} from '@mcfed/core';
import {connect} from 'react-redux';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';

const antdLocal: any = {
  'zh-CN': Object.assign(zh_CN_antd, zh_CN_MCF),
  'zh-TW': Object.assign(zh_TW_antd, zh_CHT_MCF),
  'zh-HK': Object.assign(zh_TW_antd, zh_CHT_MCF),
  'en-US': Object.assign(en_US_antd, en_US_MCF)
};

// addLocaleData([...en, ...zh]);

moment.locale('zh-cn', {
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'YYYY年M月D日',
    LLL: 'YYYY-MM-DD HH:mm',
    LLLL: 'YYYY-MM-DD HH:mm:ss',
    l: 'YYYY-M-D',
    ll: 'YYYY年M月D日',
    lll: 'YYYY年M月D日 HH:mm',
    llll: 'YYYY年M月D日dddd HH:mm'
  }
});

interface LocaleProp {
  appReducer: any;
  children: ReactElement;
}

export class AppLocale extends Component<LocaleProp> {
  render() {
    const {appReducer, children} = this.props;
    const lang = appReducer.config.lang || navigator.language;
    return (
      <LocaleProvider locale={antdLocal[lang]}>
         <I18nextProvider i18n={i18n}>
          {children}
         </I18nextProvider>
      </LocaleProvider>
    );
  }
}

function mapToProps(state: any) {
  return {
    appReducer: Selector.appSelector(state)
  };
}

export default connect(mapToProps)(AppLocale);
