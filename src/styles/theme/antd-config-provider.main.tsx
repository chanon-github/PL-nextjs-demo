/**
 *  AntdConfigProvider - Main
 */
'use client';
import { ConfigProvider } from 'antd';
import thLocale from 'antd/locale/th_TH';
import { ReactElement, ReactNode, useEffect, type FC } from 'react';
// import enLocale from 'antd/locale/en_US';
import dayjs from 'dayjs';
import 'dayjs/locale/th';

import { theme } from './index';

export const AntdConfigProviderMain: FC<{ children?: ReactNode }> = (props: { children?: ReactNode }): ReactElement => {
  /** Hook section */

  useEffect(() => {
    dayjs.locale('th');
  }, []);

  /** Functionality section */

  return (
    <ConfigProvider locale={thLocale} theme={theme}>
      {props.children}
    </ConfigProvider>
  );
};

export default AntdConfigProviderMain;
