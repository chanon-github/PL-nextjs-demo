/**
 *  Ant Design - Theme
 */

import { ThemeConfig } from 'antd/es/config-provider/context';

export const theme: ThemeConfig = {
  hashed: true,
  token: {
    fontFamily: 'var(--font-kanit)',
    colorBgBase: '#FFFFFF',
    colorBgContainer: '#FFFFFF',
    colorBgTextActive: '#6DC067 ',
    // colorBgLayout: '#FFFFFF',
    // borderRadius: 5,
    colorPrimary: '#6DC067 ',
    
  },
  components: {
    Layout: {
      // colorBgHeader: '#FFFFFF',
    },
    Typography: {
      // colorText: '#727272',
    },
    Menu: {},
    Carousel: {},
    // Button: {
    //   controlHeight: 40,
    // },
    Button: {
      colorBgBase: '#6DC067 ',
      //colorBorder: '#6DC067 ',
      colorPrimary: '#006549',
      colorPrimaryBg: '#6DC067 ',

      colorWarning: '#6DC067 ',
      colorWarningBg: '#ffde21',
      // colorPrimaryHover: '#9e9e9e',
    },
    Select: {
      // colorBgBase: '#F4F4F4',
      // colorBgContainer: '#F4F4F4',
      controlHeight: 40,
    },
    Input: {
      controlHeight: 40,
    },
    DatePicker: {
      controlHeight: 40,
      colorPrimary: '#6DC067 ',
      
    },
  },
};
